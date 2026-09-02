// ---------------------------------------------------------------------------
// Generates src/data/tech.js from the installed `simple-icons` package.
// Every skill on the site gets its official brand SVG path (MIT-licensed
// paths, CC0 icons — see simple-icons' legal disclaimer) and brand colour,
// so the skills wall can render real logos with zero runtime requests.
//
//   node scripts/build-tech-icons.mjs
// ---------------------------------------------------------------------------
import * as icons from "simple-icons";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

// skill name (as written in content.js) -> simple-icons slug.
// A [kind, hex] tuple = the brand asked icon sets to drop its logo (Adobe,
// AWS, OpenAI, C#, Heroku…) or it is generic tech (SQL, REST), so the site
// draws an alternative instead:
//   ["glyph:coffee",  hex] -> a lucide glyph tinted with the brand colour
//   ["text:Ai",       hex] -> a two-letter tile, the way Adobe's own app
//                             icons look, in the product's brand colour
const MAP = {
  // languages
  TypeScript: "typescript",
  JavaScript: "javascript",
  Python: "python",
  Go: "go",
  Rust: "rust",
  "C++": "cplusplus",
  C: "c",
  "C#": ["glyph:hash", "512BD4"], // removed from simple-icons (.NET purple)
  Java: ["glyph:coffee", "EA2D2E"], // Oracle pulled the Java cup
  Kotlin: "kotlin",
  Swift: "swift",
  PHP: "php",
  HTML5: "html5",
  CSS3: "css",
  SQL: ["glyph:database", "E38C00"], // generic, not a brand
  Bash: "gnubash",
  // frontend
  React: "react",
  "Next.js": "nextdotjs",
  Vue: "vuedotjs",
  Nuxt: "nuxt",
  Svelte: "svelte",
  Astro: "astro",
  Tailwind: "tailwindcss",
  SASS: "sass",
  Vite: "vite",
  Vuetify: "vuetify",
  Bootstrap: "bootstrap",
  // backend
  "Node.js": "nodedotjs",
  Express: "express",
  NestJS: "nestjs",
  Fastify: "fastify",
  Flask: "flask",
  FastAPI: "fastapi",
  Django: "django",
  "Spring Boot": "springboot",
  GraphQL: "graphql",
  REST: ["glyph:braces", "38C8FF"], // generic, not a brand
  // data
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  MySQL: "mysql",
  Redis: "redis",
  Supabase: "supabase",
  Prisma: "prisma",
  Firebase: "firebase",
  SQLite: "sqlite",
  // ai / ml
  OpenAI: ["glyph:bot", "74AA9C"], // removed (ChatGPT teal)
  PyTorch: "pytorch",
  TensorFlow: "tensorflow",
  "Hugging Face": "huggingface",
  LangChain: "langchain",
  Pandas: "pandas",
  NumPy: "numpy",
  // cloud & devops
  AWS: ["glyph:cloud", "FF9900"], // removed (AWS orange)
  Docker: "docker",
  Kubernetes: "kubernetes",
  Cloudflare: "cloudflare",
  Vercel: "vercel",
  Netlify: "netlify",
  "GitHub Actions": "githubactions",
  Nginx: "nginx",
  Linux: "linux",
  Heroku: ["glyph:upload-cloud", "430098"], // removed (Heroku purple)
  // mobile
  "React Native": "react",
  Flutter: "flutter",
  Expo: "expo",
  "Android Studio": "androidstudio",
  // design & tools
  Figma: "figma",
  Illustrator: ["text:Ai", "FF9A00"], // Adobe pulled its marks
  Photoshop: ["text:Ps", "31A8FF"],
  "Adobe XD": ["text:XD", "FF61F6"],
  Canva: ["glyph:palette", "00C4CC"], // removed (Canva teal)
  Neovim: "neovim",
  Git: "git",
  Postman: "postman",
};

// --- contrast helpers -------------------------------------------------------
// Brand colours are absolute (React cyan, Express black) and don't care
// about our theme — so each entry also ships two display variants nudged
// toward white / ink until they stay readable on either backdrop. Hue and
// saturation are kept; only lightness moves, so the brand still reads as
// itself (black logos become near-white, pale yellows become amber).

function hexToRgb(hex) {
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex([r, g, b]) {
  return [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("").toUpperCase();
}
function luminance([r, g, b]) {
  return [r, g, b].reduce((sum, v, i) => {
    const c = v / 255;
    const lin = c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    return sum + lin * [0.2126, 0.7152, 0.0722][i];
  }, 0);
}
// Walk the colour toward `target` in small steps until luminance is happy.
function nudge(hex, target, test) {
  let rgb = hexToRgb(hex);
  const t = hexToRgb(target);
  for (let i = 0; i < 32 && !test(luminance(rgb)); i += 1) {
    rgb = rgb.map((v, c) => v + (t[c] - v) * 0.12);
  }
  return rgbToHex(rgb);
}

const variants = (hex) => ({
  hex,
  dk: nudge(hex, "E8F0F4", (l) => l >= 0.3), // pops on near-black
  lt: nudge(hex, "1A2430", (l) => l <= 0.3), // readable on near-white
});

const missing = [];
const out = {};

for (const [name, entry] of Object.entries(MAP)) {
  if (Array.isArray(entry)) {
    const [kind, hex] = entry;
    const base = variants(hex);
    out[name] = kind.startsWith("text:")
      ? { ...base, path: null, text: kind.slice(5) }
      : { ...base, path: null, glyph: kind.slice(6) };
    continue;
  }
  const slug = entry;
  const exportName = `si${slug[0].toUpperCase()}${slug.slice(1)}`;
  const icon = icons[exportName];
  if (!icon) {
    missing.push(`${name} (${slug})`);
    continue;
  }
  out[name] = { ...variants(icon.hex), path: icon.path };
}

if (missing.length) {
  console.error("Missing icons:", missing.join(", "));
  process.exit(1);
}

const body = `// ---------------------------------------------------------------------------
// GENERATED by scripts/build-tech-icons.mjs — do not hand-edit.
// Brand SVG paths + official colours for every skill, inlined at build time
// (source: simple-icons). Each entry:
//   hex  official brand colour
//   dk   same hue, nudged bright enough to read on the dark theme
//   lt   same hue, nudged dark enough to read on the light theme
//   path brand SVG path (24x24 viewBox) — null when the brand forbids
//        redistribution; then "glyph" (lucide) or "text" (letter tile)
//        is rendered in its place, tinted with the brand colour.
// ---------------------------------------------------------------------------

export const TECH = ${JSON.stringify(out, null, 2)};
`;

writeFileSync(join(here, "../src/data/tech.js"), body);
console.log(`Wrote src/data/tech.js with ${Object.keys(out).length} brand entries.`);
