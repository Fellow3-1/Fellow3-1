import { motion } from "framer-motion";
import { ArrowDown, FolderGit2, Twitter, Mail, MapPin } from "lucide-react";
import { profile, roles, stats, sysinfo } from "../data/content.js";
import { useTypewriter, useUptime } from "../hooks.js";
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
  const uptime = useUptime();

  return (
    <section className="hero" id="top">
      <div
        className="hero-bg"
        aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(180deg, rgba(3,5,4,0.25), rgba(3,5,4,0.96) 78%), url('assets/hero-void.jpg')" }}
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
            <span className="role-prefix">felloh@nexus:~$</span> {role}
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
              <a className="btn btn-ghost" href="assets/cv-felix-odhiambo.txt" download>
                Résumé
              </a>
            </Magnetic>
            <div className="hero-socials">
              <a href="https://github.com/Fellow3-1" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FolderGit2 size={18} />
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

      {/* neofetch — live system panel */}
      <motion.aside
        className="hero-fetch"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 1, delay: 0.45, ease: EASE }}
        aria-label="System information"
      >
        <div className="fetch-bar" aria-hidden="true">
          <span className="fetch-dot" />
          <span className="fetch-dot" />
          <span className="fetch-dot" />
          <p>operator@nexus — neofetch</p>
        </div>
        <div className="fetch-body">
          <pre className="fetch-art" aria-hidden="true">
            {FETCH_ART}
          </pre>
          <dl className="fetch-info">
            <div>
              <dt>operator</dt>
              <dd>
                {profile.realName} <em>“{profile.handle}”</em>
              </dd>
            </div>
            <div>
              <dt>os</dt>
              <dd>{sysinfo.os}</dd>
            </div>
            <div>
              <dt>kernel</dt>
              <dd>{sysinfo.kernel}</dd>
            </div>
            <div>
              <dt>uptime</dt>
              <dd>
                {uptime || sysinfo.uptime}
              </dd>
            </div>
            <div>
              <dt>shell</dt>
              <dd>{sysinfo.shell}</dd>
            </div>
            <div>
              <dt>stack</dt>
              <dd>{sysinfo.stack}</dd>
            </div>
            <div>
              <dt>location</dt>
              <dd>
                <MapPin size={11} aria-hidden="true" /> {sysinfo.location}
              </dd>
            </div>
            <div>
              <dt>status</dt>
              <dd>
                <span className="fetch-status">
                  <span className="live-dot" aria-hidden="true" />
                  {sysinfo.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </motion.aside>

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

const FETCH_ART = String.raw`
   ▄▄▄▄▄▄▄▄▄▄▄▄▄
  █ ▀▀▀ ██ ▀▀▀ █
  █ ██  ██  ██ █
  █ ▄▄▄ ██ ▄▄▄ █
  █▄▄▄▄▄▄▄▄▄▄▄▄█
   ████▄▄▄▄████
`;
