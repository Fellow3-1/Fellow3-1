import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'
import { writing, brand } from '../src/data/content.js'

/* Generates one static page per writing note at dist/writing/<slug>/ so
   every note has a real, crawlable URL. Mirrors the same pages into the
   sitemap and feed sources lives in public/ — those are curated by hand. */

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

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${esc(post.title)} · Felloh 3.1</title>
    <meta name="description" content="${esc(post.blurb)}" />
    <meta name="author" content="${esc(brand.person)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" content="#f6f6f3" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(post.title)}" />
    <meta property="og:description" content="${esc(post.blurb)}" />
    <meta property="og:image" content="${SITE}/assets/og.jpg" />
    <meta property="og:locale" content="en_KE" />
    <meta property="og:site_name" content="Felloh 3.1" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Fellow3_1" />
    <meta name="twitter:title" content="${esc(post.title)}" />
    <meta name="twitter:description" content="${esc(post.blurb)}" />
    <meta name="twitter:image" content="${SITE}/assets/og.jpg" />
    <link rel="icon" type="image/png" sizes="64x64" href="../../assets/favicon-joker.png" />
    <link rel="apple-touch-icon" href="../../assets/joker-apple-touch.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap"
      rel="stylesheet"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
    </noscript>
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
          <p class="logmark"><b>[log]</b> writing · ${esc(post.minutes.toLowerCase())}</p>
          <h1>${esc(post.title)}</h1>
          <p class="note__meta">
            <span class="note__rule" aria-hidden="true"></span>
            ${esc(brand.person)} · ${esc(brand.city)} · ${esc(post.date)} · ${esc(post.minutes)}
          </p>
          <div class="note__body">
            ${post.body.map((p) => `<p>${esc(p)}</p>`).join('\n            ')}
          </div>
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

  const dir = join(DIST, 'writing', post.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`note page: writing/${post.slug}/`)
}

/* GitHub Pages serves 404.html for unknown paths; give it the app shell so
   deep links still land somewhere sensible. */
copyFileSync(join(DIST, 'index.html'), join(DIST, '404.html'))
console.log('404.html refreshed from index.html')
