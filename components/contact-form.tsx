"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { budgetRanges, paymentPreferences, projectTypes } from "@/lib/site";
import {
  normalizeContactPayload,
  validateContactPayload,
  type ContactErrors,
} from "@/lib/contact";

const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim();

type FormStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function ContactForm({ contactEmail }: { contactEmail: string }) {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [fallbackHref, setFallbackHref] = useState(`mailto:${contactEmail}`);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "loading" });
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const field = (name: string) => {
      const value = formData.get(name);
      return typeof value === "string" ? value : "";
    };
    const payload = normalizeContactPayload({
      name: formData.get("name"),
      company: formData.get("company"),
      siret: formData.get("siret"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget"),
      paymentPreference: formData.get("paymentPreference"),
      message: formData.get("message"),
      website: formData.get("website"),
    });
    const fallbackBody = [
      `Nom : ${field("name")}`,
      `Entreprise : ${field("company")}`,
      `SIRET : ${field("siret")}`,
      `E-mail : ${field("email")}`,
      `Téléphone : ${field("phone") || "Non renseigné"}`,
      `Projet : ${field("projectType")}`,
      `Budget : ${field("budget") || "Non renseigné"}`,
      `Paiement souhaité : ${field("paymentPreference") || "À définir ensemble"}`,
      "",
      field("message"),
    ].join("\n");
    setFallbackHref(
      `mailto:${contactEmail}?subject=${encodeURIComponent("Demande de projet via AryWeb")}&body=${encodeURIComponent(fallbackBody)}`,
    );

    if (payload.website) {
      form.reset();
      setStatus({ type: "success", message: "Merci ! Votre demande a bien été envoyée." });
      return;
    }

    const validationErrors = validateContactPayload(payload);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus({ type: "error", message: "Certains champs doivent être corrigés." });
      return;
    }

    if (!formEndpoint) {
      setStatus({
        type: "error",
        message: `Le formulaire n’est pas encore configuré. Vous pouvez écrire à ${contactEmail}.`,
      });
      return;
    }

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          company: payload.company,
          siret: payload.siret,
          email: payload.email,
          phone: payload.phone,
          project: payload.projectType,
          budget: payload.budget,
          payment_preference: payload.paymentPreference,
          message: payload.message,
        }),
      });

      if (!response.ok) {
        setStatus({
          type: "error",
          message: "Le service de formulaire a refusé l’envoi. Réessayez dans un instant.",
        });
        return;
      }

      form.reset();
      setStatus({
        type: "success",
        message: "Merci ! Votre demande a bien été envoyée. Je vous répondrai à l’adresse indiquée.",
      });
    } catch {
      setStatus({
        type: "error",
        message: `Impossible de joindre le service. Vous pouvez écrire à ${contactEmail}.`,
      });
    }
  }

  const fieldError = (name: keyof ContactErrors) =>
    errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label><span>Entreprise *</span><input name="company" required autoComplete="organization" maxLength={120} aria-invalid={Boolean(errors.company)} />{fieldError("company")}</label>
        <label><span>SIRET *</span><input name="siret" required inputMode="numeric" maxLength={18} aria-invalid={Boolean(errors.siret)} />{fieldError("siret")}</label>
      </div>
      <div className="form-row">
        <label>
          <span>Votre nom <b aria-hidden="true">*</b></span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Comment vous appelez-vous ?"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {fieldError("name")}
        </label>
        <label>
          <span>Votre e-mail <b aria-hidden="true">*</b></span>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="vous@entreprise.fr"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {fieldError("email")}
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Téléphone <small>facultatif</small></span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 00 00 00 00"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {fieldError("phone")}
        </label>
        <label>
          <span>Type de projet <b aria-hidden="true">*</b></span>
          <select
            name="projectType"
            defaultValue=""
            required
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
          >
            <option value="" disabled>Choisir une option</option>
            {projectTypes.map((type) => <option value={type} key={type}>{type}</option>)}
          </select>
          {fieldError("projectType")}
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Budget envisagé <small>facultatif</small></span>
          <select
            name="budget"
            defaultValue=""
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "budget-error" : undefined}
          >
            <option value="">Choisir une fourchette</option>
            {budgetRanges.map((budget) => <option value={budget} key={budget}>{budget}</option>)}
          </select>
          {fieldError("budget")}
        </label>
        <label>
          <span>Paiement souhaité <small>facultatif</small></span>
          <select
            name="paymentPreference"
            defaultValue=""
            aria-invalid={Boolean(errors.paymentPreference)}
            aria-describedby={errors.paymentPreference ? "paymentPreference-error" : undefined}
          >
            <option value="">Choisir une préférence</option>
            {paymentPreferences.map((preference) => (
              <option value={preference} key={preference}>{preference}</option>
            ))}
          </select>
          {fieldError("paymentPreference")}
        </label>
      </div>

      <label>
        <span>Parlez-moi de votre projet <b aria-hidden="true">*</b></span>
        <textarea
          name="message"
          rows={6}
          minLength={20}
          maxLength={2000}
          placeholder="Votre activité, ce dont vous avez besoin et ce que le site doit vous apporter…"
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-help"}
        />
        <small className="field-help" id="message-help">20 caractères minimum</small>
        {fieldError("message")}
      </label>

      <label className="honeypot" aria-hidden="true">
        Ne pas remplir ce champ
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <p className="form-privacy">
        AryWeb utilise vos informations uniquement pour étudier votre demande et vous répondre.
        Les champs marqués d’un astérisque sont obligatoires.{" "}
        <Link href="/confidentialite" prefetch={false}>En savoir plus sur vos données et vos droits</Link>.
      </p>

      <div className="form-submit-row">
        <button className="button button-primary" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Envoi en cours…" : "Envoyer mon message"}
          {status.type !== "loading" && <ArrowIcon />}
        </button>
        <p>Vous recevrez une réponse à l’adresse e-mail indiquée.</p>
      </div>

      {status.type === "success" && (
        <div className="form-message is-success" role="status">
          <CheckIcon />
          <p>{status.message}</p>
        </div>
      )}
      {status.type === "error" && (
        <div className="form-message is-error" role="alert">
          <p>{status.message} <a href={fallbackHref}>Envoyer l’e-mail prérempli</a></p>
        </div>
      )}
    </form>
  );
}
