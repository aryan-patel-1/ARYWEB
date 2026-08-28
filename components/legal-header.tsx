import Link from "next/link";

export function LegalHeader() {
  return (
    <header className="legal-header">
      <Link className="brand" href="/" aria-label="AryWeb — Accueil">ARY<span>WEB</span></Link>
      <Link href="/">Retour au site</Link>
    </header>
  );
}
