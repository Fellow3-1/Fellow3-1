import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bootLines } from "../data/content.js";
import { usePrefersReducedMotion } from "../hooks.js";

const DURATION = 1400; // ms — quick, skippable boot ritual
const EXIT = 420; // ms — matches the CSS sweep-out animation

/**
 * Nexus OS kernel boot. Progress is driven by a single rAF loop (one ~60fps
 * timer, not a 30Hz interval). Skippable by tap/keys; honors reduced motion
 * by skipping straight through. Self-unmounts and hands off to the app.
 */
export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      // Respect the user: no ritual, straight in.
      setProgress(100);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(((now - t0) / DURATION) * 100, 100);
      setProgress(Math.round(p));
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setGone(true);
    onDone();
  };

  useEffect(() => {
    if (progress < 100 || gone) return undefined;
    const t = setTimeout(finish, EXIT);
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, gone]);

  const line = bootLines[Math.min(Math.floor((progress / 100) * bootLines.length), bootLines.length - 1)];

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="boot"
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          role="dialog"
          aria-label="System boot"
          onClick={finish}
          data-testid="boot"
        >
          <div className="boot-scan" aria-hidden="true" />
          <div className="boot-inner">
            <p className="boot-kicker">NEXUS BIOS v3.1 — HOUSE ANDROID</p>
            <pre className="boot-ascii" aria-hidden="true">{ASCII}</pre>
            <p className="boot-line">
              <span className="boot-ok">[ ok ]</span> {line}
            </p>
            <div className="boot-bar" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <p className="boot-skip">press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const ASCII = String.raw`
 ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
 ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
 ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
 ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
 ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
 ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
`;
