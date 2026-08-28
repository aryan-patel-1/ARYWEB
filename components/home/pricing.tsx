import { ArrowIcon, CheckIcon } from "@/components/icons";
import { pricingPlans } from "@/lib/site";

export function Pricing() {
  return (
    <section className="pricing section section-space" id="tarifs" aria-labelledby="pricing-title">
      <div className="section-heading pricing-heading" data-reveal>
        <div>
          <p className="eyebrow">Tarifs accessibles</p>
          <h2 id="pricing-title">Commencer par l’essentiel, sans gonfler le devis.</h2>
        </div>
        <p>
          Je développe AryWeb en parallèle de mes études. Ma structure légère me permet
          de proposer des formats adaptés aux petits budgets, avec un périmètre précis.
        </p>
      </div>

      <div className="budget-callout" data-reveal>
        <span>Petit budget bienvenu</span>
        <p>
          Donnez-moi votre limite dès le premier échange. Je vous indique ce qui peut
          être fait maintenant et ce qui peut attendre une prochaine étape.
        </p>
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
              <a href="#contact">Parler de cette offre <ArrowIcon /></a>
            </article>
          );
        })}
      </div>

      <p className="pricing-note" data-reveal>
        Un tarif « à partir de » correspond au périmètre indiqué dans l’offre. Le devis
        confirme le montant final, le régime de TVA et les éventuels frais de domaine,
        d’hébergement, d’outils ou de livraison.
      </p>
    </section>
  );
}
