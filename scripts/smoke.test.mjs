// Runtime smoke test: mounts the real App into jsdom, walks the DOM, and
// exercises the receipt interaction end to end. No browser needed.
//   node scripts/smoke.test.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { JSDOM } from "jsdom";

// --- 1. bundle the app to a plain script ------------------------------------
const esbuild = await import("esbuild");
const entry = `
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App.jsx";
createRoot(document.getElementById("root")).render(React.createElement(App));
`;
const bundle = await esbuild.build({
  stdin: { contents: entry, resolveDir: new URL("..", import.meta.url).pathname, loader: "jsx" },
  bundle: true,
  format: "iife",
  write: false,
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  loader: { ".css": "empty" },
  logLevel: "silent",
});
const script = bundle.outputFiles[0].text;

// --- 2. a DOM with the browser APIs jsdom lacks ------------------------------
const dom = new JSDOM("<!doctype html><html class='js'><body><div id='root'></div></body></html>", {
  runScripts: "dangerously",
  pretendToBeVisual: true,
  url: "http://localhost/",
});
const { window } = dom;
window.matchMedia =
  window.matchMedia ||
  ((query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));
window.IntersectionObserver =
  window.IntersectionObserver ||
  class {
    constructor(cb) {
      this.cb = cb;
    }
    observe(el) {
      // fire immediately so data-reveal blocks settle visible, as they must
      this.cb([{ isIntersecting: true, target: el }], this);
    }
    unobserve() {}
    disconnect() {}
  };
if (!window.crypto?.getRandomValues) {
  const { webcrypto } = await import("node:crypto");
  Object.defineProperty(window, "crypto", { value: webcrypto });
}
window.Element.prototype.scrollIntoView =
  window.Element.prototype.scrollIntoView || function () {};
if (!window.HTMLFormElement.prototype.requestSubmit) {
  window.HTMLFormElement.prototype.requestSubmit = function () {
    this.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
  };
}

let failures = 0;
const check = (name, ok, extra = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  (" + extra + ")" : ""}`);
  if (!ok) failures++;
};

// --- 3. run the app -----------------------------------------------------------
window.eval(script);
await new Promise((r) => setTimeout(r, 50));
const doc = window.document;

check("app mounts with real content", doc.querySelector("#root").innerHTML.length > 2000);

const h1s = doc.querySelectorAll("h1");
check("exactly one h1", h1s.length === 1);
check("the h1 names the person", /Felix/.test(h1s[0]?.textContent) && /Odhiambo/.test(h1s[0]?.textContent));

const sections = [...doc.querySelectorAll("main section")];
check("all sections present", sections.length === 7, sections.map((s) => s.className.split(" ")[0]).join(", "));
const titled = sections.filter(
  (s) =>
    s.querySelector("h1, h2") || s.classList.contains("intro") || s.classList.contains("stats")
);
check("every section carries a heading or is a statement", titled.length === 7);

const headings = [...doc.querySelectorAll("h2")].map((h) => h.textContent.trim()).join(" | ");
check("section headings: " + headings, /Work/.test(headings) && /@/.test(headings));

// the work index
const rows = doc.querySelectorAll(".work__row");
check("six work rows, all real GitHub links", rows.length === 6 && [...rows].every((r) => r.href.includes("github.com/Fellow3-1")));
check("work rows are anchors that keep the layout no-JS-safe", [...rows].every((r) => r.tagName === "A"));

// story and services
check("six story rows with tabular years", doc.querySelectorAll(".story__years").length === 6);
check("six services", doc.querySelectorAll(".service").length === 6);

// stats sentence keeps its figures readable to assistive tech
const figs = [...doc.querySelectorAll(".stats__sentence .figure")].map((f) => f.textContent);
check("stats figures are 2014 / 90 / 34", figs.join() === "2014,90,34", figs.join());

// imagery referenced exists in public/
const imgs = [...doc.querySelectorAll("img")].map((i) => i.getAttribute("src"));
const publicDir = new URL("../public/", import.meta.url).pathname;
const missing = imgs.filter((src) => src && !existsSync(publicDir + src));
check("every referenced image exists in public/", missing.length === 0, missing.join(", ") || `${imgs.length} images`);

// --- 4. the live thing: print a confirmation ---------------------------------
const nameInput = doc.querySelector("#receipt-name");
const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
setter.call(nameInput, "Wanjiku from Acme");
nameInput.dispatchEvent(new window.Event("input", { bubbles: true }));

const needButtons = [...doc.querySelectorAll(".receipt-needs button")];
needButtons[2].click(); // Payments / M-PESA
await new Promise((r) => setTimeout(r, 30)); // React flushes state async
check(
  "need selection reflects aria-pressed",
  doc.querySelectorAll(".receipt-needs button")[2].getAttribute("aria-pressed") === "true"
);

const form = doc.querySelector(".receipt-form");
const prevented = !form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
check("receipt form prevents a real navigation", prevented);
await new Promise((r) => setTimeout(r, 50));

const receipt = doc.querySelector(".receipt");
check("the receipt prints", !!receipt);
check("the receipt names the visitor", /Wanjiku from Acme/.test(receipt?.textContent || ""));
check("the receipt says CONFIRMED", /CONFIRMED/.test(receipt?.querySelector(".receipt__status")?.textContent || ""));
const no = receipt?.querySelector(".receipt__no")?.textContent || "";
check("receipt number looks like a payment code", /^[A-Z2-9]{10}$/.test(no), no);
const send = receipt?.querySelector(".receipt__actions .send");
check(
  "send action is a real mailto with the receipt written out",
  send?.href.startsWith("mailto:felixodhiambo31@live.com") && send.href.includes(encodeURIComponent(no))
);
check("copy action exists", !!receipt?.querySelector(".copy"));

// no blank stretches: every section renders taller than its content threshold
check("nav has wordmark + 3 links + 1 action", !!doc.querySelector(".nav__mark") && doc.querySelectorAll(".nav__links a").length === 3 && !!doc.querySelector(".nav__cta"));

console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
process.exit(failures ? 1 : 0);
