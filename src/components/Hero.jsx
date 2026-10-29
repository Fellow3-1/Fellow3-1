import { useEffect, useRef } from "react";
import { profile } from "../data/content.js";

// The dealt hero: a low-key studio object at dead centre, its base cropped by
// the bottom edge, headline split around it, two small facing text blocks.
// The object crossfades slowly through three stills of the same phone
// (payments, apps, web), paused when the tab is hidden; the first still only
// under reduced motion.
export default function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      if (document.hidden) el.setAttribute("data-paused", "");
      else el.removeAttribute("data-paused");
    };
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return (
    <section className="hero" id="top" aria-label="Introduction" ref={ref}>
      <h1 className="hero__title">
        <span className="line line--first">
          <span data-line style={{ "--i": 0 }}>
            {profile.firstName}
          </span>
        </span>
        <span className="line line--second">
          <span data-line style={{ "--i": 1 }}>
            {profile.lastName}
          </span>
        </span>
      </h1>

      <div className="hero__merge">
        <p className="hero__intro" data-load style={{ "--d": "420ms" }}>
          {profile.tagline}
        </p>
        <ul className="hero__facts" data-load style={{ "--d": "500ms" }}>
          {profile.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>

      <figure className="hero__object" aria-label="Three screens from Felix's work, slowly changing">
        <img
          src="assets/hero-1.jpg"
          alt="A phone in a dark studio showing a payment confirmation"
          width="928"
          height="1152"
          fetchPriority="high"
          decoding="async"
        />
        <img
          src="assets/hero-2.jpg"
          alt=""
          width="928"
          height="1152"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <img
          src="assets/hero-3.jpg"
          alt=""
          width="928"
          height="1152"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <div className="hero__dim" aria-hidden="true" />
      </figure>

      <p className="hero__scrollcue" data-load style={{ "--d": "620ms" }}>
        Scroll · the work is below
      </p>
    </section>
  );
}
