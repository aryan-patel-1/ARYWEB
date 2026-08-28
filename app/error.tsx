"use client";

import { ErrorRedirect } from "@/components/error-redirect";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorRedirect
      eyebrow="Une erreur est survenue"
      title="Le site a rencontré un problème."
      message="Vous pouvez réessayer maintenant ou revenir automatiquement à l’accueil."
      onRetry={reset}
    />
  );
}
