import { QuoteForm } from "@/components/quote-form";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Demande de devis",
  description: "Demandez un devis pour votre site, vos contenus de réseaux sociaux ou vos designs de cartes de visite et de fidélité.",
  path: "/devis",
});

export default function QuotePage() {
  return (
    <SiteShell mainClassName="inner-page-main">
      <section className="quote-builder section section-space" aria-labelledby="quote-title">
        <div className="section-heading quote-heading" data-reveal>
          <div>
            <p className="eyebrow">Demande de devis</p>
            <h1 id="quote-title">Parlez-moi de votre projet.</h1>
          </div>
          <p>
            Indiquez vos coordonnées professionnelles et expliquez ce que vous souhaitez.
            Je vous répondrai par e-mail au plus vite avec les prochaines étapes.
          </p>
        </div>
        <QuoteForm contactEmail={siteConfig.email} />
      </section>
    </SiteShell>
  );
}
