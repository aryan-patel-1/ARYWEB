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
    "AryWeb crée des sites vitrines et e-commerce accessibles pour indépendants, artisans et commerces à Vincennes et en Île-de-France. Devis gratuit.",
};

export const navigation = [
  { label: "Réalisations", href: "/realisations" },
  { label: "Cartes NFC", href: "/cartes-nfc" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Méthode", href: "/methode" },
  { label: "À propos", href: "/a-propos" },
  { label: "FAQ", href: "/faq" },
];

export const services = [
  {
    number: "01",
    icon: "window",
    title: "Site vitrine",
    text: "Pour expliquer votre offre, montrer ce qui vous distingue et permettre de vous contacter facilement.",
    features: ["Structure des pages", "Design et développement", "Mise en ligne"],
  },
  {
    number: "02",
    icon: "bag",
    title: "E-commerce",
    text: "Pour présenter vos produits et rendre l’achat simple, du catalogue au paiement.",
    features: ["Catalogue organisé", "Parcours d’achat", "Prise en main"],
  },
  {
    number: "03",
    icon: "spark",
    title: "Refonte",
    text: "Votre site existe déjà ? Je reprends sa structure, son apparence ou son fonctionnement en gardant ce qui fonctionne.",
    features: ["État des lieux", "Nouvelle direction", "Migration accompagnée"],
  },
  {
    number: "04",
    icon: "nfc",
    title: "Carte de contact NFC",
    text: "Une carte à approcher d’un smartphone compatible pour ouvrir votre site, vos coordonnées ou le lien choisi.",
    features: ["Lien défini ensemble", "Encodage et vérification", "Personnalisation sur devis"],
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
    title: "Site vitrine",
    price: process.env.NEXT_PUBLIC_PRICE_SHOWCASE || "249 €",
    billing: "Comptant ou avec abonnement",
    text: "Pour présenter clairement votre activité et faciliter la prise de contact.",
    features: ["Jusqu’à 3 pages", "Affichage mobile vérifié", "Mise en ligne accompagnée"],
  },
  {
    number: "02",
    title: "E-commerce",
    price: process.env.NEXT_PUBLIC_PRICE_ECOMMERCE || "499 €",
    billing: "Comptant ou avec abonnement",
    text: "Pour vendre en ligne avec un catalogue et un parcours adaptés à vos besoins.",
    features: ["Jusqu’à 10 produits", "Paiement en ligne", "Prise en main"],
  },
  {
    number: "03",
    title: "Refonte",
    price: process.env.NEXT_PUBLIC_PRICE_REDESIGN || "Sur devis",
    billing: "Modalités définies au devis",
    text: "Pour améliorer l’existant sans repartir inutilement de zéro.",
    features: ["État des lieux", "Priorités définies ensemble", "Migration accompagnée"],
  },
  {
    number: "04",
    title: "Carte NFC",
    price: process.env.NEXT_PUBLIC_PRICE_NFC || "24,90 €",
    billing: "Par carte",
    text: "Pour partager un lien ou vos coordonnées avec un support physique simple.",
    features: ["Une carte NFC", "Lien défini ensemble", "Encodage vérifié"],
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
    cadence: "Abonnement chaque mois",
    text: "Une formule récurrente pour l’hébergement, la maintenance et l’accompagnement, jusqu’à résiliation selon les conditions prévues.",
  },
  {
    number: "03",
    title: "Annuel",
    cadence: "Abonnement chaque année",
    text: "Les services récurrents sont réglés pour une année. Le renouvellement et le délai de résiliation sont précisés avant validation.",
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
      "Oui, lorsqu’une formule comprend des services récurrents comme l’hébergement, la maintenance ou l’accompagnement. Le mensuel et l’annuel sont des abonnements jusqu’à résiliation, pas un paiement en plusieurs fois du prix de création. Le montant et les conditions sont indiqués dans le devis.",
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
    question: "Pourquoi vos tarifs sont-ils accessibles ?",
    answer:
      "Je développe AryWeb en parallèle de mes études et je travaille avec une structure légère. On définit un périmètre réaliste pour votre budget, puis je chiffre chaque ajout avant de commencer.",
  },
  {
    question: "Que peut ouvrir une carte NFC ?",
    answer:
      "La carte peut pointer vers un lien défini ensemble : site, page de contact, menu ou formulaire. La compatibilité, la personnalisation et une éventuelle solution de secours sont précisées dans le devis.",
  },
] as const;
