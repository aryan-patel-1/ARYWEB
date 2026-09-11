import { Contact } from "@/components/home/contact";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contactez AryWeb pour poser une question sur votre projet de site internet, votre devis ou une carte NFC.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteShell mainClassName="inner-page-main">
      <Contact />
    </SiteShell>
  );
}
