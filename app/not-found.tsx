import { ErrorRedirect } from "@/components/error-redirect";

export default function NotFound() {
  return (
    <ErrorRedirect
      eyebrow="Erreur 404"
      title="Cette page a pris un autre chemin."
      message="Le lien est peut-être incorrect ou la page n’existe plus."
    />
  );
}
