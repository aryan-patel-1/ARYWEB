import {
  formatContactMessage,
  normalizeContactPayload,
  validateContactPayload,
} from "../../lib/contact";

type Env = {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_EMAIL?: string;
};

type PagesContext = {
  request: Request;
  env: Env;
};

const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 4;
const MAX_TRACKED_CLIENTS = 5_000;
const MAX_BODY_BYTES = 16_384;
let lastCleanup = 0;

function jsonResponse(body: object, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(JSON.stringify(body), { ...init, headers });
}

function getClientIdentifier(request: Request) {
  return request.headers.get("CF-Connecting-IP")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "anonymous";
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  if (now - lastCleanup >= WINDOW_MS || attempts.size >= MAX_TRACKED_CLIENTS) {
    for (const [key, timestamps] of attempts) {
      const active = timestamps.filter((time) => now - time < WINDOW_MS);
      if (active.length === 0) attempts.delete(key);
      else attempts.set(key, active);
    }
    lastCleanup = now;
  }

  if (attempts.size >= MAX_TRACKED_CLIENTS && !attempts.has(identifier)) return true;

  const recent = (attempts.get(identifier) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(identifier, recent);
  return recent.length > MAX_ATTEMPTS;
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (!origin || (fetchSite && fetchSite !== "same-origin")) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function readJsonBody(request: Request) {
  if (!request.body) return { ok: false as const, status: 400, message: "Requête invalide." };

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let rawBody = "";
  let receivedBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      receivedBytes += value.byteLength;
      if (receivedBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return { ok: false as const, status: 413, message: "La requête est trop volumineuse." };
      }
      rawBody += decoder.decode(value, { stream: true });
    }

    rawBody += decoder.decode();
    return { ok: true as const, body: JSON.parse(rawBody) as unknown };
  } catch {
    return { ok: false as const, status: 400, message: "Requête invalide." };
  }
}

export async function onRequestPost({ request, env }: PagesContext) {
  if (!isSameOrigin(request)) {
    return jsonResponse({ message: "Origine de la requête refusée." }, { status: 403 });
  }

  const identifier = getClientIdentifier(request);
  if (isRateLimited(identifier)) {
    return jsonResponse(
      { message: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ message: "Type de contenu refusé." }, { status: 415 });
  }

  const parsedBody = await readJsonBody(request);
  if (!parsedBody.ok) {
    return jsonResponse({ message: parsedBody.message }, { status: parsedBody.status });
  }

  const payload = normalizeContactPayload(parsedBody.body);
  if (payload.website) return jsonResponse({ ok: true });

  const errors = validateContactPayload(payload);
  if (Object.keys(errors).length > 0) {
    return jsonResponse(
      { message: "Certains champs doivent être corrigés.", errors },
      { status: 422 },
    );
  }

  const apiKey = env.RESEND_API_KEY;
  const recipient = env.CONTACT_EMAIL;
  const sender = env.RESEND_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    return jsonResponse(
      {
        code: "CONTACT_NOT_CONFIGURED",
        message: "Le service d’envoi n’est pas encore configuré.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: payload.email,
        subject: `Nouvelle demande ${payload.projectType} — ${payload.name}`,
        text: formatContactMessage(payload),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Contact provider error", response.status);
      return jsonResponse(
        { message: "Le service d’envoi est momentanément indisponible." },
        { status: 502 },
      );
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Contact request failed", error instanceof Error ? error.message : "unknown");
    return jsonResponse(
      { message: "Le service d’envoi est momentanément indisponible." },
      { status: 502 },
    );
  }
}
