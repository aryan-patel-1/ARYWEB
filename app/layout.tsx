import type { Metadata, Viewport } from "next";
import { IntroLoader } from "@/components/intro-loader";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Création de site internet à Vincennes | AryWeb",
    template: "%s — AryWeb",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: siteConfig.url },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Création de site internet à Vincennes | AryWeb",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "fr_FR",
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630, alt: "AryWeb — Création de site internet à Vincennes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de site internet à Vincennes | AryWeb",
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#05070b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/bricolage-grotesque-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var s=sessionStorage.getItem('aryweb-intro-seen');document.documentElement.classList.add(!r&&!s?'intro-play':'intro-seen');if(!s)sessionStorage.setItem('aryweb-intro-seen','1')}catch(e){document.documentElement.classList.add('intro-seen')}})();`,
          }}
        />
      </head>
      <body>
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
