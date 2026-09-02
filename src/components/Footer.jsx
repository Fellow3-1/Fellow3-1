import { socials } from "../data/content.js";
import { useNairobiClock } from "../hooks.js";

/** tmux-style status bar as the footer. */
export default function Footer() {
  const year = new Date().getFullYear();
  const clock = useNairobiClock();
  return (
    <footer className="foot" role="contentinfo">
      <div className="foot-cell foot-session">
        <img src="assets/HD-Joker-Wallpapers-scaled.jpg" alt="" loading="lazy" decoding="async" width="22" height="22" />
        <span>
          <strong>Felix Odhiambo</strong>
        </span>
        <span className="foot-hide-sm">© {year} Felix Odhiambo</span>
      </div>

      <div className="foot-cell foot-links">
        {socials
          .filter((s) => s.href)
          .slice(0, 4)
          .map((s) => (
            <a key={s.label} href={s.href} target={s.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {s.label}
            </a>
          ))}
      </div>

      <div className="foot-cell foot-right">
        <span className="foot-tag">Coffee in · software that works, out</span>
        <span>
          Nairobi {clock} · <span className="foot-ok">● Available</span>
        </span>
      </div>
    </footer>
  );
}
