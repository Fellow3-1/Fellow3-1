import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui.jsx";
import { skillCategories } from "../data/content.js";

const ALL = "all";

export default function Skills() {
  const [filter, setFilter] = useState(ALL);
  const [hovered, setHovered] = useState(null);

  const visible = skillCategories
    .filter((c) => filter === ALL || c.id === filter)
    .flatMap((c) => c.items.map((name) => ({ name, cat: c.id })));

  return (
    <section id="skills" className="section skills">
      <SectionHeading
        index="03"
        kicker="Arsenal"
        title="A matrix, not a pile of badges."
        lede="Hover to feel the grid. Filter to see the shape of the stack."
      />

      <div className="filters" role="tablist" aria-label="Skill categories">
        {[{ id: ALL, label: "All" }, ...skillCategories.map((c) => ({ id: c.id, label: c.label }))].map((f) => (
          <button
            key={f.id}
            className={`filter ${filter === f.id ? "is-on" : ""}`}
            onClick={() => setFilter(f.id)}
            role="tab"
            aria-selected={filter === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div className="skill-cloud" layout>
        {visible.map((s) => (
          <motion.span
            key={s.name}
            layout
            className={`skill ${hovered && hovered !== s.name ? "is-dim" : ""}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(s.name)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ y: -4, scale: 1.06 }}
          >
            {s.name}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
