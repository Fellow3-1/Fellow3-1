import { useEffect, useRef } from "react";

/**
 * "Phosphor dust" — a light canvas layer of drifting motes that reacts to
 * pointer parallax. Replaces the old particle constellation with something
 * far cheaper: no O(n²) link pass, one fill pass per frame.
 *
 * Perf contract: pauses while the tab is hidden, rAF-debounced resize,
 * DPR capped at 1.5, all listeners passive, fully disabled under
 * prefers-reduced-motion.
 */
export default function ParticleField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let raf = 0;
    let motes = [];
    let resizeQueued = false;
    const mouse = { x: 0.5, y: 0.5 }; // normalized −1..1-ish offsets

    // Accent tints are read ONCE per theme change, not per frame: calling
    // getComputedStyle every frame forces a style recalc each rAF tick.
    let tints = ["82,255,168", "56,200,255", "236,74,64"];
    const readTints = () => {
      const css = getComputedStyle(document.documentElement);
      tints = ["--accent-rgb", "--accent-2-rgb", "--accent-3-rgb"].map(
        (k) => (css.getPropertyValue(k).trim() || "82 255 168").replace(/\s+/g, ","),
      );
    };
    readTints();
    let themeObserver;
    if (typeof MutationObserver !== "undefined") {
      themeObserver = new MutationObserver(readTints);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.width = Math.floor(window.innerWidth * dpr);
      h = canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 26000));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.35 + Math.random() * 0.65, // depth → parallax + size + alpha
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const px = (mouse.x - 0.5) * 26;
      const py = (mouse.y - 0.5) * 26;
      for (let i = 0; i < motes.length; i += 1) {
        const m = motes[i];
        m.x += m.vx * m.z;
        m.y += m.vy * m.z;
        if (m.x < -30) m.x = w + 30;
        if (m.x > w + 30) m.x = -30;
        if (m.y < -30) m.y = h + 30;
        if (m.y > h + 30) m.y = -30;
        m.r = 1.1 * m.z * (w / window.innerWidth || 1);
        const ox = px * m.z;
        const oy = py * m.z;
        ctx.beginPath();
        ctx.arc(m.x + ox, m.y + oy, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${tints[i % 3]},${0.05 + m.z * 0.16})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(() => {
        resize();
        resizeQueued = false;
      });
    };

    const onMove = (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      themeObserver && themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}
