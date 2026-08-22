import { useEffect, useRef } from "react";
import { SectionHeading, Reveal } from "./ui.jsx";

const COLS = 53;
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
    ctx.fillStyle = c.on ? `rgba(181,124,255,${0.25 + c.heat * 0.7})` : "rgba(255,255,255,0.04)";
    ctx.fillRect(px, py, size, size);
  });
  (snake || []).forEach((s, i) => {
    const px = s.x * (size + gap);
    const py = s.y * (size + gap) + (h - ROWS * (size + gap)) / 2;
    ctx.fillStyle = i === 0 ? "#5ce1ff" : `rgba(92,225,255,${1 - i / snake.length})`;
    ctx.shadowColor = "#5ce1ff";
    ctx.shadowBlur = i === 0 ? 12 : 0;
    ctx.fillRect(px, py, size, size);
    ctx.shadowBlur = 0;
  });
}

/**
 * Living "contribution snake" — a canvas take on the GitHub contribution
 * graph. Deterministic seed keeps the lattice stable; a serpent wanders it.
 * The loop only runs while the section is on screen (and the tab visible),
 * so an off-screen canvas never burns frames.
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
      <SectionHeading index="04.5" kicker="Interactive zone" title="The contribution serpent." />
      <Reveal>
        <div className="glass snake-panel">
          <div className="snake-meta">
            <p className="panel-kicker">// neural lattice</p>
            <p>A living map of commits. Watch the serpent eat the year.</p>
          </div>
          <canvas ref={ref} className="snake-canvas" width="1100" height="180" aria-label="Animated contribution graph" />
        </div>
      </Reveal>
    </section>
  );
}
