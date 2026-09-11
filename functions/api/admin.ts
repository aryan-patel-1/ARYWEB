import { authorize, body, business, cents, failure, field, HttpError, json, operationKey, stripeClient } from "../../server/billing";

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try { await authorize(request, env); return json({ mode: env.STRIPE_MODE }); }
  catch (error) { return failure(error); }
};
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    await authorize(request, env);
    const data = await body(request, env);
    const stripe = stripeClient(env);
    const action = field(data, "action", 20);
    const key = await operationKey(data);
    if (action === "finalize" || action === "send") {
      const id = field(data, "invoiceId", 100);
      if (!/^in_[a-zA-Z0-9]+$/.test(id)) throw new HttpError("Facture invalide.");
      const invoice = await stripe.invoices.retrieve(id);
      if (invoice.metadata?.source !== "aryweb-admin") throw new HttpError("Cette facture n’appartient pas à cet espace.", 403);
      if (action === "finalize") {
        const result = invoice.status === "draft" ? await stripe.invoices.finalizeInvoice(id, { auto_advance: false }, { idempotencyKey: key }) : invoice;
        return json({ invoiceId: id, url: result.hosted_invoice_url, status: result.status });
      }
      if (invoice.status !== "open") throw new HttpError("Seule une facture ouverte peut être envoyée.");
      await stripe.invoices.sendInvoice(id, {}, { idempotencyKey: key });
      return json({ invoiceId: id, url: invoice.hosted_invoice_url, sent: true });
    }
    if (action !== "draft" && action !== "subscription") throw new HttpError("Action invalide.");
    if (data.confirmed !== "yes") throw new HttpError("Confirmez l’accord du client et les conditions.");
    const client = business(data);
    const hosting = data.kind === "hosting";
    const description = hosting ? "Serveur, hébergement et nom de domaine" : field(data, "description", 500, 3);
    const amount = hosting ? 2000 : cents(data.amount);
    const interval = hosting ? "year" : data.interval;
    if (action === "subscription" && interval !== "month" && interval !== "year") throw new HttpError("Périodicité invalide.");
    const line1 = field(data, "address", 200);
    const postal_code = field(data, "postalCode", 12);
    const city = field(data, "city", 100);
    const customer = await stripe.customers.create({ name: client.company, email: client.email, address: { line1, postal_code, city, country: "FR" }, metadata: { siret: client.siret, contact_name: client.name } }, { idempotencyKey: `${key}-customer` });
    if (action === "subscription") {
      if (interval !== "month" && interval !== "year") throw new HttpError("Périodicité invalide.");
      const session = await stripe.checkout.sessions.create({
        mode: "subscription", customer: customer.id,
        line_items: [{ price_data: { currency: "eur", unit_amount: amount, recurring: { interval }, product_data: { name: description } }, quantity: 1 }],
        subscription_data: { metadata: { source: "aryweb-admin", siret: client.siret } },
        success_url: `${env.SITE_ORIGIN}/paiement/`, cancel_url: `${env.SITE_ORIGIN}/contact/`,
      }, { idempotencyKey: `${key}-checkout` });
      return json({ url: session.url, recurring: true });
    }
    const invoice = await stripe.invoices.create({ customer: customer.id, collection_method: "send_invoice", days_until_due: 30, auto_advance: false, pending_invoice_items_behavior: "exclude", metadata: { source: "aryweb-admin" }, custom_fields: [{ name: "SIRET", value: client.siret }], description }, { idempotencyKey: `${key}-invoice` });
    await stripe.invoiceItems.create({ customer: customer.id, invoice: invoice.id, currency: "eur", amount, description }, { idempotencyKey: `${key}-item` });
    return json({ invoiceId: invoice.id, status: "draft", amount });
  } catch (error) { return failure(error); }
};
