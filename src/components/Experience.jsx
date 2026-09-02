import { motion } from "framer-motion";
import { GitCommitHorizontal, GitBranch } from "lucide-react";
import { SectionHeading, Reveal, Chip } from "./ui.jsx";
import { timeline } from "../data/content.js";

/**
 * Career rendered as `git log --graph`: one rail, commit nodes with hashes,
 * branch decoration on the latest entry. Timeline rail is drawn with a
 * static gradient (no repaint-per-frame animation).
 */
export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <SectionHeading
        index="02"
        kicker="My story"
        title="Twelve years, one step at a time."
        lede="How I went from taking phones apart to building software people rely on every day."
      />

      <div className="timeline" role="list">
        {timeline.map((t, i) => (
          <Reveal key={t.era} delay={i * 0.06} className="tl-item" role="listitem">
            <div className="tl-marker" aria-hidden="true">
              <GitCommitHorizontal size={26} strokeWidth={1.4} />
            </div>
            <motion.article className="tl-card panel" whileHover={{ y: -5 }}>
              <div className="tl-head">
                <p className="tl-era">
                  {t.era}
                </p>
                <span className="tl-org">{t.org}</span>
              </div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <div className="tl-tags">
                {t.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
              {i === timeline.length - 1 && (
                <span className="tl-branch">
                  <GitBranch size={11} /> Where I am now
                </span>
              )}
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
