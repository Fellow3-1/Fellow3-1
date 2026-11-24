import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { writing, brand, caseStudy } from '../src/data/content.js'
import { SITE, longDate } from '../src/data/site.js'

/* Generates one static page per writing note at dist/writing/<slug>/ and the
   case study at dist/case-study/<slug>/, so every long-form page has a real,
   crawlable URL with its own social card. The feed and sitemap are generated
   from the same content module by scripts/build-feeds.mjs. */

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
const shell = ({ title, description, url, image, ld, kicker, heading, meta, lead, body, noindex = false, depth = 2, ogType = 'article' }) => {
  /* note pages live at /writing/<slug>/, index pages at /writing/ */
  const up = depth === 1 ? '../' : '../../'
  const imageType = /\.jpe?g$/i.test(image) ? 'image/jpeg' : 'image/png'
  return `<!doctype html>
<html lang="en-KE">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${esc(title)} · Felloh 3.1</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="${esc(brand.person)}" />
    <meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />
    <link rel="canonical" href="${url}" />
    <meta name="theme-color" content="#f6f6f3" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${image.startsWith('http') ? image : `${SITE}/assets/og/${image}.png`}" />
    <meta property="og:image:type" content="${imageType}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_KE" />
    <meta property="og:site_name" content="Felloh 3.1" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Fellow3_1" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${image.startsWith('http') ? image : `${SITE}/assets/og/${image}.png`}" />
    <link rel="icon" type="image/png" sizes="64x64" href="${up}assets/favicon-joker.png" />
    <link rel="apple-touch-icon" href="${up}assets/joker-apple-touch.png" />
    <link
      rel="preload"
      as="font"
      type="font/woff2"
      href="${up}assets/fonts/inter-latin-400-normal.woff2"
      crossorigin
    />
    <link rel="stylesheet" href="${up}assets/post.css" />
    <script type="application/ld+json">${JSON.stringify(ld, null, 2).replaceAll('</', '<\\/')}</script>
${themeBoot}
  </head>
  <body>
    <div class="wrap">
      <header class="bar">
        <a class="bar__brand" href="${up}"><b>$</b> ${esc(brand.name)}</a>
        <nav class="bar__links" aria-label="Page">
          <a href="${up}#writing">all notes</a>
          <a href="${up}#contact">contact</a>
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
          <a class="note__back" href="${up}#writing">← back to the log</a>
        </article>
      </main>
      <footer class="foot">
        <span>© 2026 ${esc(brand.name)} · ${esc(brand.person)} · ${esc(brand.city)}</span>
        <a href="${up}sitemap.xml">sitemap</a>
      </footer>
    </div>
${themeToggle}
  </body>
</html>
`
}

/* `**text**` becomes a strong lead-in after the string has been escaped, so
   the only markup the content module can produce is emphasis. Everything
   else stays literal text. */
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

const paragraphs = (list) => list.map((p) => `<p>${inline(p)}</p>`).join('\n            ')

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
    kicker: `writing · ${post.tag.toLowerCase()}`,
    heading: post.title,
    meta: `${esc(brand.person)} · ${esc(brand.city)} · ${esc(longDate(post.published))} · ${esc(post.tag)}`,
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
        dateModified: caseStudy.updated || caseStudy.date,
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
    meta: `${esc(brand.person)} · ${esc(brand.city)} · ${esc(caseStudy.dateLabel || longDate(caseStudy.date))} · ${esc(caseStudy.minutes)}`,
    lead: caseStudy.lead || caseStudy.summary,
    body: sections,
  })

  const dir = join(DIST, 'case-study', caseStudy.slug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`case study: case-study/${caseStudy.slug}/`)
}

/* --- section index pages -------------------------------------------------
   Without these, /writing/ and /case-study/ were 404s while the individual
   pages existed. They also give crawlers and the feed a stable parent URL. */
const listItem = (url, title, blurb, meta) => `          <li>
            <a class="note__list-link" href="${url}">${esc(title)}</a>
            <p>${esc(blurb)}</p>
            <p class="note__list-meta">${esc(meta)}</p>
          </li>`

const indexPage = ({ url, title, description, kicker, heading, lead, items, ld }) => {
  const body = `          <div class="note__body">
            <ol class="note__list">
${items}
            </ol>
          </div>`
  const html = shell({ title, description, url, image: `${SITE}/assets/og.jpg`, ld, kicker, heading, meta: `${esc(brand.person)} · ${esc(brand.city)}`, lead, body, depth: 1, ogType: 'website' })
  const dir = join(DIST, url.replace(`${SITE}/`, '').replace(/\/$/, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`index page: ${url.replace(`${SITE}/`, '')}`)
}

indexPage({
  url: `${SITE}/writing/`,
  title: 'Technical notes',
  description: writing.note,
  kicker: 'writing · all notes',
  heading: 'Technical notes_',
  lead: writing.note,
  items: writing.posts
    .map((post) => listItem(
      `${SITE}/writing/${post.slug}/`,
      post.title,
      post.blurb,
      `${longDate(post.published)} · ${post.tag}`
    ))
    .join('\n'),
  ld: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Technical notes',
    description: writing.note,
    url: `${SITE}/writing/`,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: writing.posts.map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: post.title,
        url: `${SITE}/writing/${post.slug}/`,
      })),
    },
  },
})

