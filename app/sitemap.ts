import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { legalConfigIsComplete } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  if (legalConfigIsComplete) {
    pages.push({
      url: `${siteConfig.url}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    });
  }

  return pages;
}
