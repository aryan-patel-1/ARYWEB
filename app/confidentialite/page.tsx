import type { Metadata } from "next";
import { LegalHeader } from "@/components/legal-header";
import { legalConfig } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Informations sur le traitement des données du formulaire de contact AryWeb.",
  alternates: { canonical: "/confidentialite" },
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <LegalHeader />
      <main className="legal-content">
        <p className="eyebrow">Protection des données</p>
        <h1>Politique de confidentialité</h1>
        <p className="legal-updated">Dernière mise à jour : 28 août 2026</p>

        <section>
          <h2>Responsable du traitement</h2>
          <p>
            {legalConfig.legalName}, sous le nom AryWeb, traite les demandes envoyées depuis ce site.
            Pour toute question relative
            à vos données, écrivez à <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </section>

        <section>
          <h2>Données et finalité</h2>
          <p>
            Le formulaire collecte votre nom, votre adresse e-mail, et, si vous choisissez de les
            communiquer, votre téléphone, votre budget et les informations décrivant votre projet.
            Les champs signalés par un astérisque sont indispensables pour traiter la demande ;
            les autres sont facultatifs. Ces données sont utilisées uniquement pour étudier votre
            demande et vous répondre.
          </p>
        </section>

        <section>
          <h2>Base légale</h2>
          <p>
            Le traitement est nécessaire pour répondre à votre demande et, le cas échéant,
            prendre des mesures précontractuelles à votre initiative.
          </p>
        </section>

        <section>
          <h2>Destinataires et conservation</h2>
          <p>
            Les informations sont destinées à AryWeb. Lorsque l’envoi automatique est activé,
            Resend, Inc. intervient comme sous-traitant pour acheminer les e-mails. Resend indique
            que le contenu des messages, les journaux et certaines données de compte sont stockés
            aux États-Unis ; ces transferts sont encadrés par le Data Privacy Framework et des
            clauses contractuelles types. Les données ne sont ni vendues ni utilisées pour de la
            prospection sans votre accord. Une demande sans suite est supprimée au plus tard douze
            mois après le dernier échange. Les échanges liés à un contrat peuvent être conservés
            pendant les durées imposées par les obligations légales.
          </p>
        </section>

        <section>
          <h2>Vos droits</h2>
          <p>
            Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou,
            lorsqu’elle s’applique, la portabilité de vos données. Vous pouvez également vous opposer
            à certains traitements en écrivant à{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Si vous estimez que vos droits
            ne sont pas respectés après nous avoir contactés, vous pouvez adresser une réclamation à la{" "}
            <a href="https://www.cnil.fr/fr/plaintes" rel="noreferrer" target="_blank">CNIL</a>.
          </p>
        </section>

        <section>
          <h2>Cookies et mesure d’audience</h2>
          <p>
            Ce site n’installe actuellement aucun traceur publicitaire ou outil de mesure d’audience.
            Les fonctions techniques indispensables peuvent utiliser des données de connexion pour
            assurer la sécurité et limiter les envois abusifs.
          </p>
        </section>
      </main>
    </div>
  );
}
