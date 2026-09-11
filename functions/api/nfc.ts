import { body, business, field, HttpError, json, failure, operationKey, stripeClient } from "../../server/billing";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const data = await body(request, env);
    if (data.website) throw new HttpError("Demande refusée.");
    if (data.consent !== "yes") throw new HttpError("Acceptez les CGV pour continuer.");
    const key = await operationKey(data);
    const customer = business(data);
    const message = field(data, "message", 3000, 20);
    const targetUrl = field(data, "targetUrl", 500);
    if (!/^https?:$/.test(new URL(targetUrl).protocol)) throw new HttpError("Lien invalide.");
    const quantity = Number(data.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw new HttpError("Quantité invalide.");
    const stripe = stripeClient(env);
    const session = await stripe.checkout.sessions.create({
      mode: "payment", customer_email: customer.email, customer_creation: "always",
      billing_address_collection: "required", shipping_address_collection: { allowed_countries: ["FR"] },
      line_items: [{ price_data: { currency: "eur", unit_amount: 2490, product_data: { name: "Carte NFC", description: "Carte encodée — paiement unique" } }, quantity }],
      metadata: { source: "aryweb-nfc", siret: customer.siret, company: customer.company, contact_name: customer.name, phone: field(data, "phone", 30, 0), target_url: targetUrl,
        message_1: message.slice(0, 500), message_2: message.slice(500, 1000), message_3: message.slice(1000, 1500), message_4: message.slice(1500, 2000), message_5: message.slice(2000, 2500), message_6: message.slice(2500) },
      invoice_creation: { enabled: true, invoice_data: { custom_fields: [{ name: "SIRET", value: customer.siret }] } },
      success_url: `${env.SITE_ORIGIN}/paiement/`, cancel_url: `${env.SITE_ORIGIN}/tarifs/#commander-nfc`,
    }, { idempotencyKey: key });
    return json({ url: session.url });
  } catch (error) { return failure(error); }
};
