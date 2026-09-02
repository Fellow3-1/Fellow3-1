import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import BootScreen from "./components/BootScreen.jsx";
import Cursor from "./components/Cursor.jsx";
import ParticleField from "./components/ParticleField.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Services from "./components/Services.jsx";
import Skills from "./components/Skills.jsx";
import Stats from "./components/Stats.jsx";
import Projects from "./components/Projects.jsx";
import SnakeGame from "./components/SnakeGame.jsx";
import Education from "./components/Education.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { useSfx } from "./hooks.js";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const play = useSfx();

  // Global ⌘K / Ctrl+K / `/` binding for the command palette.
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => {
          const next = !v;
          if (next) play("confirm");
          return next;
        });
      } else if (e.key === "/" && !typing && !paletteOpen) {
        e.preventDefault();
        setPaletteOpen(true);
        play("confirm");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, play]);

  return (
    <MotionConfig reducedMotion="user">
      <BootScreen onDone={() => setBooted(true)} />
      <ScrollProgress />
      <Cursor />
      <ParticleField />

      <div className="grain" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="orbs" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
      </div>

      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main>
        <Hero ready={booted} />
        <Marquee />
        <About />
        <Experience />
        <Services />
        <Skills />
        <Stats />
        <Projects />
        <SnakeGame />
        <Education />
        <Contact />
      </main>

      {/* thumb-reach dock for phones (CSS shows it under 900px) */}
      <nav className="dock" aria-label="Sections">
        <a href="#about">About</a>
        <a href="#experience">Story</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Work</a>
        <a href="#contact">Contact</a>
      </nav>

      <Footer />
    </MotionConfig>
  );
}
