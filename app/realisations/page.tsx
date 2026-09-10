import { Projects } from "@/components/home/projects";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { projects, siteConfig } from "@/lib/site";

const canonicalUrl = `${siteConfig.url}/realisations`;

export const metadata = createPageMetadata({
  title: "Réalisations",
  description: "Découvrez les réalisations présentées par AryWeb : sites vitrines, e-commerce, réservation en ligne et portfolio étudiant.",
  path: "/realisations",
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${canonicalUrl}#liste`,
  name: "Réalisations AryWeb",
  url: canonicalUrl,
  numberOfItems: projects.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "WebSite",
      name: project.title,
      description: project.description,
      url: project.url,
      image: `${siteConfig.url}${project.image}`,
      genre: project.category,
      creditText: project.credit,
    },
  })),
};

export default function ProjectsPage() {
  return (
    <SiteShell mainClassName="inner-page-main">
      <Projects />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </SiteShell>
  );
}
