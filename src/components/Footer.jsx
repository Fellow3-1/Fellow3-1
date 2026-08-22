import { socials } from "../data/content.js";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="foot-brand">
        <img src="assets/crest.png" alt="" loading="lazy" decoding="async" />
        <p>
          House Android · Nairobi node
          <br />
          © {year} Felloh 3.1 — Felix Odhiambo
        </p>
      </div>
      <div className="foot-links">
        {socials.slice(0, 4).map((s) => (
          <a key={s.label} href={s.href || "#contact"} target={s.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <p className="foot-tag">Breaker of mediocre products.</p>
    </footer>
  );
}
