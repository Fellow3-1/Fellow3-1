import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNairobiClock } from "../hooks.js";

const LINKS = [
  { id: "about", label: "About", num: "01" },
  { id: "experience", label: "Journey", num: "02" },
  { id: "skills", label: "Arsenal", num: "03" },
  { id: "projects", label: "Work", num: "04" },
  { id: "contact", label: "Signal", num: "05" },
];

export default function Navbar() {
  const clock = useNairobiClock();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? "is-scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="nav-brand" href="#top" aria-label="Back to top">
        <img src="assets/crest.png" alt="" decoding="async" />
        <span>
          <strong>FELLOH</strong>
          <small>3.1 / NBO</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? "is-active" : ""}>
            <i>{l.num}</i>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="nav-meta">
        <span className="live-dot" aria-hidden="true" />
        <time>NBO {clock}</time>
      </div>
    </motion.header>
  );
}
