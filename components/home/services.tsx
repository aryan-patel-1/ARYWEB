import { ArrowIcon, BagIcon, NfcIcon, SparkIcon, WindowIcon } from "@/components/icons";
import { services } from "@/lib/site";

const serviceIcons = {
  window: WindowIcon,
  bag: BagIcon,
  spark: SparkIcon,
  nfc: NfcIcon,
};

export function Services() {
  return (
    <section className="services section section-space" id="services" aria-labelledby="services-title">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">Ce que je peux faire pour vous</p>
          <h2 id="services-title">Sites, boutiques, refontes et cartes NFC.</h2>
        </div>
        <p>
          Vous n’avez pas à choisir une technologie avant de me contacter. Je vous indique
          ce qui est nécessaire, ce qui est optionnel et ce qu’on peut laisser de côté.
        </p>
      </div>

      <div className="service-list">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.icon];
          return (
            <article
              className="service-row"
              key={service.title}
              data-reveal
              data-reveal-delay={index + 1}
            >
              <div className="service-index">
                <span>{service.number}</span>
                <i aria-hidden="true"><Icon /></i>
              </div>
              <div className="service-name">
                <h3>{service.title}</h3>
                <a href="#contact" aria-label={`En parler — projet de ${service.title.toLowerCase()}`}>
                  En parler <ArrowIcon />
                </a>
              </div>
              <p>{service.text}</p>
              <ul aria-label={`Éléments inclus pour ${service.title}`}>
                {service.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
