export { budgetRanges, projectTypes } from "./contact-options";

export const siteConfig = {
  name: "AryWeb",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "aryweb15@gmail.com",
  location:
    process.env.NEXT_PUBLIC_LOCATION
    ?? "En présentiel en Île-de-France • À distance en visioconférence",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:1234",
  description:
    "Sites vitrines, boutiques en ligne, refontes et cartes NFC pour indépendants, artisans et commerces.",
};

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "Cartes NFC", href: "#nfc" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Méthode", href: "#methode" },
  { label: "À propos", href: "#a-propos" },
  { label: "FAQ", href: "#faq" },
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

export const pricingPlans = [
  {
    number: "01",
    title: "Site vitrine",
    price: process.env.NEXT_PUBLIC_PRICE_SHOWCASE || "249 €",
    billing: "Paiement unique",
    text: "Pour présenter clairement votre activité et faciliter la prise de contact.",
    features: ["Jusqu’à 3 pages", "Affichage mobile vérifié", "Mise en ligne accompagnée"],
  },
  {
    number: "02",
    title: "E-commerce",
    price: process.env.NEXT_PUBLIC_PRICE_ECOMMERCE || "499 €",
    billing: "Paiement unique",
    text: "Pour vendre en ligne avec un catalogue et un parcours adaptés à vos besoins.",
    features: ["Jusqu’à 10 produits", "Paiement en ligne", "Prise en main"],
  },
  {
    number: "03",
    title: "Refonte",
    price: process.env.NEXT_PUBLIC_PRICE_REDESIGN || "Sur devis",
    billing: "Selon l’existant",
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
