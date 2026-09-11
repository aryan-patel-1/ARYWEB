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
    text: "Comprenez le devis personnalisé et consultez les deux seuls prix fixes proposés.",
    href: "/tarifs",
  },
  {
    number: "03",
    title: "Méthode",
    text: "Suivez les étapes du premier échange jusqu’aux vérifications et à la mise en ligne.",
    href: "/methode",
  },
  {
    number: "04",
    title: "À propos",
    text: "Découvrez qui se trouve derrière AryWeb et la manière dont j’accompagne chaque projet.",
    href: "/a-propos",
  },
  {
    number: "05",
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
          <h2 id="directory-title">Découvrez mon travail et préparons votre projet.</h2>
        </div>
        <p>
          Allez directement aux réalisations, aux tarifs ou à la méthode, puis contactez-moi
          quand vous êtes prêt à parler de votre projet.
        </p>
      </div>

      <div className="home-directory-grid">
        {pages.map((page, index) => (
          <Link
            className={`directory-card${index === 0 ? " directory-card-featured" : ""}`}
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
        <p><strong>Vous avez déjà une idée précise ?</strong> Décrivez votre besoin pour préparer le devis.</p>
        <Link href="/devis" prefetch={false}>Demander un devis <ArrowIcon /></Link>
      </div>
    </section>
  );
}
