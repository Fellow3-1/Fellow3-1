import { useEffect, useRef } from "react";
import { statsSentence } from "../data/content.js";

// Figures inside a sentence, set at statement size: the only numbers on the
// page are true, and the sentence fills from pale to full ink as it rises
// past. One statement, once. Without scroll timelines or under reduced
// motion the sentence is simply full ink.
export default function Stats() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ok =
      typeof CSS !== "undefined" &&
      CSS.supports("animation-timeline: view()") &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
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
    el.classList.add("is-filling");
  }, []);

  return (
    <section className="stats" aria-label="In numbers">
      <p className="stats__sentence" ref={ref}>
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
