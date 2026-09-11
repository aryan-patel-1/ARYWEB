import type { Metadata } from "next";
import { LegalHeader } from "@/components/legal-header";
import { legalConfig } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Informations sur le traitement des données du formulaire de contact AryWeb.",
  alternates: { canonical: `${siteConfig.url}/confidentialite` },
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <LegalHeader />
      <main className="legal-content">
        <p className="eyebrow">Protection des données</p>
        <h1>Politique de confidentialité</h1>
        <p className="legal-updated">Dernière mise à jour : 11 septembre 2026</p>

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
            Les formulaires collectent votre nom, votre adresse e-mail et les informations décrivant
            votre projet. Votre entreprise et votre SIRET sont demandés car les prestations sont
            réservées aux professionnels. Selon le formulaire utilisé, votre téléphone, votre budget
            et votre préférence de paiement peuvent également être recueillis. Pour une carte NFC,
            le lien à encoder, les précisions de personnalisation et la quantité sont transmis à Stripe
            avec la commande ; les coordonnées de facturation et de livraison sont collectées lors du paiement.
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
            Les informations des formulaires sont destinées à AryWeb. Formspree intervient comme sous-traitant pour
            recevoir les soumissions, les conserver dans son interface et transmettre les
            notifications associées. Formspree indique s’appuyer sur des clauses contractuelles
            types pour encadrer les transferts de données. Les données ne sont ni vendues ni
            utilisées pour de la prospection sans votre accord. Une demande sans suite est supprimée
            au plus tard douze mois après le dernier échange. Les échanges liés à un contrat peuvent
            être conservés pendant les durées imposées par les obligations légales.
          </p>
          <p>
            Si vous ouvrez une page de paiement, Stripe collecte les coordonnées et données de
            transaction nécessaires au paiement, à la facturation et à la prévention de la fraude.
            AryWeb ne reçoit pas votre numéro de carte complet. Consultez la{" "}
            <a href="https://stripe.com/fr/privacy" rel="noreferrer" target="_blank">
              politique de confidentialité de Stripe
            </a>.
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
