import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isPublicUrl = !siteConfig.url.includes("localhost");

  return {
    rules: {
      userAgent: "*",
      allow: isPublicUrl ? "/" : undefined,
      disallow: isPublicUrl ? ["/api/"] : "/",
    },
    sitemap: isPublicUrl ? `${siteConfig.url}/sitemap.xml` : undefined,
  };
}
