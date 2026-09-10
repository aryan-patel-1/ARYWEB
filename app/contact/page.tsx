import { Contact } from "@/components/home/contact";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contactez AryWeb pour présenter votre projet de site vitrine, e-commerce, refonte ou carte NFC et recevoir une réponse par e-mail.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SiteShell mainClassName="inner-page-main">
      <Contact />
    </SiteShell>
  );
}
