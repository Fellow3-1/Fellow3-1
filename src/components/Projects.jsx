import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { SectionHeading, Reveal, Chip } from "./ui.jsx";
import { projects } from "../data/content.js";

/** 3D tilt-on-hover project card. */
function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Reveal delay={(i % 3) * 0.07} className={p.featured ? "proj-featured" : ""}>
      <motion.a
        ref={ref}
        href={p.link}
        target="_blank"
        rel="noreferrer"
        className={`project glass ${p.featured ? "featured" : ""}`}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
        onPointerMove={onMove}
        onPointerLeave={reset}
        whileHover={{ y: -8 }}
      >
        <div className="project-media">
          <img src={p.image} alt="" loading="lazy" decoding="async" />
          <span className="project-cta">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="project-body">
          <p className="panel-kicker">{p.kicker}</p>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
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
        index="04"
        kicker="Archives"
        title="Selected transmissions."
        lede="Hand-picked from 90 public repositories — the rest live on GitHub."
      />
      <div className="project-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
      <Reveal className="projects-more">
        <a className="btn btn-ghost" href="https://github.com/Fellow3-1?tab=repositories" target="_blank" rel="noreferrer">
          <FolderGit2 size={15} /> Explore all 90 repositories
        </a>
      </Reveal>
    </section>
  );
}
