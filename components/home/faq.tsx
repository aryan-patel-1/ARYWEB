import Link from "next/link";
import { faqItems } from "@/lib/site";

export function Faq() {
  return (
    <section className="faq section section-space" id="faq" aria-labelledby="faq-title">
      <div className="faq-intro" data-reveal>
        <p className="eyebrow">Questions fréquentes</p>
        <h1 id="faq-title">Avant de se lancer.</h1>
        <p>Les réponses aux questions que l’on se pose généralement avant le premier échange.</p>
        <Link className="button button-ghost" href="/contact" prefetch={false}>Poser ma question</Link>
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
