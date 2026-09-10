import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function createPageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const socialTitle = `${title} — ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "fr_FR",
      images: [{
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${title}`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
  };
}
