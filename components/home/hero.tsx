import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { HeroVisual } from "@/components/home/hero-visual";
import { siteConfig } from "@/lib/site";

const marqueeItems = [
  "Réalisations concrètes",
  "Paiement flexible",
  "Cartes NFC",
  "Tarifs accessibles",
];

export function Hero() {
  return (
    <>
      <section className="hero section" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow availability">
            <span className="status-dot" aria-hidden="true" />
            <span>Créateur web étudiant • {siteConfig.location}</span>
          </p>
          <h1 id="hero-title">
            Création de sites internet pour <em>indépendants et commerces</em>
          </h1>
          <svg className="hero-underline" viewBox="0 0 360 24" aria-hidden="true">
            <path d="M4 16C94 4 225 5 356 13" />
          </svg>
          <p className="hero-tagline">
            Votre activité, bien expliquée. <em>Votre site, facile à utiliser.</em>
          </p>
          <p className="hero-lead">
            Je développe AryWeb en parallèle de mes études. Je crée des sites et des
            cartes NFC avec des formats pensés pour les petits budgets et un suivi direct.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/contact" prefetch={false}>
              Parler de mon projet <ArrowIcon />
            </Link>
            <Link className="button button-ghost" href="/methode" prefetch={false}>
              Voir comment je travaille
            </Link>
          </div>
          <ul className="hero-proof" aria-label="Façon de travailler">
            <li><span>01</span> Périmètre adapté au budget</li>
            <li><span>02</span> Un seul interlocuteur</li>
            <li><span>03</span> Projet évolutif par étapes</li>
          </ul>
        </div>

        <HeroVisual />
      </section>

      <div className="marquee" aria-label="Engagements AryWeb">
        <p className="sr-only">Réalisations concrètes, paiement flexible, cartes NFC et tarifs accessibles.</p>
        <div className="marquee-track" aria-hidden="true">
          {marqueeItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}<i>✳</i></span>
          ))}
        </div>
      </div>
    </>
  );
}
