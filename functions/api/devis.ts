import { body, business, failure, field, json } from "../../server/billing";
import { detailsHtml, detailsText, sendBrevoEmail } from "../../server/brevo";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const data = await body(request, env);
    if (data.website) return json({ ok: true });

    const customer = business(data);
    const phone = field(data, "phone", 30, 0);
    const message = field(data, "message", 3000, 20);
    const rows: Array<[string, string]> = [
      ["Nom", customer.name],
      ["Entreprise", customer.company],
      ["SIRET", customer.siret],
      ["E-mail", customer.email],
      ["Téléphone", phone],
      ["Message", message],
    ];

    await sendBrevoEmail(env, {
      subject: `Nouvelle demande de devis AryWeb - ${customer.company}`,
      replyTo: { email: customer.email, name: customer.name },
      textContent: `Nouvelle demande de devis AryWeb\n\n${detailsText(rows)}`,
      htmlContent: `<html><body><h1>Nouvelle demande de devis AryWeb</h1>${detailsHtml(rows)}</body></html>`,
      tags: ["aryweb-devis"],
    });

    return json({ ok: true });
  } catch (error) {
    return failure(error);
  }
};

export const onRequestGet: PagesFunction = () => (
  new Response(null, { status: 405, headers: { Allow: "POST" } })
);
