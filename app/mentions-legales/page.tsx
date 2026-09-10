import type { Metadata } from "next";
import { LegalHeader } from "@/components/legal-header";
import { legalConfig, legalConfigIsComplete } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site AryWeb.",
  alternates: { canonical: `${siteConfig.url}/mentions-legales` },
  robots: { index: true, follow: true },
};

const value = (content: string) => content || "Information à compléter";

export default function LegalNoticePage() {
  return (
    <div className="legal-page">
      <LegalHeader />
      <main className="legal-content">
        <p className="eyebrow">Informations du site</p>
        <h1>Mentions légales</h1>
        <p className="legal-updated">Dernière mise à jour : 10 septembre 2026</p>

        {!legalConfigIsComplete && (
          <p className="legal-warning" role="status">
            Certaines informations doivent encore être complétées, notamment le téléphone
            professionnel et les coordonnées complètes de l’hébergeur.
          </p>
        )}

        <section>
          <h2>Éditeur du site</h2>
          <p>
            Nom ou raison sociale : {value(legalConfig.legalName)}<br />
            Statut juridique : {value(legalConfig.status)}<br />
            Adresse professionnelle : {value(legalConfig.address)}<br />
            Immatriculation : {value(legalConfig.registration)}<br />
            Téléphone professionnel : {value(legalConfig.editorPhone)}<br />
            E-mail : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>

        <section>
          <h2>Direction de la publication</h2>
          <p>{value(legalConfig.publicationDirector)}</p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>
            Hébergeur : {value(legalConfig.hostName)}<br />
            Adresse : {value(legalConfig.hostAddress)}<br />
            Téléphone : {value(legalConfig.hostPhone)}
          </p>
        </section>

        <section>
          <h2>Propriété intellectuelle</h2>
          <p>
            Sauf mention contraire, les textes, éléments graphiques, interfaces et signes distinctifs
            présents sur ce site sont protégés. Toute reproduction ou utilisation non autorisée est interdite.
          </p>
        </section>

        <section>
          <h2>Responsabilité</h2>
          <p>
            AryWeb s’efforce de fournir des informations exactes et à jour. Le site peut néanmoins
            contenir des erreurs ou connaître des interruptions temporaires. Pour signaler un problème,
            contactez <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
