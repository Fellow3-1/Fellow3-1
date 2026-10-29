import { useEffect, useRef } from "react";
import { statsSentence } from "../data/content.js";

// Figures inside a sentence, set at statement size. Two quiet scroll
// moments on the same statement: the words fill from pale to full ink as
// they rise past, and each figure rolls up to its value once. Both are
// progressive enhancement: without scroll timelines, observers or motion,
// the sentence and its numbers are simply there.

function rollFigures(section) {
  const figures = [...section.querySelectorAll(".figure")];
  figures.forEach((el) => {
    const value = el.textContent.trim();
    const said = document.createElement("span");
    said.className = "sr-only";
    said.textContent = value;
    const shown = document.createElement("span");
    shown.className = "roll__digits";
    shown.setAttribute("aria-hidden", "true");
    let i = 0;
    for (const ch of value) {
      if (!/\d/.test(ch)) {
        shown.append(ch);
        continue;
      }
      const col = document.createElement("span");
      col.className = "roll__col";
      const strip = document.createElement("span");
      strip.className = "roll__strip";
      strip.style.setProperty("--d", ch);
      strip.style.setProperty("--i", i++);
      for (let n = 0; n < 10; n++) {
        const d = document.createElement("span");
        d.textContent = n;
        strip.append(d);
      }
      col.append(strip);
      shown.append(col);
    }
    el.classList.add("roll");
    el.replaceChildren(said, shown);
  });
  return figures;
}

export default function Stats() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasObserver = "IntersectionObserver" in window;

    // the ink fill: split the prose into words that each watch their own
    // position and fill as they rise through the middle of the screen
    const supportsTimeline =
      typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");
    if (supportsTimeline && !reduced) {
      el.querySelectorAll("[data-words]").forEach((node) => {
        const text = node.textContent;
        node.textContent = "";
        text
          .trim()
          .split(/\s+/)
          .forEach((word, i, all) => {
            const s = document.createElement("span");
            s.className = "word";
            s.textContent = word;
            node.append(s, i < all.length - 1 ? " " : "");
          });
      });
      el.querySelector(".stats__sentence").classList.add("is-filling");
    }

    // the rolling figures: build digit reels, then trip them once, when the
    // sentence is a little way into view
    if (reduced || !hasObserver) return;
    rollFigures(el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    el.querySelectorAll(".roll").forEach((f) => io.observe(f));
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats" aria-label="In numbers" ref={ref}>
      <p className="stats__sentence">
        <span data-words>{statsSentence.before}</span>{" "}
        <span className="figure">{statsSentence.parts[0].figure}</span>{" "}
        <span data-words>{statsSentence.parts[0].text}</span>{" "}
        <span className="figure">{statsSentence.parts[1].figure}</span>{" "}
        <span data-words>{statsSentence.parts[1].text}</span>{" "}
        <span className="figure">{statsSentence.parts[2].figure}</span>{" "}
        <span data-words>{statsSentence.parts[2].text}</span>
      </p>
    </section>
  );
}
