import { Faq } from "@/components/home/faq";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { faqItems, siteConfig } from "@/lib/site";

const canonicalUrl = `${siteConfig.url}/faq`;

export const metadata = createPageMetadata({
  title: "Questions fréquentes",
  description: "Retrouvez les réponses aux questions fréquentes sur les délais, les tarifs, les paiements, les contenus, les modifications et les cartes NFC.",
  path: "/faq",
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${canonicalUrl}#faq`,
  url: canonicalUrl,
  inLanguage: "fr-FR",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <SiteShell mainClassName="inner-page-main">
      <Faq />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </SiteShell>
  );
}