if (caseStudy) {
  indexPage({
    url: `${SITE}/case-study/`,
    title: 'Case study',
    description: caseStudy.summary,
    kicker: 'case study',
    heading: 'Case study_',
    lead: 'The one piece of work that can be described in full, because it is this site.',
    items: listItem(
      `${SITE}/case-study/${caseStudy.slug}/`,
      caseStudy.title,
      caseStudy.summary,
      `${caseStudy.dateLabel || longDate(caseStudy.date)} · ${caseStudy.minutes}`
    ),
    ld: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Case study',
      description: caseStudy.summary,
      url: `${SITE}/case-study/`,
      inLanguage: 'en',
      isPartOf: { '@id': `${SITE}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [{
          '@type': 'ListItem',
          position: 1,
          name: caseStudy.title,
          url: `${SITE}/case-study/${caseStudy.slug}/`,
        }],
      },
    },
  })
}

/* --- 404 -----------------------------------------------------------------
   GitHub Pages serves 404.html for every unknown path, including deep ones
   like /writing/missing/page/. The old file was a byte copy of index.html,
   which meant a homepage canonical, "index,follow", and relative asset URLs
   that resolve against the missing directory. This one is a real page: noindex,
   absolute asset URLs, and links that work from any depth. */
const notFound = `<!doctype html>
<html lang="en-KE">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>404 · page not found · Felloh 3.1</title>
    <meta name="description" content="That page is not in the log. The portfolio, the technical notes, the case study and the contact details are one link away." />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="theme-color" content="#f6f6f3" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="404 · page not found · Felloh 3.1" />
    <meta property="og:description" content="That page is not in the log." />
    <meta property="og:url" content="${SITE}/404.html" />
    <link rel="icon" type="image/png" sizes="64x64" href="${SITE}/assets/favicon-joker.png" />
    <link rel="apple-touch-icon" href="${SITE}/assets/joker-apple-touch.png" />
    <link rel="preload" as="font" type="font/woff2" href="${SITE}/assets/fonts/inter-latin-400-normal.woff2" crossorigin />
    <link rel="stylesheet" href="${SITE}/assets/post.css" />
    <script>
try {
  var t = localStorage.getItem("f31-theme");
  if (!t) t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = t;
  if (t === "dark") document.querySelector('meta[name="theme-color"]').setAttribute("content", "#0d060b");
} catch (e) {
  document.documentElement.dataset.theme = "light";
}
    </script>
  </head>
  <body>
    <div class="wrap">
      <header class="bar">
        <a class="bar__brand" href="${SITE}/"><b>$</b> ${esc(brand.name)}</a>
        <nav class="bar__links" aria-label="Page">
          <a href="${SITE}/#writing">all notes</a>
          <a href="${SITE}/#contact">contact</a>
          <button class="nav__theme" type="button" id="theme-flip" aria-label="Switch theme" title="Flip the lights">
            <span class="nav__theme-orb" aria-hidden="true"></span>
          </button>
        </nav>
      </header>
      <main>
        <article class="note">
          <p class="logmark"><b>[log]</b> 404 · not found</p>
          <h1>That page is not in the log.</h1>
          <p class="note__meta"><span class="note__rule" aria-hidden="true"></span>${esc(brand.person)} · ${esc(brand.city)}</p>
          <p class="note__lead">The address may have moved, or it was never written. Everything public on this site is one of these:</p>
          <div class="note__body">
            <ol class="note__list">
              <li>
                <a class="note__list-link" href="${SITE}/">The portfolio</a>
                <p>Projects, infrastructure, approach, writing and contact on one sheet.</p>
              </li>
              <li>
                <a class="note__list-link" href="${SITE}/writing/">Technical notes</a>
                <p>Every published note, as its own page.</p>
              </li>
              <li>
                <a class="note__list-link" href="${SITE}/case-study/${caseStudy.slug}/">The case study</a>
                <p>The rule behind this site, what it cut, and how it is checked.</p>
              </li>
              <li>
                <a class="note__list-link" href="mailto:${brand.email}">${esc(brand.email)}</a>
                <p>Or write directly; no page required.</p>
              </li>
            </ol>
          </div>
        </article>
      </main>
      <footer class="foot">
        <span>© 2026 ${esc(brand.name)} · ${esc(brand.person)} · ${esc(brand.city)}</span>
        <a href="${SITE}/sitemap.xml">sitemap</a>
      </footer>
    </div>
${themeToggle}
  </body>
</html>
`

writeFileSync(join(DIST, '404.html'), notFound)
console.log('404.html written')
