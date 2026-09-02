import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, FolderGit2, Star, GitFork } from "lucide-react";
import { SectionHeading, Reveal, Chip, LANG_COLORS } from "./ui.jsx";
import { projects } from "../data/content.js";
import { useIsTouch } from "../hooks.js";

/** GitHub-flavored repository card with 3D tilt on fine pointers. */
function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const isTouch = useIsTouch();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    if (isTouch) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const langColor = LANG_COLORS[p.lang] || "52ffa8";
  const motionProps = isTouch
    ? { style: { "--proj": langColor } }
    : {
        style: { rotateX: rx, rotateY: ry, transformPerspective: 1100, "--proj": langColor },
        onPointerMove: onMove,
        onPointerLeave: reset,
      };

  return (
    <Reveal delay={(i % 3) * 0.07} className={p.featured ? "proj-featured" : ""}>
      <motion.a
        ref={ref}
        href={p.link}
        target="_blank"
        rel="noreferrer"
        className={`project panel ${p.featured ? "featured with-beam" : ""}`}
        whileHover={isTouch ? undefined : { y: -8 }}
        {...motionProps}
      >
        <div className="project-media" aria-hidden="true">
          <img src={p.image} alt="" loading="lazy" decoding="async" width="640" height="360" />
          <span className="project-glint" />
        </div>
        <div className="project-body">
          <div className="project-top">
            <FolderGit2 size={16} aria-hidden="true" />
            <h3>{p.name}</h3>
            <span className="project-cta">
              <ArrowUpRight size={16} />
            </span>
          </div>
          <p className="project-kicker">{p.kicker}</p>
          <p className="project-desc">{p.description}</p>
          <div className="project-meta">
            {p.lang && (
              <span className="project-lang">
                <i style={{ background: langColor, boxShadow: `0 0 8px ${langColor}B0` }} /> {p.lang}
              </span>
            )}
            <span className="project-stat">
              <Star size={12} /> {p.stars}
            </span>
            <span className="project-stat">
              <GitFork size={12} /> {p.forks}
            </span>
            <span className="project-cc" aria-hidden="true">
              CC
            </span>
          </div>
          <div className="project-tags">
            {p.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
      </motion.a>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <SectionHeading
        index="06"
        kicker="Things I've built"
        title="Some of my favourite work."
        lede="Six picks from ninety public projects — the rest are on GitHub."
      />
      <div className="project-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
      <Reveal className="projects-more">
        <a className="btn btn-ghost" href="https://github.com/Fellow3-1?tab=repositories" target="_blank" rel="noreferrer">
          See all 90 projects <ArrowUpRight size={15} />
        </a>
      </Reveal>
    </section>
  );
}
