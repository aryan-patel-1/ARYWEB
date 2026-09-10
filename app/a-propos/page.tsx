import { About } from "@/components/home/about";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "À propos",
  description: "Découvrez la façon de travailler d’AryWeb : un interlocuteur direct, des étapes validées et un périmètre adapté au budget.",
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <SiteShell mainClassName="inner-page-main">
      <About />
    </SiteShell>
  );
}
