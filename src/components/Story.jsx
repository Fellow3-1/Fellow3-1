import { useEffect, useRef } from "react";
import { story } from "../data/content.js";

// The line-up at one type size: every row flush on the same four edges:
// what it was, who with, what it meant, and the years in tabular figures.
// As the list passes, the row crossing the middle of the screen is lit in
// full ink and the rest wait at 55% - under reduced motion every row is
// simply in full ink.
export default function Story() {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = [...list.querySelectorAll(".story__row")];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            rows.forEach((r) => r.classList.toggle("is-active", r === e.target));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" } // a band across the middle of the screen
    );
    rows.forEach((r) => io.observe(r));
    list.setAttribute("data-lit", "");
    return () => io.disconnect();
  }, []);

  return (
    <section className="story" id="story" aria-label="The story so far">
      <h2 className="head" data-reveal>
        Twelve years, six moves
      </h2>
      <ol className="story__rows" ref={listRef}>
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
