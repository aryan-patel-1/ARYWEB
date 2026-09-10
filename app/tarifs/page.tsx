import { Pricing } from "@/components/home/pricing";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { paymentOptions, pricingPlans, siteConfig } from "@/lib/site";

const canonicalUrl = `${siteConfig.url}/tarifs`;

export const metadata = createPageMetadata({
  title: "Tarifs et paiement",
  description: "Découvrez les offres et tarifs AryWeb, le règlement comptant et les abonnements mensuels ou annuels associés aux services récurrents.",
  path: "/tarifs",
});

function parseEuroPrice(label: string) {
  const compactLabel = label.replace(/\s/g, "").replace(",", ".");
  const value = compactLabel.match(/\d+(?:\.\d+)?/)?.[0];
  return value ? Number(value) : undefined;
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OfferCatalog",
      "@id": `${canonicalUrl}#offres`,
      name: "Offres AryWeb",
      url: canonicalUrl,
      numberOfItems: pricingPlans.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: pricingPlans.map((plan, index) => {
        const price = parseEuroPrice(plan.price);

        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Offer",
            name: plan.title,
            description: plan.text,
            url: canonicalUrl,
            ...(price
              ? {
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    minPrice: price,
                    priceCurrency: "EUR",
                  },
                }
              : {}),
            itemOffered: {
              "@type": "Service",
              name: plan.title,
              description: plan.text,
            },
          },
        };
      }),
    },
    {
      "@type": "ItemList",
      "@id": `${canonicalUrl}#paiements`,
      name: "Modes de paiement proposés par AryWeb",
      url: canonicalUrl,
      numberOfItems: paymentOptions.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: paymentOptions.map((option, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: option.title,
        description: `${option.cadence}. ${option.text}`,
      })),
    },
  ],
};

export default function PricingPage() {
  return (
    <SiteShell mainClassName="inner-page-main">
      <Pricing />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </SiteShell>
  );
}
