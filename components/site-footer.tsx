import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <a className="brand" href="#top" aria-label="AryWeb — Retour en haut">
            ARY<span>WEB</span>
          </a>
          <p>Sites web et cartes NFC à tarifs accessibles pour indépendants, artisans et commerces.</p>
        </div>

        <nav className="footer-nav" aria-label="Navigation de pied de page">
          <p>Navigation</p>
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
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
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/confidentialite">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
