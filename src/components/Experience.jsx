import { motion } from "framer-motion";
import { SectionHeading, Reveal, Chip } from "./ui.jsx";
import { timeline } from "../data/content.js";

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <SectionHeading
        index="02"
        kicker="The journey"
        title="Twelve years of shipping."
        lede="From Android internals to cloud-native AI systems — a career arc, not a badge list."
      />

      <div className="timeline">
        {timeline.map((t, i) => (
          <Reveal key={t.era} delay={i * 0.06} className="tl-item">
            <div className="tl-marker" aria-hidden="true">
              <span className="tl-node" />
            </div>
            <motion.article className="tl-card glass" whileHover={{ y: -6 }}>
              <div className="tl-head">
                <p className="tl-era">{t.era}</p>
                <span className="tl-org">{t.org}</span>
              </div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <div className="tl-tags">
                {t.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
