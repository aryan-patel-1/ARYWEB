import Stripe from "stripe";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { isValidSiret } from "../lib/business";

export const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
export class HttpError extends Error { constructor(message: string, public status = 400) { super(message); } }
export function stripeClient(env: Env) {
  if (env.STRIPE_MODE !== "test" && env.STRIPE_MODE !== "live") throw new HttpError("La facturation n’est pas encore activée.", 503);
  const prefix = env.STRIPE_MODE === "test" ? "sk_test_" : env.STRIPE_MODE === "live" ? "sk_live_" : "disabled";
  if (!env.STRIPE_SECRET_KEY?.startsWith(prefix)) throw new HttpError("La facturation n’est pas encore activée.", 503);
  return new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient(), maxNetworkRetries: 2 });
}
export async function authorize(request: Request, env: Env) {
  if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD || !env.ADMIN_EMAIL) throw new HttpError("Configurez Cloudflare Access pour activer cet espace privé.", 503);
  if (!/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(env.ACCESS_TEAM_DOMAIN)) throw new HttpError("Configuration Access invalide.", 503);
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  if (!token) throw new HttpError("Connectez-vous avec votre code reçu par e-mail.", 401);
  try {
    const issuer = `https://${env.ACCESS_TEAM_DOMAIN}`;
    const { payload } = await jwtVerify(token, createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`)), { issuer, audience: env.ACCESS_AUD, algorithms: ["RS256"], requiredClaims: ["exp", "iat", "sub", "email"] });
    if (typeof payload.email !== "string" || payload.email.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) throw new Error("Forbidden");
    return payload.email;
  } catch { throw new HttpError("Accès refusé ou session expirée.", 403); }
}
export async function body(request: Request, env: Env): Promise<Record<string, unknown>> {
  if (request.headers.get("Origin") !== env.SITE_ORIGIN || new URL(request.url).origin !== env.SITE_ORIGIN) throw new HttpError("Origine refusée.", 403);
  if (!request.headers.get("Content-Type")?.startsWith("application/json")) throw new HttpError("Format refusé.", 415);
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError("Demande vide.");
  let size = 0; let raw = ""; const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    size += value.length; if (size > 16000) { await reader.cancel(); throw new HttpError("Demande trop volumineuse.", 413); }
    raw += decoder.decode(value, { stream: true });
  }
  raw += decoder.decode();
  try { const data = JSON.parse(raw); if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error(); return data; }
  catch { throw new HttpError("Demande invalide."); }
}
export function field(data: Record<string, unknown>, key: string, max = 160, min = 1) {
  const value = typeof data[key] === "string" ? data[key].trim() : "";
  if (value.length < min || value.length > max) throw new HttpError(`Champ invalide : ${key}.`);
  return value;
}
export function business(data: Record<string, unknown>) {
  const email = field(data, "email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError("E-mail invalide.");
  const siret = field(data, "siret", 18).replace(/\s/g, "");
  if (!isValidSiret(siret)) throw new HttpError("SIRET invalide.");
  return { name: field(data, "name", 80, 2), company: field(data, "company", 120, 2), email, siret };
}
export function cents(value: unknown) {
  if (typeof value !== "string" || !/^\d{1,6}([.,]\d{1,2})?$/.test(value)) throw new HttpError("Montant invalide.");
  const amount = Math.round(Number(value.replace(",", ".")) * 100);
  if (amount < 50 || amount > 10000000) throw new HttpError("Le montant doit être compris entre 0,50 € et 100 000 €.");
  return amount;
}
export async function operationKey(data: Record<string, unknown>) {
  const key = field(data, "operationId", 36);
  if (!/^[0-9a-f-]{36}$/.test(key)) throw new HttpError("Identifiant de demande invalide.");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(data)));
  return `${key}-${Array.from(new Uint8Array(digest)).map(n => n.toString(16).padStart(2, "0")).join("")}`;
}
export function failure(error: unknown) {
  if (error instanceof HttpError) return json({ error: error.message }, error.status);
  // Never return Stripe details or log customer data/secrets.
  return json({ error: "L’opération a échoué. Réessayez avec la même demande ; vérifiez Stripe avant d’en créer une nouvelle." }, 502);
}
