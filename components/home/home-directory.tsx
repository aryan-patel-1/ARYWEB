import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

const pages = [
  {
    number: "01",
    title: "Réalisations",
    text: "Découvrez les sites auxquels j’ai contribué et mon portfolio réalisé pendant mes études.",
    href: "/realisations",
  },
  {
    number: "02",
    title: "Tarifs & paiement",
    text: "Consultez les prix de départ et les possibilités de règlement comptant, mensuel ou annuel.",
    href: "/tarifs",
  },
  {
    number: "03",
    title: "Cartes NFC",
    text: "Voyez comment une carte peut ouvrir votre site, vos coordonnées, un menu ou un formulaire.",
    href: "/cartes-nfc",
  },
  {
    number: "04",
    title: "Méthode",
    text: "Suivez les étapes du premier échange jusqu’aux vérifications et à la mise en ligne.",
    href: "/methode",
  },
  {
    number: "05",
    title: "À propos",
    text: "Découvrez qui se trouve derrière AryWeb et la manière dont j’accompagne chaque projet.",
    href: "/a-propos",
  },
  {
    number: "06",
    title: "Questions fréquentes",
    text: "Retrouvez les réponses utiles sur les délais, le prix, les contenus et le suivi du site.",
    href: "/faq",
  },
] as const;

export function HomeDirectory() {
  return (
    <section className="home-directory section section-space" aria-labelledby="directory-title">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">Explorer AryWeb</p>
          <h2 id="directory-title">Chaque sujet a maintenant sa propre page.</h2>
        </div>
        <p>
          Allez directement aux réalisations, aux tarifs ou à la méthode, puis contactez-moi
          quand vous êtes prêt à parler de votre projet.
        </p>
      </div>

      <div className="home-directory-grid">
        {pages.map((page, index) => (
          <Link
            className="directory-card"
            href={page.href}
            key={page.href}
            prefetch={false}
            data-reveal
            data-reveal-delay={(index % 3) + 1}
          >
            <span>{page.number}</span>
            <h3>{page.title}</h3>
            <p>{page.text}</p>
            <small>Découvrir <ArrowIcon /></small>
          </Link>
        ))}
      </div>

      <div className="home-directory-cta" data-reveal>
        <p><strong>Vous avez déjà une idée précise ?</strong> Présentez-moi directement votre besoin.</p>
        <Link href="/contact" prefetch={false}>Parler de mon projet <ArrowIcon /></Link>
      </div>
    </section>
  );
}
