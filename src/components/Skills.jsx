import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./ui.jsx";
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

  return (
    <section id="skills" className="section skills">
      <SectionHeading
        index="03"
        kicker="package registry"
        title="A matrix, not a pile of badges."
        lede={isTouch ? "Tap a category to filter the registry." : "Hover to feel the grid. Filter to see the shape of the stack."}
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
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={isTouch ? undefined : () => setHovered(s.name)}
            onMouseLeave={isTouch ? undefined : () => setHovered(null)}
            whileHover={isTouch ? undefined : { y: -4, scale: 1.06 }}
            data-cat={s.label}
          >
            {s.name}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
