import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const isPublicUrl = !siteConfig.url.includes("localhost");

  return {
    rules: {
      userAgent: "*",
      allow: isPublicUrl ? "/" : undefined,
      disallow: isPublicUrl ? undefined : "/",
    },
    sitemap: isPublicUrl ? `${siteConfig.url}/sitemap.xml` : undefined,
  };
}
