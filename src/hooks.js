import { useCallback, useEffect, useRef, useState } from "react";

/** Nairobi wall-clock, updating every second. */
export function useNairobiClock() {
  const [time, setTime] = useState(() => format());
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function format() {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Africa/Nairobi",
    hour12: false,
  });
}

/** Live mount-time uptime counter for the neofetch panel. */
export function useUptime(startDate = "2014-10-01T00:00:00+03:00") {
  const [label, setLabel] = useState("");
  useEffect(() => {
    const tick = () => {
      const ms = Date.now() - new Date(startDate).getTime();
      const days = Math.floor(ms / 86400000);
      const years = Math.floor(days / 365.25);
      const rem = days - Math.floor(years * 365.25);
      setLabel(`${years}y ${rem}d ${String(Math.floor((ms % 86400000) / 3600000)).padStart(2, "0")}h`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [startDate]);
  return label;
}

/** Typewriter that cycles through a list of strings. */
export function useTypewriter(words, { typeMs = 55, holdMs = 1500, delMs = 28 } = {}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [pos, setPos] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let t;
    if (!deleting && pos < word.length) {
      t = setTimeout(() => setPos(pos + 1), typeMs);
    } else if (!deleting && pos === word.length) {
      t = setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && pos > 0) {
      t = setTimeout(() => setPos(pos - 1), delMs);
    } else {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [pos, deleting, wordIndex, words, typeMs, holdMs, delMs]);

  // Visible text is always a pure slice of the current word — deriving it
  // keeps one state update per tick instead of two.
  return words[wordIndex % words.length].slice(0, pos);
}

/** Counts up to `target` once `active` flips true. */
export function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);

  return value;
}

/** True once the referenced element has scrolled into view. */
export function useInViewOnce(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/** True while the user prefers reduced motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

/**
 * True when the primary input is touch (coarse pointer). Used to gate
 * hover-only flourishes that would otherwise become dead UI on mobile.
 */
export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setTouch(mq.matches);
    const handler = (e) => setTouch(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return touch;
}

const sfx = {
  key: [1244, 14],
  confirm: [880, 90],
  launch: [1318, 160],
  boot: [523, 120],
};

// Module-level singleton — every useSfx() consumer shares one AudioContext
// (browsers cap the number of contexts per page).
let sharedCtx = null;

/**
 * Tiny synthesized UI bleeps via Web Audio — zero audio assets shipped.
 * Safely no-ops until a real user gesture (browser autoplay policy),
 * when reduced motion is on, and in browsers without AudioContext.
 */
export function useSfx() {
  const reduced = usePrefersReducedMotion();

  const play = useCallback(
    (name = "key") => {
      if (reduced) return;
      try {
        if (!sharedCtx) {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (!AC) return;
          sharedCtx = new AC();
        }
        if (sharedCtx.state === "suspended") sharedCtx.resume().catch(() => {});
      } catch {
        return;
      }
      const [freq, ms] = sfx[name] || [1000, 20];
      const osc = sharedCtx.createOscillator();
      const gain = sharedCtx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.035, sharedCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, sharedCtx.currentTime + ms / 1000);
      osc.connect(gain).connect(sharedCtx.destination);
      osc.start();
      osc.stop(sharedCtx.currentTime + ms / 1000);
    },
    [reduced],
  );

  return play;
}
