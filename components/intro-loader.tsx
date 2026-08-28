"use client";

import { useEffect } from "react";

function finishIntro() {
  document.documentElement.classList.remove("intro-play");
  document.documentElement.classList.add("intro-seen");
}

export function IntroLoader() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("intro-play")) return;
    // The CSS curtain finishes after 880 ms; this fallback releases the state
    // shortly afterwards, including when the first visited route is a legal page.
    const fallback = window.setTimeout(finishIntro, 1_000);
    return () => window.clearTimeout(fallback);
  }, []);

  return (
    <div className="intro-loader" aria-hidden="true">
      <div className="intro-loader__inner">
        <p>Studio web indépendant</p>
        <div className="intro-loader__word">
          <span>ARY</span><strong>WEB</strong>
        </div>
        <div className="intro-loader__line"><i /></div>
        <small>Structure • design • développement</small>
      </div>
    </div>
  );
}
