import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
export const metadata = { title: "Retour du paiement", robots: { index: false, follow: false } };
export default function PaymentPage() {
  return <SiteShell><section className="section section-space"><h1>Merci pour votre démarche.</h1><p>Consultez la confirmation Stripe pour connaître le statut du paiement. AryWeb vérifiera votre règlement et reviendra vers vous par e-mail au plus vite.</p><Link className="button button-primary" href="/contact">Me contacter</Link></section></SiteShell>;
}
