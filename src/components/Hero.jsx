import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Twitter, Mail } from "lucide-react";
import { profile, roles, stats } from "../data/content.js";
import { useTypewriter } from "../hooks.js";
import { Counter, Magnetic } from "./ui.jsx";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export default function Hero({ ready = true }) {
  const role = useTypewriter(roles);

  return (
    <section className="hero" id="top">
      <div
        className="hero-bg"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(4,2,10,0.12), rgba(4,2,10,0.94)), url('assets/hero-void.jpg')",
        }}
      />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-copy">
        <motion.div variants={container} initial="hidden" animate={ready ? "show" : "hidden"}>
          <motion.p variants={item} className="eyebrow">
            <span className="pulse" />
            {profile.location} · {profile.house} · est. 2014
          </motion.p>

          <motion.h1 variants={item} className="hero-title">
            <span className="glitch" data-text="FELLOH">
              FELLOH
            </span>
            <em>3.1</em>
          </motion.h1>

          <motion.p variants={item} className="hero-role" aria-live="polite">
            <span className="role-prefix">{"// "}</span>
            {role}
            <span className="caret" />
          </motion.p>

          <motion.p variants={item} className="hero-lede">
            {profile.role} &amp; the operator behind the handle. {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="hero-actions">
            <Magnetic>
              <a className="btn btn-primary" href="#contact">
                Open a channel <ArrowDown size={15} />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="mailto:felixodhiambo31@live.com?subject=Let's%20build%20something%20crispy&body=Hi%20Felloh,%0A%0A">
                <Download size={15} /> Hire me
              </a>
            </Magnetic>
            <div className="hero-socials">
              <a href="https://github.com/Fellow3-1" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://twitter.com/Fellow3_1" target="_blank" rel="noreferrer" aria-label="X / Twitter">
                <Twitter size={18} />
              </a>
              <a href="mailto:felixodhiambo31@live.com" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          <motion.dl variants={item} className="hero-stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>
                  <Counter to={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <motion.div
        className="hero-sigil"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
      >
        <div className="orbit orbit-a" />
        <div className="orbit orbit-b" />
        <div className="orbit orbit-c" />
        <div className="sigil-core">
          <img src="assets/crest.png" alt="House Android crest" decoding="async" />
        </div>
        <div className="sigil-caption">
          <span>CLASS</span>
          <strong>Full-Stack Sorcerer</strong>
        </div>
        <div className="sigil-status">
          <span className="live-dot" /> ONLINE
        </div>
      </motion.div>

      <a className="hero-scroll" href="#about" aria-label="Scroll to about">
        <span>scroll</span>
        <motion.span
          className="hero-scroll-line"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </a>
    </section>
  );
}
