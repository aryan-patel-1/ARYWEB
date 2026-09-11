import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidSiret } from "../lib/business";
import { authorize, body, business, cents, operationKey, stripeClient } from "../server/billing";

const env: Env = { SITE_ORIGIN: "https://aryweb.fr", STRIPE_MODE: "test", STRIPE_SECRET_KEY: "", ACCESS_TEAM_DOMAIN: "", ACCESS_AUD: "", ADMIN_EMAIL: "" };
test("SIRET validation checks checksum and rejects empty or all zeros", () => {
  assert.equal(isValidSiret("73282932000074"), true);
  assert.equal(isValidSiret("732 829 320 00074"), true);
  for (const value of ["", "00000000000000", "73282932000075", "123"]) assert.equal(isValidSiret(value), false);
});
test("amounts are converted to cents and invalid amounts cannot be charged", () => {
  assert.equal(cents("24,90"), 2490); assert.equal(cents("20"), 2000);
  for (const value of ["-20", "1e3", "20.001", "NaN", "0", "100001", 20]) assert.throws(() => cents(value));
});
test("admin access fails closed without configuration or JWT", async () => {
  await assert.rejects(authorize(new Request(env.SITE_ORIGIN), env));
  await assert.rejects(authorize(new Request(env.SITE_ORIGIN), { ...env, ACCESS_TEAM_DOMAIN: "test.cloudflareaccess.com", ACCESS_AUD: "aud", ADMIN_EMAIL: "owner@example.com" }));
});
test("test deployment cannot use a live secret or a missing secret", () => {
  assert.throws(() => stripeClient(env));
  assert.throws(() => stripeClient({ ...env, STRIPE_SECRET_KEY: "sk_live_invalid_example" }));
});
test("API rejects cross-origin requests, oversized payloads and invalid JSON", async () => {
  const request = (origin: string, payload: string) => new Request(`${env.SITE_ORIGIN}/api/admin`, { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: payload });
  await assert.rejects(body(request("https://attacker.example", "{}"), env));
  await assert.rejects(body(request(env.SITE_ORIGIN, "x".repeat(16001)), env));
  await assert.rejects(body(request(env.SITE_ORIGIN, "[]"), env));
  await assert.rejects(body(request(env.SITE_ORIGIN, "bad"), env));
  assert.deepEqual(await body(request(env.SITE_ORIGIN, '{"action":"draft"}'), env), { action: "draft" });
});
test("billing requires a company, contact, valid email and SIRET", () => {
  assert.throws(() => business({ name: "Client", company: "Entreprise", email: "bad", siret: "73282932000074" }));
  assert.equal(business({ name: "Client", company: "Entreprise", email: "test@example.com", siret: "73282932000074" }).company, "Entreprise");
});
test("same operation retains its idempotency key; changed contents get a new key", async () => {
  const data = { operationId: "00000000-0000-4000-8000-000000000001", amount: "20" };
  assert.equal(await operationKey(data), await operationKey(data));
  assert.notEqual(await operationKey(data), await operationKey({ ...data, amount: "30" }));
});
