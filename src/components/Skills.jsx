import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading, TechIcon, brandVars } from "./ui.jsx";
import { skillCategories } from "../data/content.js";
import { useIsTouch } from "../hooks.js";

const ALL = "all";

export default function Skills() {
  const [filter, setFilter] = useState(ALL);
  const [hovered, setHovered] = useState(null);
  const isTouch = useIsTouch();

  const visible = useMemo(
    () =>
      skillCategories
        .filter((c) => filter === ALL || c.id === filter)
        .flatMap((c) => c.items.map((name) => ({ name, cat: c.id, label: c.label }))),
    [filter],
  );

  // One of each technology for the ticker ribbon (Kotlin appears in two
  // categories but only needs one ride on the carousel).
  const ticker = useMemo(() => [...new Set(skillCategories.flatMap((c) => c.items))], []);

  return (
    <section id="skills" className="section skills">
      <SectionHeading
        index="04"
        kicker="What I work with"
        title="The tools of the trade."
        lede={
          isTouch
            ? "Every tool in its own true colours. Tap a category to filter."
            : "Every tool in its own true colours — hover one to see it glow. Pick a category to filter."
        }
      />

      <div className="filters" role="tablist" aria-label="Skill categories">
        {[{ id: ALL, label: "All" }, ...skillCategories.map((c) => ({ id: c.id, label: c.label }))].map((f) => {
          const count = f.id === ALL ? skillCategories.reduce((n, c) => n + c.items.length, 0) : skillCategories.find((c) => c.id === f.id)?.items.length ?? 0;
          return (
            <button
              key={f.id}
              type="button"
              className={`filter ${filter === f.id ? "is-on" : ""}`}
              onClick={() => setFilter(f.id)}
              role="tab"
              aria-selected={filter === f.id}
            >
              {f.label}
              <sup>{count}</sup>
            </button>
          );
        })}
      </div>

      <motion.ul className="skill-cloud" layout>
        {visible.map((s) => (
          <motion.li
            key={s.name}
            layout
            className={`skill ${hovered && hovered !== s.name ? "is-dim" : ""}`}
            style={brandVars(s.name)}
            initial={{ opacity: 0, scale: 0.6, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={isTouch ? undefined : () => setHovered(s.name)}
            onMouseLeave={isTouch ? undefined : () => setHovered(null)}
            whileHover={isTouch ? undefined : { y: -5, scale: 1.07 }}
            data-cat={s.label}
          >
            <span className="skill-logo">
              <TechIcon name={s.name} size={15} />
            </span>
            {s.name}
          </motion.li>
        ))}
      </motion.ul>

      {/* Infinite ribbon of everything at once — pure CSS loop, decorative */}
      <div className="tech-ticker" aria-hidden="true">
        <div className="tech-ticker-track">
          {[...ticker, ...ticker].map((name, i) => (
            <span key={`${name}-${i}`} className="tech-pill" style={brandVars(name)}>
              <span className="skill-logo">
                <TechIcon name={name} size={14} />
              </span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
