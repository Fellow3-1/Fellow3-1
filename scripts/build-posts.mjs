import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { writing, brand, caseStudy } from '../src/data/content.js'

/* Generates one static page per writing note at dist/writing/<slug>/ and the
   case study at dist/case-study/<slug>/, so every long-form page has a real,
   crawlable URL with its own social card. The feed and sitemap are generated
   from the same content module by scripts/build-feeds.mjs. */

const SITE = 'https://fellow3-1.github.io/Fellow3-1'
const DIST = 'dist'

const esc = (s) =>
  s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const themeBoot = `<script>
try {
  var t = localStorage.getItem("f31-theme");
  if (!t) t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = t;
  if (t === "dark") {
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "#0d060b");
  }
} catch (e) {
  document.documentElement.dataset.theme = "light";
}
</script>`

const themeToggle = `<script>
document.getElementById("theme-flip").addEventListener("click", function () {
  var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("f31-theme", next); } catch (e) {}
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#0d060b" : "#f6f6f3");
  this.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
});
</script>`

/* one shell for every standalone page; `main` is the article body */
const shell = ({ title, description, url, image, ld, kicker, heading, meta, lead, body }) => `<!doctype html>
<html lang="en-KE">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${esc(title)} · Felloh 3.1</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="${esc(brand.person)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" content="#f6f6f3" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${SITE}/assets/og/${image}.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_KE" />
    <meta property="og:site_name" content="Felloh 3.1" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Fellow3_1" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE}/assets/og/${image}.png" />
    <link rel="icon" type="image/png" sizes="64x64" href="../../assets/favicon-joker.png" />
    <link rel="apple-touch-icon" href="../../assets/joker-apple-touch.png" />
    <link
      rel="preload"
      as="font"
      type="font/woff2"
      href="../../assets/fonts/inter-latin-400-normal.woff2"
      crossorigin
    />
    <link rel="stylesheet" href="../../assets/post.css" />
    <script type="application/ld+json">${JSON.stringify(ld, null, 2)}</script>
${themeBoot}
  </head>
  <body>
    <div class="wrap">
      <header class="bar">
        <a class="bar__brand" href="../../"><b>$</b> ${esc(brand.name)}</a>
        <nav class="bar__links" aria-label="Page">
          <a href="../../#writing">all notes</a>
          <a href="../../#contact">contact</a>
          <button
            class="nav__theme"
            type="button"
            id="theme-flip"
            aria-label="Switch theme"
            title="Flip the lights"
          >
            <span class="nav__theme-orb" aria-hidden="true"></span>
          </button>
        </nav>
      </header>
      <main>
        <article class="note">
          <p class="logmark"><b>[log]</b> ${esc(kicker)}</p>
          <h1>${esc(heading)}</h1>
          <p class="note__meta">
            <span class="note__rule" aria-hidden="true"></span>
            ${meta}
          </p>
          ${lead ? `<p class="note__lead">${esc(lead)}</p>` : ''}
          ${body}
          <a class="note__back" href="../../#writing">← back to the log</a>
        </article>
      </main>
      <footer class="foot">
        <span>© 2026 ${esc(brand.name)} · ${esc(brand.person)} · ${esc(brand.city)}</span>
        <a href="../../sitemap.xml">sitemap</a>
      </footer>
    </div>
${themeToggle}
  </body>
</html>
`

const paragraphs = (list) => list.map((p) => `<p>${esc(p)}</p>`).join('\n            ')

/* --- writing notes ------------------------------------------------------- */
for (const post of writing.posts) {
  const url = `${SITE}/writing/${post.slug}/`
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.blurb,
        inLanguage: 'en',
        datePublished: post.published,
        author: {
          '@type': 'Person',
          name: brand.person,
          alternateName: brand.name,
          url: `${SITE}/`,
        },
        publisher: {
          '@type': 'Person',
          name: brand.person,
          url: `${SITE}/`,
        },
        mainEntityOfPage: url,
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Felloh 3.1', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Writing', item: `${SITE}/#writing` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  const html = shell({
    title: post.title,
    description: post.blurb,
    url,
    image: post.slug,
    ld,
    kicker: `writing · ${post.minutes.toLowerCase()}`,
    heading: post.title,
    meta: `${esc(brand.person)} · ${esc(brand.city)} · ${esc(post.dateLabel || post.date)} · ${esc(post.minutes)}`,
    lead: '',
    body: `<div class="note__body">
            ${paragraphs(post.body)}
          </div>`,
  })

  const dir = join(DIST, 'writing', post.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`note page: writing/${post.slug}/`)
}

/* --- the case study ------------------------------------------------------ */
if (caseStudy) {
  const url = `${SITE}/case-study/${caseStudy.slug}/`
  const sections = caseStudy.sections
    .map(
      (section) => `<section class="note__section">
            <h2>${esc(section.heading)}</h2>
            <div class="note__body">
              ${paragraphs(section.body)}
            </div>
          </section>`
    )
    .join('\n          ')

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: caseStudy.title,
        description: caseStudy.summary,
        inLanguage: 'en',
        datePublished: caseStudy.date,
        author: {
          '@type': 'Person',
          name: brand.person,
          alternateName: brand.name,
          url: `${SITE}/`,
        },
        publisher: { '@type': 'Person', name: brand.person, url: `${SITE}/` },
        mainEntityOfPage: url,
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Felloh 3.1', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Case study', item: `${SITE}/#work` },
          { '@type': 'ListItem', position: 3, name: caseStudy.title, item: url },
        ],
      },
    ],
  }

  const html = shell({
    title: caseStudy.title,
    description: caseStudy.summary,
    url,
    image: caseStudy.slug,
    ld,
    kicker: caseStudy.kicker,
    heading: caseStudy.title,
    meta: `${esc(brand.person)} · ${esc(brand.city)} · ${esc(caseStudy.dateLabel)} · ${esc(caseStudy.minutes)}`,
    lead: caseStudy.summary,
    body: sections,
  })

  const dir = join(DIST, 'case-study', caseStudy.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`case study: case-study/${caseStudy.slug}/`)
}

/* GitHub Pages serves 404.html for unknown paths; give it the app shell so
   deep links still land somewhere sensible. */
copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'))
console.log('404.html refreshed from index.html')
