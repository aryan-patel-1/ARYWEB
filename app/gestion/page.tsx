import { BillingAdmin } from "@/components/billing-admin";
import { SiteShell } from "@/components/site-shell";
export const metadata = { title: "Facturation privée", robots: { index: false, follow: false } };
export default function BillingPage() {
  return <SiteShell mainClassName="inner-page-main"><section className="section section-space"><div className="section-heading"><h1>Facturation AryWeb</h1></div><BillingAdmin /></section></SiteShell>;
}
