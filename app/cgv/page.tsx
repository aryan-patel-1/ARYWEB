import type { Metadata } from "next";
import { LegalHeader } from "@/components/legal-header";
import { cgvConfigIsComplete, legalConfig } from "@/lib/legal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente et de prestation de services d’AryWeb.",
  alternates: { canonical: `${siteConfig.url}/cgv` },
};

const value = (content: string) => content || "Information à compléter";

export default function TermsPage() {
  return (
    <div className="legal-page">
      <LegalHeader />
      <main className="legal-content">
        <p className="eyebrow">Prestations et commandes</p>
        <h1>Conditions générales de vente</h1>
        <p className="legal-updated">Dernière mise à jour : 31 août 2026</p>

        {!cgvConfigIsComplete && (
          <p className="legal-warning" role="status">
            Ces CGV doivent encore être complétées avec les informations juridiques de
            l’entreprise avant leur utilisation.
          </p>
        )}

        <section>
          <h2>1. Identité du prestataire</h2>
          <p>
            Les prestations sont proposées sous le nom AryWeb par {value(legalConfig.legalName)},
            {" "}{value(legalConfig.status)}, immatriculation : {value(legalConfig.registration)}.<br />
            Adresse professionnelle : {value(legalConfig.address)}<br />
            Téléphone : {value(legalConfig.editorPhone)}<br />
            E-mail : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
        </section>

        <section>
          <h2>2. Objet et champ d’application</h2>
          <p>
            Les présentes conditions encadrent les prestations proposées par AryWeb, notamment
            la conception ou la refonte de sites internet, l’accompagnement à la mise en ligne
            et la préparation de cartes de contact NFC. Elles s’appliquent exclusivement aux
            clients professionnels agissant pour les besoins de leur activité. Le devis accepté
            précise le périmètre exact de chaque mission et prévaut en cas de contradiction.
          </p>
        </section>

        <section>
          <h2>3. Devis et formation du contrat</h2>
          <p>
            Les prestations sur mesure font l’objet d’un devis précisant leur contenu, leur prix, leurs délais
            estimatifs et ses éventuelles conditions particulières. Le contrat est formé lorsque
            le client accepte le devis selon les modalités qui y sont indiquées et, lorsqu’un
            acompte est prévu, après son encaissement. Toute demande hors périmètre fait l’objet
            d’un accord complémentaire ou d’un nouveau devis.
          </p>
          <p>Les cartes NFC à prix fixe font l’objet d’un formulaire de commande préalable au paiement.
            La commande est confirmée après validation du paiement. Les prestations de création de
            contenu et de design de cartes de visite ou de fidélité sont chiffrées sur devis.</p>
        </section>

        <section>
          <h2>4. Prix et paiement</h2>
          <p>
            Les prix et le régime de TVA applicable sont indiqués sur le devis et la facture.
            Conditions d’acompte : {legalConfig.depositTerms}. Conditions de paiement :
            {" "}{legalConfig.paymentTerms}. Toute création de site AryWeb comprend séparément
            un abonnement obligatoire de 20 euros par an pour le serveur, l’hébergement et le nom
            de domaine. Les licences ou autres services tiers ne sont inclus que si le devis le mentionne.
          </p>
          <p>
            Pour un client professionnel, tout retard peut entraîner les pénalités indiquées sur
            la facture ainsi que l’indemnité forfaitaire légale de 40 euros pour frais de
            recouvrement. Aucun escompte n’est accordé pour paiement anticipé, sauf mention contraire.
          </p>
        </section>

        <section>
          <h2>5. Délais et collaboration du client</h2>
          <p>
            Les délais commencent lorsque AryWeb dispose de l’acompte éventuellement prévu et de
            tous les contenus et accès nécessaires. Le client s’engage à transmettre des éléments
            exploitables, à répondre dans un délai raisonnable et à vérifier les livrables. Un retard
            du client ou d’un service tiers peut décaler le calendrier sans engager la responsabilité
            d’AryWeb. Une date n’est ferme que si le devis la présente expressément comme telle.
          </p>
        </section>

        <section>
          <h2>6. Modifications et validation</h2>
          <p>
            Le nombre d’allers-retours inclus et les étapes de validation figurent sur le devis.
            Les corrections d’erreurs comprises dans le périmètre sont effectuées sans supplément.
            Les changements de besoin, ajouts de pages, fonctions ou contenus peuvent être facturés
            après information et accord du client. La validation d’une étape permet de poursuivre
            la réalisation sur cette base.
          </p>
        </section>

        <section>
          <h2>7. Contenus et droits de propriété intellectuelle</h2>
          <p>
            Le client garantit qu’il dispose des droits nécessaires sur les textes, images, marques
            et autres éléments qu’il fournit. Les outils, méthodes, composants préexistants et
            éléments de tiers restent soumis à leurs droits et licences respectifs. Les droits
            portant sur les créations réalisées pour le client ne sont cédés que dans les limites
            expressément prévues au devis et après paiement complet des sommes dues.
          </p>
        </section>

        <section>
          <h2>8. Livraison, mise en ligne et services tiers</h2>
          <p>
            La livraison intervient selon la forme prévue au devis. Avant la mise en ligne, le client
            vérifie notamment les textes, prix, coordonnées et informations légales de son activité.
            Les hébergeurs, registrars, solutions de paiement, formulaires et autres services tiers
            appliquent leurs propres conditions. AryWeb ne garantit pas leur disponibilité continue
            ni les modifications décidées par ces fournisseurs.
          </p>
        </section>

        <section>
          <h2>9. Annulation et résiliation</h2>
          <p>
            Toute interruption demandée par le client entraîne le paiement des prestations déjà
            réalisées et des frais engagés. L’abonnement serveur, hébergement et nom de domaine
            est renouvelé annuellement jusqu’à résiliation selon le délai indiqué dans le devis.
            Le devis précise également les conséquences de la résiliation sur la disponibilité du
            site et la gestion du nom de domaine.
            En cas de manquement grave par une partie, l’autre partie peut mettre fin au contrat après
            une mise en demeure restée sans effet dans un délai raisonnable, sans préjudice des sommes
            déjà dues et des éventuels dommages démontrés.
          </p>
        </section>

        <section>
          <h2>10. Responsabilité et force majeure</h2>
          <p>
            Chaque partie répond des dommages directs causés par ses manquements. AryWeb ne répond pas
            des contenus fournis ou validés par le client, d’un mauvais usage du livrable, ni des
            défaillances imputables au client ou à un service tiers. Aucune partie n’est responsable
            d’un retard causé par un événement de force majeure au sens du droit français.
          </p>
        </section>

        <section>
          <h2>11. Données personnelles</h2>
          <p>
            Les informations nécessaires au traitement des demandes et à l’exécution des contrats
            sont utilisées conformément à la <a href="/confidentialite">politique de confidentialité</a>
            {" "}du site.
          </p>
        </section>

        <section>
          <h2>12. Réclamations et litiges</h2>
          <p>
            Toute réclamation doit d’abord être adressée à
            {" "}<a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Le contrat est soumis au
            droit français. Les parties s’engagent à rechercher une solution amiable avant toute action.
            À défaut d’accord, le litige relève des juridictions compétentes selon les règles légales
            applicables aux relations entre professionnels.
          </p>
        </section>
      </main>
    </div>
  );
}
