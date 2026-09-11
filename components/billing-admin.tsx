"use client";
import { FormEvent, useEffect, useRef, useState } from "react";

type Result = { invoiceId?: string; url?: string; status?: string; sent?: boolean; recurring?: boolean };
export function BillingAdmin() {
  const [mode, setMode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [kind, setKind] = useState("once");
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);
  const [summary, setSummary] = useState("");
  const [previewData, setPreviewData] = useState<{ company: string; description: string; amount: string; cadence: string } | null>(null);
  const [showClientPreview, setShowClientPreview] = useState(false);
  const operationId = useRef("");
  useEffect(() => {
    operationId.current = crypto.randomUUID();
    fetch("/api/admin", { cache: "no-store" }).then(async response => {
      const data = await response.json() as { error?: string; mode: string };
      if (!response.ok) throw new Error(data.error || "Accès refusé.");
      setMode(data.mode);
    }).catch(() => {
      setMode("preview");
    });
  }, []);
  async function call(data: Record<string, unknown>) {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, operationId: operationId.current }) });
      const output = await response.json() as Result & { error?: string };
      if (!response.ok) throw new Error(output.error || "Opération impossible.");
      setResult(output);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Opération impossible."); }
    finally { setBusy(false); }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const amount = String(kind === "hosting" ? "20" : data.amount);
    const cadence = kind === "month" ? "par mois" : kind === "year" || kind === "hosting" ? "par an" : "paiement unique";
    setSummary(`${data.company} · ${data.email} · ${amount} € — ${cadence}`);
    setPreviewData({ company: String(data.company), description: kind === "hosting" ? "Serveur, hébergement et nom de domaine" : String(data.description), amount, cadence });
    if (mode === "preview") {
      setResult({ status: kind === "once" ? "preview-draft" : "preview-link", recurring: kind !== "once" });
      return;
    }
    await call({ ...data, kind, action: kind === "once" ? "draft" : "subscription", interval: kind === "month" ? "month" : "year" });
  }
  return <div className="simple-request">
    <p>{mode === "preview" ? "Aperçu temporaire de l’espace de facturation." : "Connexion par code reçu par e-mail, réservée au propriétaire d’AryWeb."}</p>
    {error && <p role="alert" className="form-message is-error">{error}</p>}
    {mode && <>
      {mode === "live" ? <p className="stripe-test-notice">Mode réel — les liens permettent de vrais paiements</p> : null}
      {!result ? <form className="contact-form" onSubmit={submit}>
        <fieldset disabled={busy} className="billing-fields">
          <label><span>Type de paiement</span><select value={kind} onChange={event => setKind(event.target.value)}><option value="once">Facture comptant</option><option value="month">Abonnement mensuel personnalisé</option><option value="year">Abonnement annuel personnalisé</option><option value="hosting">Hébergement + domaine — 20 €/an</option></select></label>
          <div className="form-row"><label><span>Contact</span><input name="name" required maxLength={80} minLength={2} /></label><label><span>E-mail client</span><input type="email" name="email" required maxLength={160} /></label></div>
          <div className="form-row"><label><span>Entreprise</span><input name="company" required maxLength={120} minLength={2} /></label><label><span>SIRET</span><input name="siret" inputMode="numeric" required maxLength={18} /></label></div>
          <label><span>Adresse de facturation (France)</span><input name="address" required maxLength={200} /></label>
          <div className="form-row"><label><span>Code postal</span><input name="postalCode" required maxLength={12} /></label><label><span>Ville</span><input name="city" required maxLength={100} /></label></div>
          {kind !== "hosting" && <><label><span>Prestation / référence du devis</span><input name="description" required minLength={3} maxLength={500} /></label><label><span>Montant total à payer en euros {kind === "month" ? "chaque mois" : kind === "year" ? "chaque année" : ""}</span><input name="amount" inputMode="decimal" pattern="[0-9]{1,6}([.,][0-9]{1,2})?" required /></label></>}
          <label className="billing-confirm"><input type="checkbox" name="confirmed" value="yes" required /><span>Le client a accepté le devis et les conditions de paiement. J’ai vérifié le montant, la périodicité et les mentions fiscales dans Stripe.</span></label>
          <p>{kind === "once" ? "Brouillon à vérifier, échéance de paiement à 30 jours. Aucun e-mail envoyé à cette étape." : "Crée un lien privé de souscription valable 24 heures. Le client saisit lui-même son moyen de paiement. Le prélèvement se renouvelle jusqu’à résiliation."}</p>
          <button disabled={busy} type="submit" className="button button-primary">{mode === "preview" ? "Voir le résultat" : busy ? "Création…" : kind === "once" ? "Créer le brouillon" : "Créer le lien de souscription"}</button>
        </fieldset>
      </form> : <div className="contact-form">
        <h2>{result.status === "draft" || result.status === "preview-draft" ? "Brouillon créé" : "Paiement à partager"}</h2><p>{summary}</p>
        {result.status?.startsWith("preview-") && <p className="form-message is-success">Aperçu réussi. Avec la sécurité et Stripe activés, {result.recurring ? "un lien de souscription sera créé pour être envoyé au client." : "la facture apparaîtra d’abord en brouillon afin que vous puissiez la vérifier avant de l’envoyer."}</p>}
        {result.status?.startsWith("preview-") && previewData && <>
          <button className="button button-primary" type="button" onClick={() => setShowClientPreview(value => !value)}>{showClientPreview ? "Masquer l’aperçu client" : "Voir ce que le client recevra"}</button>
          {showClientPreview && <div className="client-payment-preview" aria-label="Aperçu de la page de paiement du client">
            <div className="client-payment-summary">
              <span className="client-payment-brand">ARYWEB</span>
              <small>Paiement à AryWeb</small>
              <strong>{previewData.amount.replace(".", ",")} €</strong>
              <span>{previewData.cadence}</span>
              <div><b>{previewData.description}</b><small>Pour {previewData.company}</small></div>
            </div>
            <div className="client-payment-card">
              <span className="client-preview-label">APERÇU CLIENT</span>
              <h3>Payer par carte</h3>
              <label>E-mail<input value="client@entreprise.fr" readOnly /></label>
              <label>Informations de la carte<input value="1234  1234  1234  1234" readOnly /></label>
              <div className="client-payment-row"><input value="MM / AA" readOnly /><input value="CVC" readOnly /></div>
              <button type="button" disabled>Payer {previewData.amount.replace(".", ",")} €</button>
              <small>Cette maquette montre le parcours. La vraie page sera hébergée et sécurisée par Stripe.</small>
            </div>
          </div>}
        </>}
        {result.invoiceId && <p>Facture : {result.invoiceId}</p>}
        {result.status === "draft" && <><p>Vérifiez le brouillon dans Stripe avant de le finaliser. La finalisation attribue le numéro de facture.</p><a href={`https://dashboard.stripe.com/${mode === "test" ? "test/" : ""}invoices/${result.invoiceId}`} target="_blank" rel="noreferrer">Vérifier dans Stripe</a><button disabled={busy} className="button button-primary" onClick={() => call({ action: "finalize", invoiceId: result.invoiceId })}>Finaliser et obtenir le lien</button></>}
        {result.url && <>
          <a href={result.url} target="_blank" rel="noreferrer">Ouvrir la page de paiement du client</a>
          <button disabled={busy} className="button button-ghost" onClick={async () => { try { await navigator.clipboard.writeText(result.url!); setCopied(true); } catch { setError("Copiez le lien depuis la page de paiement."); } }}>{copied ? "Lien copié" : "Copier le lien pour un message"}</button>
          <a href={`mailto:?subject=${encodeURIComponent("Votre paiement AryWeb")}&body=${encodeURIComponent(`Bonjour, voici votre lien de paiement AryWeb correspondant à notre accord : ${result.url}`)}`}>Préparer un e-mail avec le lien</a>
          {result.invoiceId && !result.sent && <button disabled={busy} className="button button-primary" onClick={() => call({ action: "send", invoiceId: result.invoiceId })}>Envoyer la facture par e-mail via Stripe</button>}
          {result.sent && <p role="status">La demande d’envoi a été acceptée par Stripe.</p>}
        </>}
        <button disabled={busy} className="button button-ghost" onClick={() => { operationId.current = crypto.randomUUID(); setResult(null); setPreviewData(null); setShowClientPreview(false); setCopied(false); setError(""); }}>Préparer un autre paiement</button>
      </div>}
    </>}
  </div>;
}
