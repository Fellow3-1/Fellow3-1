import { useState } from "react";
import { MotionConfig } from "framer-motion";
import BootScreen from "./components/BootScreen.jsx";
import Cursor from "./components/Cursor.jsx";
import ParticleField from "./components/ParticleField.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
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

export default function App() {
  const [booted, setBooted] = useState(false);

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
        <span className="orb orb-d" />
      </div>

      <Navbar />

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

      <nav className="dock" aria-label="Mobile">
        <a href="#about">About</a>
        <a href="#experience">Journey</a>
        <a href="#skills">Stack</a>
        <a href="#projects">Work</a>
        <a href="#contact">Ping</a>
      </nav>

      <Footer />
    </MotionConfig>
  );
}
