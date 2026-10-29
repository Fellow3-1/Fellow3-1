import { useEffect } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Intro from "./components/Intro.jsx";
import Opening from "./components/Opening.jsx";
import Work from "./components/Work.jsx";
import Story from "./components/Story.jsx";
import Services from "./components/Services.jsx";
import Stats from "./components/Stats.jsx";
import Contact from "./components/Contact.jsx";
import Closer from "./components/Closer.jsx";

// One observer for the whole page: reveals fire once, when a block's top is
// ~85% down the viewport, and never replay. Hidden states exist only under
// html.js + prefers-reduced-motion: no-preference, so no-JS and reduced
// motion always get the finished page.
function useReveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useReveals();
  return (
    <>
      <Nav />
      <main id="content">
        <Hero />
        <Intro />
        <Opening />
        <Work />
        <Story />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Closer />
    </>
  );
}
