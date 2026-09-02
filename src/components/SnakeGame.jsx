import { useEffect, useRef } from "react";
import { SectionHeading, Reveal } from "./ui.jsx";

const COLS = 53; // matches GitHub's contribution-graph width
const ROWS = 7;
const seed = 31;
const rand = (n) => {
  const x = Math.sin(n * 999 + seed) * 10000;
  return x - Math.floor(x);
};

function buildCells() {
  const cells = [];
  for (let x = 0; x < COLS; x += 1) {
    for (let y = 0; y < ROWS; y += 1) {
      const v = rand(x * 10 + y);
      cells.push({ x, y, on: v > 0.42, heat: v });
    }
  }
  return cells;
}

function draw(canvas, { cells, snake }) {
  const ctx = canvas.getContext("2d");
  // Pull the live theme accent so the graph re-colours with light/dark mode.
  const css = getComputedStyle(document.documentElement);
  const a1 = css.getPropertyValue("--accent-rgb").trim() || "82 255 168";
  const a2 = css.getPropertyValue("--accent-2-rgb").trim() || "56 200 255";
  const rgb = (v) => v.replace(/\s+/g, ",");
  const w = canvas.clientWidth || 1100;
  const h = Math.max(140, Math.round(w * 0.16));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const gap = 3;
  const size = Math.min((w - gap * COLS) / COLS, (h - gap * ROWS) / ROWS);
  ctx.clearRect(0, 0, w, h);
  (cells || []).forEach((c) => {
    const px = c.x * (size + gap);
    const py = c.y * (size + gap) + (h - ROWS * (size + gap)) / 2;
    ctx.fillStyle = c.on
      ? `rgba(${rgb(c.heat > 0.72 ? a2 : a1)},${0.22 + c.heat * 0.6})`
      : "rgba(140,160,175,0.09)";
    ctx.fillRect(px, py, size, size);
  });
  (snake || []).forEach((s, i) => {
    const px = s.x * (size + gap);
    const py = s.y * (size + gap) + (h - ROWS * (size + gap)) / 2;
    ctx.fillStyle = i === 0 ? `rgb(${rgb(a2)})` : `rgba(${rgb(a1)},${1 - i / snake.length})`;
    ctx.shadowColor = `rgba(${rgb(a1)},0.8)`;
    ctx.shadowBlur = i === 0 ? 12 : 0;
    ctx.fillRect(px, py, size, size);
    ctx.shadowBlur = 0;
  });
}

/**
 * The contribution matrix — a canvas take on the GitHub contribution graph,
 * with a serpent committing its way across the year. Deterministic seed keeps
 * the lattice stable. The loop only runs while the section is on screen (and
 * the tab visible); reduced motion gets a single static frame.
 */
export default function SnakeGame() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const cells = buildCells();
    let snake = [];
    for (let i = 0; i < 8; i += 1) snake.push({ x: 8 - i, y: 3 });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(canvas, { cells, snake });
      return;
    }

    let dir = { x: 1, y: 0 };
    let tick = 0;
    let raf = 0;
    let running = false;

    const step = () => {
      raf = 0;
      if (!running) return;
      tick += 1;
      if (tick % 8 === 0) {
        const opts = [
          { x: 1, y: 0 },
          { x: -1, y: 0 },
          { x: 0, y: 1 },
          { x: 0, y: -1 },
        ].filter((d) => !(d.x === -dir.x && d.y === -dir.y));
        if (Math.random() > 0.65) dir = opts[Math.floor(Math.random() * opts.length)];
        const head = {
          x: (snake[0].x + dir.x + COLS) % COLS,
          y: (snake[0].y + dir.y + ROWS) % ROWS,
        };
        snake.unshift(head);
        const eaten = cells.find((c) => c.x === head.x && c.y === head.y && c.on);
        if (eaten) eaten.on = false;
        else snake.pop();
        if (snake.length > 18) snake.pop();
        if (cells.filter((c) => c.on).length < 40) {
          cells.forEach((c) => {
            if (rand(c.x + c.y + tick) > 0.7) c.on = true;
          });
        }
      }
      draw(canvas, { cells, snake });
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (!running && !document.hidden) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    // Run only while the section is actually on screen.
    let io;
    const section = canvas.closest("section");
    if (section && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? start() : stop()));
        },
        { rootMargin: "200px 0px" },
      );
      io.observe(section);
    } else {
      start();
    }

    document.addEventListener("visibilitychange", onVisibility);
    start();
    return () => {
      stop();
      io && io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section id="snake" className="section snake-section">
      <SectionHeading index="06.5" kicker="A year of work" title="Every square is a day I wrote code." />
      <Reveal>
        <div className="panel snake-panel">
          <div className="snake-meta">
            <p className="panel-kicker">Daily activity</p>
            <p>Brighter squares are busier days — and yes, something is eating them.</p>
          </div>
          <canvas ref={ref} className="snake-canvas" width="1100" height="180" aria-label="Animated contribution graph" role="img" />
        </div>
      </Reveal>
    </section>
  );
}
