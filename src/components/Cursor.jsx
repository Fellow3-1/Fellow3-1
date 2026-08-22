import { useEffect, useRef, useState } from "react";

/** Custom two-layer cursor (only on fine pointers). */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    let raf = 0;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    const loop = () => {
      const dx = pos.current.x - ringPos.current.x;
      const dy = pos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.16;
      ringPos.current.y += dy * 0.16;
      // Skip the style write entirely once settled — an idle cursor costs
      // zero main-thread work instead of one transform write per frame.
      if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
        if (ring.current) {
          ring.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    const isInteractive = (el) => el && el.closest("a, button, [data-cursor]");
    const onOver = (e) => setHot(Boolean(isInteractive(e.target)));
    const onOut = (e) => setHot(Boolean(isInteractive(e.relatedTarget)));

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className={`cursor ${hot ? "is-hot" : ""}`} aria-hidden="true">
      <span ref={ring} className="cursor-ring" />
      <span ref={dot} className="cursor-dot" />
    </div>
  );
}
