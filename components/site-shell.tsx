import type { ReactNode } from "react";
import { MotionController } from "@/components/motion-controller";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type SiteShellProps = {
  children: ReactNode;
  mainClassName?: string;
};

export function SiteShell({ children, mainClassName }: SiteShellProps) {
  return (
    <div className="site-shell">
      <MotionController />
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <div className="page-background" aria-hidden="true">
        <span className="ambient ambient-one" />
        <span className="ambient ambient-two" />
        <span className="ambient ambient-three" />
      </div>

      <SiteHeader />
      <main className={mainClassName} id="contenu">{children}</main>
      <SiteFooter />
    </div>
  );
}
