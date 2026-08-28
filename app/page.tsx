import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { NfcSection } from "@/components/home/nfc-section";
import { Pricing } from "@/components/home/pricing";
import { Process } from "@/components/home/process";
import { Services } from "@/components/home/services";
import { MotionController } from "@/components/motion-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { faqItems, services, siteConfig } from "@/lib/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "fr-FR",
        description: siteConfig.description,
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        description: siteConfig.description,
        areaServed: "France",
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.text,
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="site-shell">
      <MotionController />
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <div className="page-background" aria-hidden="true">
        <span className="ambient ambient-one" />
        <span className="ambient ambient-two" />
        <span className="ambient ambient-three" />
      </div>

      <SiteHeader />
      <main id="contenu">
        <Hero />
        <Services />
        <NfcSection />
        <Pricing />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
