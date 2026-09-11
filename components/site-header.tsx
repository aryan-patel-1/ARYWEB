"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/icons";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/+$/, "") || "/";

  useEffect(() => {
    let animationFrame = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let previousTime = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileOrTouch = window.matchMedia("(pointer: coarse), (max-width: 820px)").matches;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const interpolate = (start: number, end: number, progress: number) => start + (end - start) * progress;
    const smoothstep = (progress: number) => progress * progress * (3 - 2 * progress);

    const applyProgress = (progress: number) => {
      const header = headerRef.current;
      if (!header) return;

      const viewportWidth = window.innerWidth;
      const mobile = viewportWidth <= 600;
      const expandedWidth = Math.min(1_180, Math.max(240, viewportWidth - (mobile ? 24 : 40)));
      const compactWidth = Math.min(960, Math.max(232, viewportWidth - (mobile ? 40 : 64)));
      const expandedHeight = mobile ? 64 : 70;
      const compactHeight = mobile ? 56 : 60;
      const expandedPadding = mobile ? 10 : 14;
      const compactPadding = mobile ? 8 : 16;

      header.style.width = `${interpolate(expandedWidth, compactWidth, progress).toFixed(2)}px`;
      header.style.height = `${interpolate(expandedHeight, compactHeight, progress).toFixed(2)}px`;
      header.style.paddingInline = `${interpolate(expandedPadding, compactPadding, progress).toFixed(2)}px`;
      header.style.setProperty("--nav-bg-alpha", interpolate(0.2, 0.84, progress).toFixed(3));
      header.style.setProperty("--nav-border-alpha", interpolate(0.1, 0.24, progress).toFixed(3));
      header.style.setProperty("--nav-shadow-alpha", interpolate(0, 0.4, progress).toFixed(3));
      header.style.setProperty("--nav-accent-alpha", interpolate(0, 0.06, progress).toFixed(3));
    };

    const animate = (time: number) => {
      animationFrame = 0;
      const elapsed = Math.min(64, time - previousTime);
      previousTime = time;
      const damping = 1 - Math.exp(-elapsed / 145);
      currentProgress += (targetProgress - currentProgress) * damping;

      if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;
      applyProgress(smoothstep(currentProgress));

      if (currentProgress !== targetProgress) animationFrame = window.requestAnimationFrame(animate);
    };

    const requestAnimation = () => {
      if (animationFrame) return;
      previousTime = performance.now();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const updateScrollTarget = () => {
      targetProgress = clamp((window.scrollY - 8) / 152);
      if (reducedMotion) {
        currentProgress = targetProgress;
        applyProgress(smoothstep(currentProgress));
        return;
      }
      requestAnimation();
    };

    const updateDimensions = () => {
      applyProgress(smoothstep(currentProgress));
      updateScrollTarget();
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    // Keep the mobile header static. Animating the dimensions and shadow of a
    // sticky, rounded and blurred element causes expensive repaints in WebKit.
    if (mobileOrTouch) {
      window.addEventListener("keydown", closeOnEscape);
      return () => window.removeEventListener("keydown", closeOnEscape);
    }

    targetProgress = clamp((window.scrollY - 8) / 152);
    currentProgress = targetProgress;
    applyProgress(smoothstep(currentProgress));
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("scroll", updateScrollTarget, { passive: true });
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("scroll", updateScrollTarget);
      window.removeEventListener("resize", updateDimensions);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="site-header-slot">
      <header
        className={`site-header${isOpen ? " is-menu-open" : ""}`}
        aria-label="Navigation principale"
        ref={headerRef}
      >
        <Link className="brand" href="/" aria-label="AryWeb — Accueil" prefetch={false}>
          ARY<span>WEB</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <Link
              aria-current={currentPath === item.href ? "page" : undefined}
              href={item.href}
              key={item.href}
              prefetch={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          aria-current={currentPath === "/contact" ? "page" : undefined}
          className="header-cta"
          href="/contact"
          prefetch={false}
        >
          Me contacter <ArrowIcon />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`mobile-panel ${isOpen ? "is-open" : ""}`} id="mobile-navigation">
          <nav aria-label="Navigation mobile">
            {navigation.map((item) => (
              <Link
                aria-current={currentPath === item.href ? "page" : undefined}
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
                prefetch={false}
              >
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link
              aria-current={currentPath === "/contact" ? "page" : undefined}
              className="mobile-contact"
              href="/contact"
              onClick={() => setIsOpen(false)}
              prefetch={false}
            >
              Me contacter
              <ArrowIcon />
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
