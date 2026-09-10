"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export function MotionController() {
  const progressRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileOrTouch = window.matchMedia("(pointer: coarse), (max-width: 820px)").matches;
    const revealItems = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    let observer: IntersectionObserver | null = null;

    if (reducedMotion || mobileOrTouch || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.setAttribute("data-in-view", "true"));

      // iOS Safari repaints fixed and filtered layers aggressively while
      // scrolling. Mobile pages don't need the progress animation, so avoid
      // installing scroll and resize observers altogether.
      if (reducedMotion || mobileOrTouch) return;
    } else {
      const waitingItems = revealItems.filter((item) => {
        if (item.getBoundingClientRect().top < window.innerHeight * 0.94) {
          item.setAttribute("data-in-view", "initial");
          return false;
        }
        return true;
      });
      root.classList.add("motion-ready");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-in-view", "true");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -7%" },
      );

      waitingItems.forEach((item) => observer?.observe(item));
    }

    let animationFrame = 0;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const normalized = Math.min(1, Math.max(0, progress));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${normalized})`;
      animationFrame = 0;
    };
    const onScroll = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(onScroll) : null;
    if (resizeObserver) resizeObserver.observe(document.body);

    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      root.classList.remove("motion-ready");
    };
  }, [pathname]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
