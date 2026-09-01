import { marquee } from "../data/content.js";

/**
 * Duplicated track + translateX(-50%) keyframes for a seamless loop.
 * The whole strip is decorative (aria-hidden); real content lives elsewhere.
 */
export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
    </div>
  );
}
