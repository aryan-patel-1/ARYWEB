import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const marketingPages = [
    "realisations",
    "cartes-nfc",
    "tarifs",
    "methode",
    "a-propos",
    "faq",
    "contact",
  ].map((path) => ({
    url: `${siteConfig.url}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "contact" ? 0.8 : 0.7,
  }));

  const pages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...marketingPages,
    {
      url: `${siteConfig.url}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/cgv`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return pages;
}
