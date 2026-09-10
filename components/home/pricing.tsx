import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { paymentOptions, pricingPlans } from "@/lib/site";

export function Pricing() {
  return (
    <section className="pricing section section-space" id="tarifs" aria-labelledby="pricing-title">
      <div className="section-heading pricing-heading" data-reveal>
        <div>
          <p className="eyebrow">Tarifs & paiement</p>
          <h1 id="pricing-title">Une offre claire, avec un rythme de paiement adapté.</h1>
        </div>
        <p>
          Le prix dépend du périmètre réel. Après validation du devis, vous réglez
          comptant ou choisissez une formule récurrente mensuelle ou annuelle.
        </p>
      </div>

      <div className="budget-callout" data-reveal>
        <span>Trois façons de régler</span>
        <p>
          Aucun paiement n’est demandé avant d’avoir cadré le projet. Le devis indique
          le montant, ce qui est inclus et les conditions correspondant au rythme choisi.
        </p>
      </div>

      <div className="payment-options" aria-label="Modes de paiement proposés">
        {paymentOptions.map((option, index) => (
          <article className="payment-option" key={option.title} data-reveal data-reveal-delay={index + 1}>
            <div><span>{option.number}</span><small>{option.cadence}</small></div>
            <h3>{option.title}</h3>
            <p>{option.text}</p>
          </article>
        ))}
      </div>

      <div className="pricing-grid">
        {pricingPlans.map((plan, index) => {
          const hasStartingPrice = plan.price !== "Sur devis";
          return (
            <article className="price-card" key={plan.title} data-reveal data-reveal-delay={index + 1}>
              <div className="price-card-head"><span>{plan.number}</span><small>ARYWEB / OFFRE</small></div>
              <h3>{plan.title}</h3>
              <p>{plan.text}</p>
              <div className="price-value">
                <span>{hasStartingPrice ? "À partir de" : "Tarif"}</span>
                <strong>{plan.price}</strong>
                <small>{plan.billing}</small>
              </div>
              <ul>
                {plan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}
              </ul>
              <Link href="/contact" prefetch={false}>Parler de cette offre <ArrowIcon /></Link>
            </article>
          );
        })}
      </div>

      <p className="pricing-note" data-reveal>
        Le mensuel et l’annuel sont des abonnements liés à des services récurrents : ils
        ne correspondent pas au paiement échelonné du prix de création. Le devis confirme
        le montant final, la durée, la résiliation, le régime de TVA et les éventuels frais tiers.
      </p>
    </section>
  );
}
