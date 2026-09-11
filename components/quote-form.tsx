"use client";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { isValidSiret } from "@/lib/business";

export function QuoteForm({ contactEmail, nfc = false }: { contactEmail: string; nfc?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const operationId = useRef("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || state === "loading") return;
    const data = Object.fromEntries(new FormData(form));
    if (!isValidSiret(String(data.siret))) {
      setError("Vérifiez votre SIRET : il doit contenir 14 chiffres valides."); setState("error"); return;
    }
    setState("loading");
    if (!operationId.current) operationId.current = crypto.randomUUID();
    try {
      if (data.website) throw new Error("Envoi impossible.");
      const endpoint = nfc ? "/api/nfc" : process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
      if (!endpoint) throw new Error(`Le formulaire est indisponible. Contactez ${contactEmail}.`);
      const response = await fetch(endpoint, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, operationId: operationId.current, siret: String(data.siret).replace(/\s/g, ""), subject: nfc ? "Commande NFC" : "Demande de devis professionnel AryWeb" }),
      });
      if (!response.ok) throw new Error("L’envoi a échoué. Réessayez ou contactez-nous par e-mail.");
      if (nfc) {
        const result = await response.json() as { url: string };
        const url = new URL(result.url);
        if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com") throw new Error("Lien de paiement invalide.");
        window.location.assign(url.toString());
      } else setState("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Envoi impossible."); setState("error");
    }
  }
  return <div className="simple-request">
    {state === "success" ? <div className="contact-form" role="status" aria-live="polite">
      <h2>Votre demande a bien été envoyée.</h2>
      <p>Merci pour votre message ! Je vous répondrai par e-mail au plus vite pour échanger sur votre projet.</p>
      <Link className="button button-primary" href="/">Retour à l’accueil</Link>
    </div> : <form className="contact-form" onSubmit={submit}>
      <p>Réservé aux professionnels. Tous les champs sont obligatoires sauf indication contraire.</p>
      <div className="form-row">
        <label><span>Nom et prénom</span><input name="name" autoComplete="name" minLength={2} maxLength={80} required /></label>
        <label><span>E-mail professionnel</span><input name="email" type="email" autoComplete="email" maxLength={160} required /></label>
      </div>
      <div className="form-row">
        <label><span>Entreprise</span><input name="company" autoComplete="organization" minLength={2} maxLength={120} required /></label>
        <label><span>SIRET</span><input name="siret" inputMode="numeric" pattern="[0-9 ]{14,18}" maxLength={18} required /></label>
      </div>
      <label><span>Téléphone <small>facultatif</small></span><input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
      <label><span>{nfc ? "Votre demande pour la carte NFC" : "Expliquez-moi votre besoin"}</span><textarea name="message" rows={7} minLength={20} maxLength={3000} placeholder={nfc ? "Nom à afficher, activité et précisions utiles…" : "Site internet, contenu pour les réseaux sociaux, design de carte de visite ou de fidélité : décrivez simplement ce que vous souhaitez."} required /></label>
      {nfc && <>
        <label><span>Lien à ouvrir avec la carte</span><input name="targetUrl" type="url" placeholder="https://votre-site.fr" maxLength={500} required /></label>
        <label><span>Nombre de cartes — 24,90 € par carte</span><input name="quantity" type="number" min={1} max={20} defaultValue={1} required /></label>
        <p>Paiement unique. Les coordonnées de livraison sont demandées sur la page Stripe.</p>
        <label className="billing-confirm"><input type="checkbox" name="consent" value="yes" required /><span>J’achète pour mon activité professionnelle et j’accepte les <Link href="/cgv" target="_blank">CGV</Link>.</span></label>
      </>}
      <label className="honeypot" aria-hidden="true">Ne pas remplir<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <p className="form-privacy">Vos informations servent à traiter votre demande. <Link href="/confidentialite">Confidentialité</Link>.</p>
      <button className="button button-primary" disabled={state === "loading"} type="submit">{state === "loading" ? "Traitement en cours…" : nfc ? "Continuer vers le paiement" : "Envoyer ma demande de devis"}<ArrowIcon /></button>
      {state === "error" && <p role="alert" className="form-message is-error">{error} <a href={`mailto:${contactEmail}`}>Nous écrire</a></p>}
    </form>}
  </div>;
}
