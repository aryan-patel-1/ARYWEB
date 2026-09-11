export { budgetRanges, paymentPreferences, projectTypes } from "./contact-options";

const productionUrl = "https://aryweb.fr";
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export const siteConfig = {
  name: "AryWeb",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "aryweb15@gmail.com",
  location:
    process.env.NEXT_PUBLIC_LOCATION
    ?? "En présentiel en Île-de-France • À distance en visioconférence",
  url: configuredUrl?.startsWith("https://") && !configuredUrl.includes("localhost")
    ? configuredUrl
    : productionUrl,
  description:
    "AryWeb crée des sites internet sur mesure pour indépendants, artisans et commerces à Paris et en Île-de-France. Devis personnalisé.",
};

export type StripeCheckoutMode = "disabled" | "test" | "live";

const configuredStripeMode = process.env.NEXT_PUBLIC_STRIPE_MODE;

export const stripeCheckout = {
  mode: (configuredStripeMode === "test" || configuredStripeMode === "live"
    ? configuredStripeMode
    : "disabled") as StripeCheckoutMode,
  links: {
    nfc: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_NFC ?? "",
    hosting: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_HOSTING ?? "",
  },
};

function getStripePaymentLink(value: string) {
  if (stripeCheckout.mode === "disabled" || !value) return null;

  try {
    const url = new URL(value);
    const isStripeLink = url.protocol === "https:" && url.hostname === "buy.stripe.com";
    const isTestLink = url.pathname.startsWith("/test_");

    if (!isStripeLink) return null;
    if (stripeCheckout.mode === "test" && !isTestLink) return null;
    if (stripeCheckout.mode === "live" && isTestLink) return null;

    return url.toString();
  } catch {
    return null;
  }
}

