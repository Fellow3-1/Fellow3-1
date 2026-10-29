import { introLines, introNote } from "../data/content.js";

// The staircase statement: one sentence of five lines, each starting further
// right than the last, alternating two inks, marked up as a single <p>.
export default function Intro() {
  return (
    <section className="intro" aria-label="In short">
      <p className="intro__statement" data-reveal>
        {introLines.map((line, i) => (
          <span key={line.text} className="stair" data-ink={line.ink} style={{ "--n": i }}>
            {line.text}
          </span>
        ))}
      </p>

      <div className="intro__photos">
        <img
          src="assets/intro-nairobi.jpg"
          alt="Nairobi at dusk, the city Felix builds from"
          width="1376"
          height="768"
          loading="lazy"
          decoding="async"
          data-reveal
          style={{ "--d": "120ms" }}
        />
        <img
          src="assets/intro-desk.jpg"
          alt="The desk where the work gets done, late into the night"
          width="1376"
          height="768"
          loading="lazy"
          decoding="async"
          data-reveal
          style={{ "--d": "220ms" }}
        />
      </div>

      <p className="intro__note" data-reveal style={{ "--d": "300ms" }}>
        {introNote[0]}
        <br />
        {introNote[1]}
      </p>
    </section>
  );
}
