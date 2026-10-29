import { story } from "../data/content.js";

// The line-up at one type size: every row flush on the same four edges:
// what it was, who with, what it meant, and the years in tabular figures.
export default function Story() {
  return (
    <section className="story" id="story" aria-label="The story so far">
      <h2 className="head" data-reveal>
        Twelve years, six moves
      </h2>
      <ol className="story__rows">
        {story.map((row, i) => (
          <li className="story__row" key={row.title} data-reveal style={{ "--d": `${i * 55}ms` }}>
            <span className="story__title">{row.title}</span>
            <span className="story__org">{row.org}</span>
            <span className="story__body">{row.body}</span>
            <span className="story__years">{row.years}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
