import { body, failure, json, HttpError } from "../../server/billing";
import { detailsHtml, detailsText, sendBrevoEmail } from "../../server/brevo";
import { normalizeContactPayload, validateContactPayload } from "../../lib/contact";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const payload = normalizeContactPayload(await body(request, env));
    if (payload.website) return json({ ok: true });

    const errors = validateContactPayload(payload);
    if (Object.keys(errors).length > 0) throw new HttpError("Certains champs doivent être corrigés.");

    const rows: Array<[string, string]> = [
      ["Nom", payload.name],
      ["Entreprise", payload.company],
      ["SIRET", payload.siret],
      ["E-mail", payload.email],
      ["Téléphone", payload.phone],
      ["Projet", payload.projectType],
      ["Budget", payload.budget],
      ["Paiement souhaité", payload.paymentPreference || "À définir ensemble"],
      ["Message", payload.message],
    ];

    await sendBrevoEmail(env, {
      subject: `Nouvelle demande de contact AryWeb - ${payload.company}`,
      replyTo: { email: payload.email, name: payload.name },
      textContent: `Nouvelle demande de contact AryWeb\n\n${detailsText(rows)}`,
      htmlContent: `<html><body><h1>Nouvelle demande de contact AryWeb</h1>${detailsHtml(rows)}</body></html>`,
      tags: ["aryweb-contact"],
    });

    return json({ ok: true });
  } catch (error) {
    return failure(error);
  }
};

export const onRequestGet: PagesFunction = () => (
  new Response(null, { status: 405, headers: { Allow: "POST" } })
);
