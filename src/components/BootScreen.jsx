import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "establishing uplink · nairobi node",
  "handshake with house android",
  "loading senior engineer profile",
  "syncing arsenal matrix · lvl 99",
  "welcome, operator",
];

const DURATION = 1150; // ms — quick, skippable boot ritual

/**
 * Quick, skippable boot sequence — keeps the futuristic ritual without
 * slowing the page down. Progress is driven by a single rAF loop
 * (one ~60fps timer instead of a 30Hz interval), and the screen
 * unmounts itself when done.
 */
export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(((now - t0) / DURATION) * 100, 100);
      setProgress(Math.round(p));
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        setGone(true);
        onDone();
      }, 320);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  const finish = () => {
    if (gone) return;
    setGone(true);
    onDone();
  };

  const line = LINES[Math.min(Math.floor(progress / 22), LINES.length - 1)];

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="boot"
          onClick={finish}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
          role="dialog"
          aria-label="System boot"
        >
          <div className="boot-inner">
            <p className="boot-kicker">NEXUS // HOUSE ANDROID</p>
            <div className="boot-mark">
              <img src="assets/crest.png" alt="" decoding="async" />
            </div>
            <h1 className="boot-title">
              FELLOH <span>3.1</span>
            </h1>
            <p className="boot-line">{line}</p>
            <div className="boot-bar">
              <span style={{ width: `${progress}%` }} />
            </div>
            <p className="boot-skip">click anywhere to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
