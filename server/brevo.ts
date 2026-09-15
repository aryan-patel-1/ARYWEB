import { HttpError } from "./billing";

type BrevoRecipient = {
  email: string;
  name?: string;
};

type BrevoMessage = {
  subject: string;
  replyTo: BrevoRecipient;
  textContent: string;
  htmlContent: string;
  tags: string[];
};

const brevoEndpoint = "https://api.brevo.com/v3/smtp/email";

function requiredEnv(value: string | undefined, label: string) {
  const trimmed = value?.trim();
  if (!trimmed) throw new HttpError(`Configuration Brevo manquante : ${label}.`, 503);
  return trimmed;
}

function emailAddress(value: string | undefined, label: string) {
  const email = requiredEnv(value, label);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(`Configuration Brevo invalide : ${label}.`, 503);
  }
  return email;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function detailsText(rows: Array<[string, string]>) {
  return rows.map(([label, value]) => `${label} : ${value || "Non renseigné"}`).join("\n");
}

export function detailsHtml(rows: Array<[string, string]>) {
  return rows
    .map(([label, value]) => (
      `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value || "Non renseigné").replace(/\n/g, "<br>")}</p>`
    ))
    .join("");
}

export async function sendBrevoEmail(env: Env, message: BrevoMessage) {
  const apiKey = requiredEnv(env.BREVO_API_KEY, "BREVO_API_KEY");
  const senderEmail = emailAddress(env.BREVO_SENDER_EMAIL, "BREVO_SENDER_EMAIL");
  const toEmail = emailAddress(env.BREVO_TO_EMAIL || env.ADMIN_EMAIL, "BREVO_TO_EMAIL");
  const senderName = env.BREVO_SENDER_NAME?.trim() || "AryWeb";

  const response = await fetch(brevoEndpoint, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: senderName },
      to: [{ email: toEmail, name: "AryWeb" }],
      replyTo: message.replyTo,
      subject: message.subject,
      textContent: message.textContent,
      htmlContent: message.htmlContent,
      tags: message.tags,
    }),
  });

  if (!response.ok) throw new HttpError(`Brevo a refusé l’envoi du message (${response.status}).`, 503);
}