export const navigation = [
  { label: "Réalisations", href: "/realisations" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Méthode", href: "/methode" },
  { label: "À propos", href: "/a-propos" },
  { label: "FAQ", href: "/faq" },
];

export const services = [
  {
    number: "01",
    icon: "window",
    title: "Création de site internet",
    text: "Une seule offre, adaptée au besoin réel : présentation, catalogue, vente en ligne, réservation, refonte ou fonctions sur mesure.",
    features: ["Périmètre défini ensemble", "Design et développement", "Prix personnalisé sur devis"],
  },
] as const;

export const projects = [
  {
    number: "01",
    title: "Jessica Salon de Beauté",
    category: "Site vitrine & réservation",
    description:
      "Un site pour présenter un salon de beauté indien à Paris 20e, ses prestations, ses tarifs et la prise de rendez-vous.",
    url: "https://jessicasalondebeaute.fr/",
    image: "/projects/jessica.webp",
    imageAlt: "Aperçu du site Jessica Salon de Beauté",
    imageWidth: 960,
    imageHeight: 600,
    credit: "En collaboration avec l’agence Patecode",
  },
  {
    number: "02",
    title: "CAM Parts France",
    category: "E-commerce B2B",
    description:
      "Une plateforme de pièces détachées et accessoires pour smartphones et informatique, avec catalogue, recherche et panier.",
    url: "https://www.campartsfr.com/",
    image: "/projects/camparts.webp",
    imageAlt: "Aperçu du site CAM Parts France",
    imageWidth: 960,
    imageHeight: 600,
    credit: "En collaboration avec l’agence Patecode",
  },
  {
    number: "03",
    title: "Cyber Dorée",
    category: "Réparation & commande en ligne",
    description:
      "Un parcours consacré à la réparation de smartphones et tablettes à Paris 12e, du choix de l’appareil à la commande.",
    url: "https://cyberdoree.com/",
    image: "/projects/cyberdoree.webp",
    imageAlt: "Aperçu du projet Cyber Dorée",
    imageWidth: 900,
    imageHeight: 530,
    credit: "En collaboration avec l’agence Patecode",
  },
  {
    number: "04",
    title: "Portfolio Aryan Patel",
    category: "Portfolio étudiant",
    description:
      "Mon portfolio d’intégrateur web, consacré à mes compétences, mes projets et mon parcours de formation.",
    url: "https://patel-aryan.vercel.app/",
    image: "/projects/portfolio.webp",
    imageAlt: "Aperçu du portfolio étudiant d’Aryan Patel",
    imageWidth: 960,
    imageHeight: 600,
    credit: "Projet réalisé pendant mes études",
  },
] as const;

export const pricingPlans = [
  {
    number: "01",
    title: "Création de site internet",
    price: "Sur devis",
    billing: "Comptant, mensuel ou annuel selon le devis",
    text: "Un seul accompagnement web, dimensionné selon vos pages, vos contenus et les fonctions réellement nécessaires.",
    features: ["Nouveau site ou refonte", "Options choisies selon le besoin", "Chiffrage après étude du projet"],
    paymentLink: null,
    ctaHref: "/devis",
    ctaLabel: "Demander un devis",
  },
  {
    number: "02",
    title: "Carte NFC",
    price: "24,90 €",
    billing: "Par carte — paiement unique, sans abonnement",
    text: "Pour partager un lien ou vos coordonnées avec un support physique simple.",
    features: ["Une carte NFC", "Lien défini ensemble", "Encodage vérifié"],
    paymentLink: null,
    ctaHref: "#commander-nfc",
    ctaLabel: "Préparer ma carte",
  },
  {
    number: "03",
    title: "Serveur + domaine",
    price: "20 €",
    billing: "Par an — renouvellement automatique",
    text: "L’abonnement technique obligatoire pour chaque site AryWeb : serveur, hébergement et nom de domaine.",
    features: ["20 € facturés chaque année", "Obligatoire avec un site AryWeb", "Conditions précisées dans le devis"],
    paymentLink: getStripePaymentLink(stripeCheckout.links.hosting),
    ctaHref: "/contact",
    ctaLabel: "Poser une question",
  },
  {
    number: "04", title: "Contenu pour les réseaux sociaux", price: "Sur devis",
    billing: "Selon votre projet", text: "Des contenus visuels adaptés à votre activité et à vos réseaux sociaux.",
    features: ["Publications et stories", "Identité visuelle cohérente", "Formats adaptés à vos réseaux"],
    paymentLink: null, ctaHref: "/devis", ctaLabel: "Demander un devis",
  },
  {
    number: "05", title: "Cartes de visite et de fidélité", price: "Sur devis",
    billing: "Création graphique sur mesure", text: "Un design qui représente votre entreprise et accompagne vos relations clients.",
    features: ["Design de carte de visite", "Design de carte de fidélité", "Impression à préciser dans le devis"],
    paymentLink: null, ctaHref: "/devis", ctaLabel: "Demander un devis",
  },
] as const;

export const paymentOptions = [
  {
    number: "01",
    title: "Comptant",
    cadence: "Un règlement",
    text: "La création ou la prestation est réglée en une fois, selon le montant et l’échéance validés dans le devis.",
  },
  {
    number: "02",
    title: "Mensuel",
    cadence: "Selon le devis",
    text: "Si le projet s’y prête, un montant mensuel personnalisé est défini après l’étude du besoin et accepté avant toute facturation.",
  },
  {
    number: "03",
    title: "Annuel",
    cadence: "Selon le devis",
    text: "Une formule annuelle personnalisée peut être proposée. Elle est distincte de l’abonnement serveur et domaine fixé à 20 € par an.",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "On cadre le besoin",
    text: "Vous me présentez votre activité, vos contenus et vos priorités. Je pose les questions qui manquent.",
  },
  {
    number: "02",
    title: "Je prépare la structure",
    text: "Je propose les pages, leur ordre et une première piste visuelle.",
  },
  {
    number: "03",
    title: "Je construis le site",
    text: "Je conçois puis développe les pages. Vous validez les étapes importantes.",
  },
  {
    number: "04",
    title: "On vérifie et on publie",
    text: "Je vérifie l’affichage sur mobile, les liens et les formulaires avant la mise en ligne.",
  },
] as const;

export const faqItems = [
  {
    question: "Combien de temps faut-il pour créer un site ?",
    answer:
      "Je vous donne un calendrier après avoir vu le nombre de pages et les fonctions nécessaires. Le délai dépend aussi de la disponibilité des textes, des images et de vos retours.",
  },
  {
    question: "Comment est calculé le prix ?",
    answer:
      "Je prépare un devis après le premier échange. Il détaille les pages, les fonctionnalités, ce qui est inclus et les éventuelles options.",
  },
  {
    question: "Puis-je payer au mois ou à l’année ?",
    answer:
      "Oui, si le projet et son suivi s’y prêtent. Le montant mensuel ou annuel est personnalisé et précisé dans le devis avant tout paiement. L’abonnement serveur, hébergement et nom de domaine de 20 € par an est obligatoire et séparé du prix de création.",
  },
  {
    question: "Dois-je déjà avoir mes textes et mes images ?",
    answer:
      "Pas forcément. Vous pouvez venir avec des notes, un ancien site ou une idée encore floue. Je vous aide à lister les contenus à préparer.",
  },
  {
    question: "Pourrai-je modifier mon site ensuite ?",
    answer:
      "Si vous souhaitez modifier le site vous-même, dites-le dès le premier échange : ce besoin guidera le choix de la solution.",
  },
  {
    question: "Pourquoi le site n’a-t-il pas de prix fixe ?",
    answer:
      "Le temps de travail change selon les contenus et le besoin. Décrivez votre projet dans le formulaire, puis je prépare un devis personnalisé.",
  },
  {
    question: "Que peut ouvrir une carte NFC ?",
    answer:
      "La carte peut pointer vers un lien défini ensemble : site, page de contact, menu ou formulaire. La compatibilité, la personnalisation et une éventuelle solution de secours sont précisées dans le devis.",
  },
] as const;
