import type { Metadata, Viewport } from "next";
import { IntroLoader } from "@/components/intro-loader";
import { siteConfig } from "@/lib/site";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";

const isPublicUrl = !siteConfig.url.includes("localhost");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "AryWeb — Sites web pour indépendants et commerces",
    template: "%s — AryWeb",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  robots: {
    index: isPublicUrl,
    follow: isPublicUrl,
    googleBot: { index: isPublicUrl, follow: isPublicUrl },
  },
  icons: {
    icon: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "AryWeb — Sites web pour indépendants et commerces",
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "AryWeb — Sites web pour indépendants et commerces" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AryWeb — Sites web pour indépendants et commerces",
    description: siteConfig.description,
    images: ["/opengraph-image"],
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
