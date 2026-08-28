"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/icons";

type ErrorRedirectProps = {
  eyebrow: string;
  title: string;
  message: string;
  onRetry?: () => void;
};

const redirectDelay = 5;

export function ErrorRedirect({ eyebrow, title, message, onRetry }: ErrorRedirectProps) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(redirectDelay);

  useEffect(() => {
    const countdown = window.setInterval(() => {
      setSeconds((current) => Math.max(1, current - 1));
    }, 1_000);
    const redirect = window.setTimeout(() => router.replace("/"), redirectDelay * 1_000);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(redirect);
    };
  }, [router]);

  return (
    <main className="not-found">
      <div className="error-panel">
        <Link className="brand" href="/" aria-label="AryWeb — Accueil">ARY<span>WEB</span></Link>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="error-actions">
          <Link className="button button-primary" href="/">
            Retour à l’accueil <ArrowIcon />
          </Link>
          {onRetry && (
            <button className="button button-ghost" type="button" onClick={onRetry}>
              Réessayer
            </button>
          )}
        </div>
        <p className="redirect-notice" aria-live="polite">
          Redirection automatique dans {seconds} seconde{seconds > 1 ? "s" : ""}.
        </p>
      </div>
    </main>
  );
}
