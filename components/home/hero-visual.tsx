"use client";

import Image from "next/image";
import { PointerEvent, useEffect, useRef } from "react";

export function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    const motionDisabled = window.matchMedia("(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)").matches;
    rectRef.current = motionDisabled ? null : event.currentTarget.getBoundingClientRect();
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = rectRef.current;
    if (!rect || event.pointerType === "touch") return;
    pointerRef.current = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    };
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      const visual = visualRef.current;
      if (visual) {
        visual.style.setProperty("--pointer-x", pointerRef.current.x.toFixed(3));
        visual.style.setProperty("--pointer-y", pointerRef.current.y.toFixed(3));
      }
      frameRef.current = 0;
    });
  }

  function resetPointer() {
    const visual = visualRef.current;
    if (!visual) return;
    rectRef.current = null;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    visual.style.setProperty("--pointer-x", "0");
    visual.style.setProperty("--pointer-y", "0");
  }

  return (
    <div
      className="hero-editorial"
      aria-hidden="true"
      ref={visualRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="editorial-sheet">
        <div className="sheet-meta">
          <span>ARYWEB</span>
        </div>
        <p className="sheet-small">Un site doit répondre à</p>
        <p className="sheet-word">QUI ?</p>
        <p className="sheet-word sheet-word-outline">QUOI ?</p>
        <div className="sheet-rule" />
        <p className="sheet-conclusion">ET ENSUITE,<br /><strong>COMMENT ?</strong></p>
        <div className="sheet-footer">
          <span>CONTENU</span><i />
          <span>DESIGN</span><i />
          <span>MISE EN LIGNE</span>
        </div>
      </div>

      <div className="avatar-sticker">
        <span className="sticker-note">Salut !</span>
        <Image
          src="/aryweb-avatar.webp"
          alt=""
          width={300}
          height={300}
          preload
          sizes="(max-width: 600px) 180px, 280px"
        />
      </div>

    </div>
  );
}
