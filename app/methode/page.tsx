import { Process } from "@/components/home/process";
import { ValueSection } from "@/components/home/value-section";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Méthode de travail",
  description: "Découvrez les quatre étapes de travail AryWeb, du cadrage à la mise en ligne, ainsi que les livrables préparés selon le projet.",
  path: "/methode",
});

export default function MethodPage() {
  return (
    <SiteShell mainClassName="inner-page-main">
      <Process />
      <ValueSection />
    </SiteShell>
  );
}
