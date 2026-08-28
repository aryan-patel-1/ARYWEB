import { faqItems } from "@/lib/site";

export function Faq() {
  return (
    <section className="faq section section-space" id="faq" aria-labelledby="faq-title">
      <div className="faq-intro" data-reveal>
        <p className="eyebrow">Questions fréquentes</p>
        <h2 id="faq-title">Avant de se lancer.</h2>
        <p>Les réponses aux questions que l’on se pose généralement avant le premier échange.</p>
        <a className="button button-ghost" href="#contact">Poser ma question</a>
      </div>

      <div className="faq-list" data-reveal data-reveal-delay="1">
        {faqItems.map((item, index) => (
          <details key={item.question} name="faq">
            <summary>
              <span>0{index + 1}</span>
              {item.question}
              <i aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
