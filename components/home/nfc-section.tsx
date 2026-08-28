import { ArrowIcon, NfcIcon } from "@/components/icons";

const nfcSteps = [
  ["01", "Vous choisissez le lien"],
  ["02", "On définit la personnalisation"],
  ["03", "J’encode et je vérifie la carte"],
] as const;

export function NfcSection() {
  return (
    <section className="nfc-section section section-space" id="nfc" aria-labelledby="nfc-title">
      <div className="nfc-copy" data-reveal>
        <p className="eyebrow">Cartes de contact NFC</p>
        <h2 id="nfc-title">Le bon lien, directement sur le téléphone.</h2>
        <p className="nfc-lead">
          Une carte NFC peut ouvrir votre site, une page de contact, un menu ou un
          formulaire lorsqu’on l’approche d’un smartphone compatible.
        </p>
        <p>
          Le lien, la personnalisation, la compatibilité et une éventuelle solution
          de secours sont définis avec vous avant le devis.
        </p>

        <ol className="nfc-steps">
          {nfcSteps.map(([number, label]) => (
            <li key={number}><span>{number}</span>{label}</li>
          ))}
        </ol>

        <a className="button button-ghost" href="#contact">
          Parler d’une carte NFC <ArrowIcon />
        </a>
      </div>

      <div className="nfc-demo" data-reveal data-reveal-delay="1" role="img" aria-label="Schéma d’une carte NFC utilisée avec un téléphone">
        <p className="nfc-demo-label">Schéma de principe</p>
        <div className="nfc-card" aria-hidden="true">
          <div className="nfc-card-head"><span>ARYWEB</span><span>CONTACT / 01</span></div>
          <div className="nfc-card-mark"><NfcIcon /></div>
          <div className="nfc-card-copy"><strong>VOTRE NOM</strong><span>Votre activité</span></div>
          <small>APPROCHER DU TÉLÉPHONE</small>
        </div>
        <div className="nfc-phone" aria-hidden="true">
          <span className="nfc-phone-speaker" />
          <div className="nfc-phone-screen">
            <span>LIEN DÉTECTÉ</span>
            <strong>Ouvrir la page&nbsp;?</strong>
            <i>Continuer</i>
          </div>
        </div>
        <div className="nfc-signal" aria-hidden="true"><i /><i /><i /></div>
      </div>
    </section>
  );
}
