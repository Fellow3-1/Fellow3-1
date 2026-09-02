import { useRef } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { Coffee, Database, Braces, Cloud, CloudUpload, Bot, Hash, Palette, Code2 } from "lucide-react";
import { TECH } from "../data/tech.js";
import { useCountUp, useIsTouch } from "../hooks.js";

const EASE = [0.22, 1, 0.36, 1];

/** Scroll-reveal wrapper. */
export function Reveal({ children, delay = 0, y = 28, className = "", once = true, ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word animated heading — text rises from a masked line on scroll. */
export function AnimatedTitle({ text, className = "", as: Tag = "h2", once = true }) {
  const words = String(text).split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="aw" aria-hidden="true">
          <motion.span
            className="aw-i"
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once, amount: 0.7 }}
            transition={{ duration: 0.75, delay: i * 0.07, ease: EASE }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}

/** Section header with index number, kicker, animated title and optional lede. */
export function SectionHeading({ index, kicker, title, lede, align = "left" }) {
  return (
    <Reveal className={`section-head is-${align}`}>
      <p className="index">
        <span className="index-num">{index}</span>
        <span className="index-slash">//</span> {kicker}
      </p>
      <AnimatedTitle text={title} className="section-title" />
      {lede ? <p className="section-lede">{lede}</p> : null}
    </Reveal>
  );
}

/** Solid HUD panel with corner ticks and a hover accent. */
export function Panel({ children, className = "", as: Tag = "div", hover = true, ...rest }) {
  return (
    <Tag className={`panel ${hover ? "is-hover" : ""} ${className}`} {...rest}>
      <span className="panel-tick pt-tl" aria-hidden="true" />
      <span className="panel-tick pt-tr" aria-hidden="true" />
      <span className="panel-tick pt-bl" aria-hidden="true" />
      <span className="panel-tick pt-br" aria-hidden="true" />
      {children}
    </Tag>
  );
}

/** Small mono chip. */
export function Chip({ children, tone = "" }) {
  return <span className={`chip ${tone}`}>{children}</span>;
}

/** Keyboard key cap. */
export function Kbd({ children }) {
  return <kbd className="kbd">{children}</kbd>;
}

/** Magnetic hover wrapper — element leans toward the cursor. (fine pointers only) */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const isTouch = useIsTouch();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  if (isTouch) return <div style={{ display: "inline-block" }}>{children}</div>;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ x: sx, y: sy, display: "inline-block" }}>
      {children}
    </motion.div>
  );
}

/** Animated number that counts up when scrolled into view. */
export function Counter({ to, suffix = "", duration = 1400, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const value = useCountUp(to, inView, duration);
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/**
 * Official brand logo for a technology. Three render modes, driven by the
 * generated data in src/data/tech.js:
 *   - real brand SVG path (most tech), drawn in the brand's own colour via
 *     currentColor — the parent sets `color` from the --brand variable;
 *   - a lucide glyph stand-in for brands that forbid logo redistribution;
 *   - a two-letter tile, exactly the way Adobe's own app icons look.
 */
const TECH_GLYPHS = {
  coffee: Coffee,
  database: Database,
  braces: Braces,
  cloud: Cloud,
  "upload-cloud": CloudUpload,
  bot: Bot,
  hash: Hash,
  palette: Palette,
};

export function TechIcon({ name, size = 15 }) {
  const t = TECH[name];
  if (!t) return <Code2 size={size} aria-hidden="true" />;
  if (t.text) {
    return (
      <span className="tech-tile" aria-hidden="true">
        {t.text}
      </span>
    );
  }
  if (!t.path) {
    const Glyph = TECH_GLYPHS[t.glyph] || Code2;
    return <Glyph size={size} strokeWidth={2.1} aria-hidden="true" />;
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={t.path} />
    </svg>
  );
}

/**
 * Inline CSS variables carrying a tech's brand colour (official + the two
 * contrast-safe variants). CSS picks the right one for the active theme:
 * everything brand-tinted then just references var(--brand).
 */
export function brandVars(name) {
  const t = TECH[name];
  if (!t) return {};
  return { "--b": `#${t.hex}`, "--b-dk": `#${t.dk}`, "--b-lt": `#${t.lt}` };
}

/** Real GitHub language dot colors. */
export const LANG_COLORS = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SQL: "#e38c00",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Ruby: "#701516",
};
