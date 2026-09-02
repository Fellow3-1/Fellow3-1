import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Sun, Moon } from "lucide-react";
import { useNairobiClock, useSfx, useTheme } from "../hooks.js";
import { Kbd } from "./ui.jsx";

const LINKS = [
  { id: "about", label: "About", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "skills", label: "Skills", num: "03" },
  { id: "projects", label: "Work", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

export default function Navbar({ onOpenPalette }) {
  const clock = useNairobiClock();
  const play = useSfx();
  const [theme, toggleTheme] = useTheme();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Lock scroll behind the mobile menu, close on Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    play("confirm");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "is-scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="nav-brand" href="#top" onClick={go("top")} aria-label="Back to top">
          <img src="assets/HD-Joker-Wallpapers-scaled.jpg" alt="" decoding="async" width="34" height="34" />
          <span>
            <strong>FELLOH&nbsp;3.1</strong>
            <small>Nairobi, Kenya</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "is-active" : ""} onClick={go(l.id)}>
              <i>{l.num}</i>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button type="button" className="cmdk-trigger" onClick={onOpenPalette} aria-haspopup="dialog">
            <Command size={13} aria-hidden="true" />
            <span className="cmdk-trigger-label">Search</span>
            <Kbd>⌘K</Kbd>
          </button>
          <div className="nav-meta" aria-label="Nairobi local time">
            <span className="live-dot" aria-hidden="true" />
            <time>NBO {clock}</time>
          </div>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMenuOpen((v) => !v);
              play("confirm");
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
              >
                <i>{l.num}</i> {l.label}
              </motion.a>
            ))}
            <button
              type="button"
              className="mobile-menu-palette"
              onClick={() => {
                setMenuOpen(false);
                onOpenPalette();
              }}
            >
              <Command size={14} aria-hidden="true" /> Quick search
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
