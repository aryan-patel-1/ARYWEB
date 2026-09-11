import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="brand" href="/" aria-label="AryWeb — Accueil" prefetch={false}>
            ARY<span>WEB</span>
          </Link>
          <p>Sites web personnalisés sur devis et cartes NFC pour indépendants, artisans et commerces.</p>
        </div>

        <nav className="footer-nav" aria-label="Navigation de pied de page">
          <p>Navigation</p>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} prefetch={false}>{item.label}</Link>
          ))}
        </nav>

        <div className="footer-contact">
          <p>Un projet en tête ?</p>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <span>{siteConfig.location}</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} AryWeb. Tous droits réservés.</p>
        <div>
          <Link href="/mentions-legales" prefetch={false}>Mentions légales</Link>
          <Link href="/cgv" prefetch={false}>CGV</Link>
          <Link href="/confidentialite" prefetch={false}>Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
