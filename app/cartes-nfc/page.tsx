import { NfcSection } from "@/components/home/nfc-section";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cartes NFC",
  description: "Découvrez les cartes de contact NFC proposées par AryWeb pour ouvrir un site, une page de contact, un menu ou un formulaire sur un smartphone compatible.",
  path: "/cartes-nfc",
});

export default function NfcCardsPage() {
  return (
    <SiteShell mainClassName="inner-page-main">
      <NfcSection />
    </SiteShell>
  );
}
