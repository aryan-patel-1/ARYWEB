import { budgetRanges, projectTypes } from "./contact-options";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
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
    email: singleLineValue("email").toLowerCase(),
    phone: singleLineValue("phone"),
    projectType: singleLineValue("projectType"),
    budget: singleLineValue("budget"),
    message: stringValue("message"),
    website: stringValue("website"),
  };
}

export function validateContactPayload(payload: ContactPayload) {
  const errors: ContactErrors = {};

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
  if (payload.message.length < 20 || payload.message.length > 2000) {
    errors.message = "Décrivez votre projet en 20 à 2 000 caractères.";
  }
  return errors;
}
