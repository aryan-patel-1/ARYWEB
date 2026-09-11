import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { paymentOptions, pricingPlans, stripeCheckout } from "@/lib/site";
import { siteConfig } from "@/lib/site";
import { QuoteForm } from "@/components/quote-form";

export function Pricing() {
  const [websitePlan, nfcPlan, hostingPlan, ...creativePlans] = pricingPlans;

  return (
    <section className="pricing section section-space" id="tarifs" aria-labelledby="pricing-title">
      <div className="section-heading pricing-heading" data-reveal>
        <div>
          <p className="eyebrow">Tarifs & paiement</p>
          <h1 id="pricing-title">Votre site est chiffré selon le travail réel.</h1>
        </div>
        <p>
          Il n’existe pas de faux forfait universel : les pages, les contenus et les
          fonctionnalités sont étudiés avant de proposer un montant.
        </p>
      </div>

      <div className="budget-callout" data-reveal>
        <span>Un devis avant le paiement</span>
        <p>
          Présentez votre entreprise et décrivez votre besoin. Je vous répondrai
          par e-mail au plus vite pour préparer un devis personnalisé.
        </p>
        <Link className="budget-callout-link" href="/devis" prefetch={false}>
          Demander un devis <ArrowIcon />
        </Link>
      </div>

      <article className="website-offer" aria-labelledby="website-offer-title" data-reveal>
        <div className="website-offer-intro">
          <p className="eyebrow">Votre projet web</p>
          <h2 id="website-offer-title">{websitePlan.title}</h2>
          <p>{websitePlan.text}</p>
          <strong className="website-offer-price">{websitePlan.price}</strong>
          <ul>{websitePlan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul>
          <Link className="button button-primary" href={websitePlan.ctaHref} prefetch={false}>
            {websitePlan.ctaLabel} <ArrowIcon />
          </Link>
        </div>
        <div className="website-payment">
          <h3>Comment régler votre site ?</h3>
          <p>Les modalités sont définies ensemble dans votre devis.</p>
          <dl className="website-payment-list">
            {paymentOptions.map((option) => (
              <div key={option.title}>
                <dt>{option.title}<small>{option.cadence}</small></dt>
                <dd>{option.text}</dd>
              </div>
            ))}
          </dl>
          <div className="hosting-attached">
            <h3>Avec votre site : serveur + domaine</h3>
            <strong>{hostingPlan.price} / an</strong>
            <p>Abonnement obligatoire pour le serveur, l’hébergement et le nom de domaine. Renouvellement annuel, distinct du prix de création.</p>
            <p>Le lien de souscription vous est transmis après validation du devis.</p>
          </div>
        </div>
      </article>

      <div className="fixed-offers-heading">
        <p className="eyebrow">Votre communication</p>
        <h2>Des créations pour faire connaître votre entreprise.</h2>
      </div>

      <div className="pricing-grid">
        {creativePlans.map((plan, index) => {
          const hasFixedPrice = plan.price !== "Sur devis";
          return (
            <article className="price-card" key={plan.title} data-reveal data-reveal-delay={index + 1}>
              <div className="price-card-head"><span>{plan.number}</span><small>ARYWEB / OFFRE</small></div>
              <h3>{plan.title}</h3>
              <p>{plan.text}</p>
              <div className="price-value">
                <span>{hasFixedPrice ? "Prix fixe" : "Tarif"}</span>
                <strong>{plan.price}</strong>
                <small>{plan.billing}</small>
              </div>
              <ul>
                {plan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}
              </ul>
              <div className="price-card-actions">
                {plan.paymentLink ? (
                  <a
                    className="stripe-checkout-link"
                    href={plan.paymentLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {stripeCheckout.mode === "test" ? "Tester avec Stripe" : "Payer avec Stripe"}
                    <ArrowIcon />
                  </a>
                ) : null}
                <Link className="price-contact-link" href={plan.ctaHref} prefetch={false}>
                  {plan.ctaLabel} <ArrowIcon />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <section className="nfc-order-block" id="commander-nfc" aria-labelledby="nfc-order-title">
        <div className="nfc-order-intro">
          <p className="eyebrow">Carte NFC · paiement unique</p>
          <h2 id="nfc-order-title">Votre contact, accessible en un geste.</h2>
          <p>Une carte professionnelle prête à partager le lien de votre choix, sans abonnement.</p>
        </div>
        <div className="nfc-order-purchase">
          <div className="nfc-order-price">
            <span>Prix fixe</span>
            <strong>{nfcPlan.price}</strong>
            <small>par carte · paiement unique</small>
          </div>
          <ul>
            {nfcPlan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}
          </ul>
          <details className="nfc-order-details">
            <summary className="button button-primary">
              Commander une carte NFC <ArrowIcon />
            </summary>
            <div className="nfc-order-form">
              <QuoteForm contactEmail={siteConfig.email} nfc />
            </div>
          </details>
        </div>
      </section>
    </section>
  );
}
