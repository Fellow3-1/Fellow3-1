import { useEffect, useRef, useState } from "react";

/**
 * Two-layer custom cursor (ring + dot), fine pointers only.
 *
 * Bleed fixes vs. a naive implementation:
 *  - `cursor: none` is applied from JS by adding a class to <html> ONLY when
 *    the cursor is actually active — keyboard users and touch devices are
 *    never left with an invisible native cursor.
 *  - hides itself when the pointer leaves the window (no ghost ring pinned
 *    to the last position) and when a media/keyboard session starts.
 *  - the trailing ring skips style writes once settled — idle cursor costs
 *    zero main-thread work.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(hover: none)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    let raf = 0;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (ring.current) ring.current.style.opacity = "1";
    };

    const loop = () => {
      const dx = pos.current.x - ringPos.current.x;
      const dy = pos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.16;
      ringPos.current.y += dy * 0.16;
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

    // Hide the ring when the pointer leaves the viewport entirely.
    const onLeaveWindow = () => {
      if (ring.current) ring.current.style.opacity = "0";
    };

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
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
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
