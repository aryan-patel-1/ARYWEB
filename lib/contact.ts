import { budgetRanges, paymentPreferences, projectTypes } from "./contact-options";
import { isValidSiret } from "./business";

export type ContactPayload = {
  name: string;
  company: string;
  siret: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  paymentPreference: string;
  message: string;
  website: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeContactPayload(input: unknown): ContactPayload {
  const payload = typeof input === "object" && input !== null
    ? input as Record<string, unknown>
    : {};

  const stringValue = (key: string) =>
    typeof payload[key] === "string" ? payload[key].trim() : "";
  const singleLineValue = (key: string) => stringValue(key).replace(/[\r\n\t]+/g, " ");

  return {
    name: singleLineValue("name"),
    company: singleLineValue("company"),
    siret: singleLineValue("siret").replace(/\s/g, ""),
    email: singleLineValue("email").toLowerCase(),
    phone: singleLineValue("phone"),
    projectType: singleLineValue("projectType"),
    budget: singleLineValue("budget"),
    paymentPreference: singleLineValue("paymentPreference"),
    message: stringValue("message"),
    website: stringValue("website"),
  };
}

export function validateContactPayload(payload: ContactPayload) {
  const errors: ContactErrors = {};
  if (payload.company.length < 2 || payload.company.length > 120) errors.company = "Indiquez votre entreprise.";
  if (!isValidSiret(payload.siret)) errors.siret = "Indiquez un SIRET valide de 14 chiffres.";

  if (payload.name.length < 2 || payload.name.length > 80) {
    errors.name = "Indiquez un nom entre 2 et 80 caractères.";
  }
  if (!emailPattern.test(payload.email) || payload.email.length > 160) {
    errors.email = "Indiquez une adresse e-mail valide.";
  }
  if (payload.phone.length > 30) {
    errors.phone = "Le numéro de téléphone est trop long.";
  }
  if (!projectTypes.includes(payload.projectType as (typeof projectTypes)[number])) {
    errors.projectType = "Choisissez un type de projet.";
  }
  if (payload.budget && !budgetRanges.includes(payload.budget as (typeof budgetRanges)[number])) {
    errors.budget = "Choisissez une fourchette proposée.";
  }
  if (
    payload.paymentPreference
    && !paymentPreferences.includes(payload.paymentPreference as (typeof paymentPreferences)[number])
  ) {
    errors.paymentPreference = "Choisissez un mode de paiement proposé.";
  }
  if (payload.message.length < 20 || payload.message.length > 2000) {
    errors.message = "Décrivez votre projet en 20 à 2 000 caractères.";
  }
  return errors;
}
