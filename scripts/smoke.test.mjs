import { JSDOM } from 'jsdom'
import { build } from 'esbuild'
import { mkdirSync, readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { dirname, resolve, extname, join } from 'node:path'
import { caseStudy, log } from '../src/data/content.js'

mkdirSync('node_modules/.smoke', { recursive: true })
await build({
  entryPoints: ['src/App.jsx', 'src/components/Contact.jsx', 'src/components/ErrorBoundary.jsx', 'src/theme.js'],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
  outdir: 'node_modules/.smoke',
  entryNames: '[name]',
  outExtension: { '.js': '.mjs' },
  logLevel: 'silent',
})

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true,
})
globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.localStorage = dom.window.localStorage
/* react-dom decides at import time whether the native `input` event exists.
   jsdom does not expose `oninput` on Document, so React would fall back to its
   IE-era keyup polyfill and synthetic typing would never fire onChange. Define
   the property before react-dom is imported so the normal path is used. */
Object.defineProperty(dom.window.Document.prototype, 'oninput', { value: null, configurable: true })
/* theme.js and CommandPalette dispatch CustomEvent; jsdom's dispatcher only
   accepts its own Event subclass, so point the global at the window's one. */
globalThis.CustomEvent = dom.window.CustomEvent
/* React's input polyfill (jsdom reports no native 'input' support) calls the
   IE-only attachEvent/detachEvent pair. Stub them so a real change event can
   still be dispatched in the contact race test. */
dom.window.HTMLElement.prototype.attachEvent = () => {}
dom.window.HTMLElement.prototype.detachEvent = () => {}
try {
  Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true })
} catch {
  /* navigator is not configurable in some runtimes; jsdom's is close enough */
}
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, addListener() {}, removeListener() {} }))
window.fetch = undefined
globalThis.IS_REACT_ACT_ENVIRONMENT = true

const results = []
const check = (name, ok) => results.push({ name, ok: Boolean(ok) })

/* Imported after the DOM globals exist: react-dom reads `canUseDOM` and the
   input-event support flag at module scope, so an earlier static import would
   lock in the wrong answer for this environment. */
const React = (await import('react')).default
const { act } = await import('react')
const { createRoot } = await import('react-dom/client')

const { default: App } = await import('../node_modules/.smoke/App.mjs')
const { default: Contact, validateDraft, deliver } = await import('../node_modules/.smoke/Contact.mjs')
const { default: ErrorBoundary } = await import('../node_modules/.smoke/ErrorBoundary.mjs')
const { getTheme, setTheme } = await import('../node_modules/.smoke/theme.mjs')
const root = createRoot(document.getElementById('root'))
await act(async () => { root.render(React.createElement(App)) })
await act(async () => { await new Promise((resolve) => setTimeout(resolve, 50)) })
/* let the hero's 720 ms typing interval finish inside act, so no state update
   lands outside it */
await act(async () => { await new Promise((resolve) => setTimeout(resolve, 900)) })

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => Array.from(document.querySelectorAll(selector))
const text = (element) => element?.textContent.trim() || ''

/* `dist/` when a build has just run (CI), `docs/` when only the committed
   Pages build is present. Either way this reads the artifact, not the source. */
const builtPath = (rel) => (existsSync(`dist/${rel}`) ? `dist/${rel}` : `docs/${rel}`)
const built = (rel) => readFileSync(builtPath(rel), 'utf8')

check('hero: identifies software and IT systems scope', /systems administration|network infrastructure/i.test(text($('.hero__tag'))))
check('hero: GitHub and LinkedIn links are present', $$('.hero__links a').length === 2)
check('navigation: primary sections include infrastructure', $$('.nav__links a[href="#infrastructure"]').length === 1)
check('projects: only three public repositories are listed', $$('.entry').length === 3)
check('projects: every entry links to a public source repository', $$('.entry .alink').length === 3)
check('projects: Go wrapper points to the live repository', $$('.entry .alink').some((a) => a.href === 'https://github.com/Fellow3-1/mpesa-api-go'))
check('projects: every repository link points at the current owner', $$('.entry .alink').every((a) => /^https:\/\/github\.com\/Fellow3-1\/[a-z0-9._-]+$/.test(a.href)))
check('projects: the retired AndroidStudyOpenSource org is not linked', !$$('.entry .alink').some((a) => /AndroidStudyOpenSource/.test(a.href)))
check('projects: Tovuti describes connectivity checks', /connectivity before an application makes HTTP requests/i.test(text($('.entry:nth-child(2)'))))
check('projects: SMS verifier says only RECEIVE_SMS is required', /only RECEIVE_SMS is required/i.test(text($('.entry:nth-child(3)'))))
check('infrastructure: four capability groups render', $$('.infra__card').length === 4)
check(
  'infrastructure: every card exposes a labelled keyboard pin',
  $$('.infra__card .infra__pin[aria-pressed]').length === 4
    && $$('.infra__pin').every((button) => /Pin|Unpin/.test(button.getAttribute('aria-label') || ''))
)
check(
  'infrastructure: domain chips announce the domain, not the code',
  $$('.swarm__chip').length === 4
    && $$('.swarm__chip').every((chip) => /Highlight|Unpin/.test(chip.getAttribute('aria-label') || ''))
)
check('infrastructure: privacy and experience caveat is visible', /does not imply that every product/i.test(text($('#infrastructure'))))
check('approach: three engineering principles render', $$('.block').length === 3)
check('profile: no education or certification section renders', !/education|certification/i.test(text($('#about'))))
check('SEO: llms profile carries no education or certification block', !/## Education/i.test(readFileSync('public/llms.txt', 'utf8')))
check('profile: no employment reference records render', $$('.refs__row').length === 0)
check('hero: availability line states open opportunities cleanly', text($('.hero__now')) === 'open to software engineering, systems, infrastructure and networking opportunities')
check('hero: availability line omits "now" and "nairobi"', !/\bnow\b|\bnairobi\b/i.test(text($('.hero__now'))))
check('hero: availability line carries no clock', !/\d{2}:\d{2}/.test(text($('.hero__now'))))
check('nav: "open" status indicator is removed', !$('.nav__status') && !/\bopen\b/i.test(text($('.nav'))))
check('nav: carries no live clock', !/\d{2}:\d{2}/.test(text($('.nav'))))
check('infrastructure: scroll-driven swarm field and four domain chips render', Boolean($('#infrastructure .swarm__canvas')) && $$('#infrastructure .swarm__chip').length === 4)
await act(async () => {
  $('#infrastructure .swarm__chip')?.click()
})
check('infrastructure: selecting a swarm chip highlights the matching card', $('#infrastructure .swarm__chip')?.getAttribute('aria-pressed') === 'true' && $('#infrastructure .infra__card')?.classList.contains('is-active'))
await act(async () => {
  $('#infrastructure .swarm__chip')?.click()
})

/* --- section 03: hover/click must never drop the reveal state --------------
   React rewrites `className` whenever a card gains or loses `is-active`. If
   the reveal state lived in that same class attribute, hovering or selecting
   a card deleted it and the card's content vanished until a reload. The
   reveal state therefore lives in `data-reveal-in`, which React never writes. */
const infraCards = $$('#infrastructure .infra__card')
const pointerMove = async (el) => {
  await act(async () => {
    el.dispatchEvent(new dom.window.MouseEvent('pointermove', { bubbles: true }))
  })
}
await pointerMove(infraCards[0])
check(
  'infrastructure: hovering a card highlights it and every card stays visible',
  infraCards[0].classList.contains('is-active') && infraCards.every((card) => card.hasAttribute('data-reveal-in'))
)
await pointerMove(infraCards[3])
check(
  'infrastructure: moving the hover to another card leaves all four revealed',
  infraCards[3].classList.contains('is-active')
    && !infraCards[0].classList.contains('is-active')
    && infraCards.every((card) => card.hasAttribute('data-reveal-in'))
)
const infraChips = $$('#infrastructure .swarm__chip')
await act(async () => {
  infraCards[3].click()
})
check(
  'infrastructure: clicking a card pins it without dropping its reveal state',
  infraChips[3].getAttribute('aria-pressed') === 'true'
    && infraCards[3].classList.contains('is-active')
    && infraCards.every((card) => card.hasAttribute('data-reveal-in'))
)
await act(async () => {
  infraCards[3].click()
})
check(
  'infrastructure: unpinning a card leaves every card revealed',
  infraChips[3].getAttribute('aria-pressed') === 'false'
    && infraCards.every((card) => card.hasAttribute('data-reveal-in'))
)

const cssSource = readFileSync('src/index.css', 'utf8')
check(
  'reveal: visibility is a data attribute React cannot overwrite',
  /\[data-reveal\]\[data-reveal-in\]/.test(cssSource)
    && !/\[data-reveal\]\.is-in/.test(cssSource)
    && !/infra__card\.is-in/.test(cssSource)
    && /\[data-reveal\]:not\(\[data-reveal-in\]\)/.test(readFileSync('src/App.jsx', 'utf8'))
)

check('writing: share links point to standalone note URLs', $$('.post__share a[href*="share-offsite"]').every((a) => /writing%2F/.test(a.href)))
await act(async () => {
  window.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))
})
check('command palette: Cmd+K opens quick navigation dialog', Boolean($('.cmdk[role="dialog"]')))
await act(async () => {
  window.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
})
check('command palette: Escape dismisses quick navigation dialog', !$('.cmdk[role="dialog"]'))
check('hero: the polaroid image is not pinned to its pixel height attribute', /img\s*\{[^}]*height:\s*auto/.test(readFileSync('src/index.css', 'utf8')))
check('theme: toggle button is present', $('#theme-flip')?.tagName === 'BUTTON')
check('writing: every note links to its standalone page', $$('.post__open a[href^="writing/"]').length === 3)
check('testimonials: three notes render', $$('.tcard').length === 3)
check('feed: items point at standalone note pages', /writing\/safer-mpesa-callbacks\//.test(readFileSync('public/feed.xml', 'utf8')))
check('sitemap: standalone note pages are listed', /writing\/linux-service-diagnostics\//.test(readFileSync('public/sitemap.xml', 'utf8')))
check('contact: form creates a local email draft', $('#field-name') && $('.slip__form button'))
check('contact: no mock invoice price is shown', !/KES\s+[0-9,]+/.test(text($('#contact'))))
check('SEO: privacy-safe title and metadata', /Software & IT Systems Engineer/.test(built('index.html')))
check('SEO: generated FAQ schema matches the content module', /Why is there no employment timeline/.test(built('index.html')) && /"datePublished": "2025-11-03"/.test(built('index.html')))
check('SEO: the source shell no longer duplicates the FAQ copy', !/Why is there no employment timeline/.test(readFileSync('index.html', 'utf8')))
check('SEO: the source shell carries the structured-data placeholder', /<!--structured-data-->/.test(readFileSync('index.html', 'utf8')))
check('AEO: llms profile includes project links and privacy policy', existsSync('public/llms.txt') && /Privacy policy/.test(readFileSync('public/llms.txt', 'utf8')))
check('profile README: no CV download or employment timeline', !/download.*cv|employment timeline/i.test(readFileSync('README.md', 'utf8')))
check('profile README: no education or certification claims', !/education|certification|\bdegree\b/i.test(readFileSync('README.md', 'utf8')))
check('footer: no downloadable CV link exists', !$$('a').some((a) => /cv|resume/i.test(a.textContent + a.href)))
check(
  'footer: GitHub, LinkedIn and email are reachable from the footer',
  /github/i.test(text($('.foot')))
    && /linkedin/i.test(text($('.foot')))
    && $$('footer a[href^="mailto:"]').length >= 1
)
check(
  'hero: the polaroid is the 960 px crop, not the 2560 px original',
  $('.polaroid img')?.getAttribute('src') === 'assets/polaroid-960.jpg'
    && $('.polaroid img')?.getAttribute('width') === '960'
)
check(
  'shell: a failed bundle gets a readable fallback, and no-JS gets one too',
  /<noscript>[\s\S]*felixodhiambo31@live\.com[\s\S]*<\/noscript>/.test(readFileSync('index.html', 'utf8'))
    && /hasChildNodes\(\)/.test(readFileSync('index.html', 'utf8'))
)
check('skip link points at the main content, not the second section', $('.skiplink')?.getAttribute('href') === '#main' && Boolean($('#main')))

/* --- contact: validation, recovery and the two ways out ------------------ */
const submit = async (scope) => {
  await act(async () => {
    scope.querySelector('.slip__form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }))
  })
}

check('contact: submit is never silently disabled', $('.slip__form button[type="submit"]')?.disabled === false)
check('contact: a plain mailto address is always on screen', $$('#contact a[href^="mailto:"]').length >= 1)
check('contact: email field asks the browser for an email address', $('#field-reach')?.getAttribute('autocomplete') === 'email')
check('contact: all three fields are marked required', $$('#contact :is(input, textarea)[required]').length === 3)

await submit(document)
check('contact: empty submit explains every missing field', $$('.field__err').length === 3)
check('contact: invalid fields are marked for assistive tech', $('#field-name')?.getAttribute('aria-invalid') === 'true')
check('contact: failed submit leaves the receipt idle', !$('.slip__card')?.classList.contains('is-confirmed'))
check('contact: errors are announced, not just coloured', $$('.field__err[role="alert"]').length === 3)

/* the form logic itself, called directly: jsdom cannot replay typing into
   React's synthetic input events, so the rules are exercised as functions */
const base = { name: 'Amina', work: 'Frontend contract for a payments dashboard', reach: 'amina@example.com' }
check('contact: a complete draft passes validation', Object.keys(validateDraft(base)).length === 0)
check('contact: an address without a domain is rejected', Boolean(validateDraft({ ...base, reach: 'not-an-address' }).reach))
check('contact: a one-letter name is rejected', Boolean(validateDraft({ ...base, name: 'A' }).name))
check('contact: an empty brief is rejected', Boolean(validateDraft({ ...base, work: '   ' }).work))

/* render the section once with a complete draft, then submit it for real */
const host = document.createElement('div')
document.body.appendChild(host)
const contactRoot = createRoot(host)
await act(async () => {
  contactRoot.render(React.createElement(Contact, { initialValues: base }))
})
await submit(host)
check('contact: valid submit marks the receipt ready', host.querySelector('.slip__card')?.classList.contains('is-confirmed'))
check('contact: the draft can be opened from the form', Boolean(host.querySelector('.slip__actions a.macpill[href^="mailto:"]')))
check('contact: the draft can be copied when no mail app exists', Array.from(host.querySelectorAll('.slip__actions button')).some((b) => /copy draft/i.test(b.textContent)))
await act(async () => contactRoot.unmount())
host.remove()

/* --- delivery: the table only accepts inserts, the UI must still work ---- */
check('contact: a honeypot field exists and is out of the tab order', (() => {
  const trap = document.querySelector('#field-company')
  return Boolean(trap) && trap.getAttribute('tabindex') === '-1'
})())

const calls = []
globalThis.fetch = window.fetch = async (url, options) => {
  calls.push({ url: String(url), options })
  return { ok: true, status: 201 }
}
const sent = await deliver({ name: 'Amina', brief: 'Frontend contract', email: 'amina@example.com', page: 'portfolio' })
check('contact: the message is inserted through the REST endpoint', sent === 'sent' && calls.length === 1)
check('contact: the request targets the portfolio table', /\/rest\/v1\/portfolio_messages$/.test(calls[0].url))
check('contact: the publishable key travels on apikey only', Boolean(calls[0].options.headers.apikey) && !calls[0].options.headers.Authorization)
check('contact: the message carries no extra fields', Object.keys(JSON.parse(calls[0].options.body)).sort().join(',') === 'brief,email,name,page')

/* the four ways a send can go wrong are four different sentences, not one */
globalThis.fetch = window.fetch = async () => { throw new Error('offline') }
check('contact: a network failure is reported as offline, not as a refused message', (await deliver({ name: 'A', brief: 'B', email: 'c@d.ee', page: 'portfolio' })) === 'offline')
globalThis.fetch = window.fetch = async () => ({ ok: false, status: 429 })
check('contact: a rate-limited insert is reported as limited', (await deliver({ name: 'A', brief: 'B', email: 'c@d.ee', page: 'portfolio' })) === 'limited')
globalThis.fetch = window.fetch = async () => ({ ok: false, status: 422 })
check('contact: a refused insert is reported as rejected', (await deliver({ name: 'A', brief: 'B', email: 'c@d.ee', page: 'portfolio' })) === 'rejected')
globalThis.fetch = window.fetch = async () => ({ ok: false, status: 500 })
check('contact: a server error is reported as failed', (await deliver({ name: 'A', brief: 'B', email: 'c@d.ee', page: 'portfolio' })) === 'failed')
globalThis.fetch = window.fetch = undefined

/* the section rendered with a delivered message */
const deliveredHost = document.createElement('div')
document.body.appendChild(deliveredHost)
const deliveredRoot = createRoot(deliveredHost)
await act(async () => {
  deliveredRoot.render(
    React.createElement(Contact, {
      initialValues: base,
      deliverMessage: async () => 'sent',
    })
  )
})
await act(async () => {
  deliveredHost.querySelector('.slip__form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }))
  await new Promise((resolve) => setTimeout(resolve, 20))
})
check('contact: a delivered message is confirmed on screen', Boolean(deliveredHost.querySelector('.slip__status.is-sent')))
check('contact: the receipt reports delivery', /delivered/i.test(deliveredHost.querySelector('.slip__total b')?.textContent || ''))
await act(async () => deliveredRoot.unmount())
deliveredHost.remove()

/* and one where the inbox is unreachable */
const failedHost = document.createElement('div')
document.body.appendChild(failedHost)
const failedRoot = createRoot(failedHost)
await act(async () => {
  failedRoot.render(
    React.createElement(Contact, {
      initialValues: base,
      deliverMessage: async () => 'failed',
    })
  )
})
await act(async () => {
  failedHost.querySelector('.slip__form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }))
  await new Promise((resolve) => setTimeout(resolve, 20))
})
check('contact: a failed delivery falls back to the email draft', Boolean(failedHost.querySelector('.slip__status.is-failed')) && Boolean(failedHost.querySelector('.slip__actions a[href^="mailto:"]')))
await act(async () => failedRoot.unmount())
failedHost.remove()

/* --- the reframed section, the case study, the generated files ----------- */
check('working together: three first-person commitments render', $$('#testimonials .tcard').length === 3)
check('working together: no quote marks or "colleague" attributions remain', !/colleague|stakeholder|teammate/i.test(text($('#testimonials'))))
check('case study: the work section links to its own page', /case-study\/a-portfolio-that-refuses-to-invent-numbers\//.test($('.casecard a')?.getAttribute('href') || ''))
check(
  'case study: the lead paragraph and six headed sections are present',
  caseStudy.sections.length === 6
    && /a stranger cannot check for themselves/.test(caseStudy.lead)
    && caseStudy.title === 'A Portfolio That Refuses to Invent Numbers'
)
check(
  'case study: the prose carries no em, en or spaced hyphens used as dashes',
  !/[\u2014\u2013]|\s-\s/.test(JSON.stringify(caseStudy))
)

const feedXml = readFileSync('public/feed.xml', 'utf8')
const sitemapXml = readFileSync('public/sitemap.xml', 'utf8')
check('feed: every published note appears', ['safer-mpesa-callbacks', 'network-troubleshooting-sequence', 'linux-service-diagnostics'].every((slug) => feedXml.includes(`/writing/${slug}/`)))
check('sitemap: every note and the case study appear', ['safer-mpesa-callbacks', 'network-troubleshooting-sequence', 'linux-service-diagnostics'].every((slug) => sitemapXml.includes(`/writing/${slug}/`)) && sitemapXml.includes('/case-study/a-portfolio-that-refuses-to-invent-numbers/'))

/* --- resilience and structured data ------------------------------------- */
const indexHtml = readFileSync('index.html', 'utf8')
const llmsTxt = readFileSync('public/llms.txt', 'utf8')
check('shell: a failed bundle still reveals the page', /classList\.contains\("is-in"\)/.test(indexHtml))
check(
  'SEO: public repositories are described as source code',
  /SoftwareSourceCode/.test(built('index.html'))
    && /"codeRepository": "https:\/\/github\.com\/Fellow3-1\/mpesa-api-go"/.test(built('index.html'))
)
check('SEO: index.html carries no retired repository link', !/AndroidStudyOpenSource/.test(built('index.html')))
check('AEO: llms profile links the live repositories', /github\.com\/Fellow3-1\/mpesa-api-go/.test(llmsTxt) && !/AndroidStudyOpenSource/.test(llmsTxt))
check(
  'built Pages output: no retired repository link is served',
  !built('index.html').includes('AndroidStudyOpenSource')
    && !built('llms.txt').includes('AndroidStudyOpenSource')
)
check(
  'built Pages output: the 404 page is noindex and is not the homepage',
  /name="robots" content="noindex, nofollow"/.test(built('404.html'))
    && !/rel="canonical"/.test(built('404.html'))
    && /page not found|not in the log/i.test(built('404.html'))
)
/* --- link and asset check over the built artifact ----------------------- */
const SITE = 'https://fellow3-1.github.io/Fellow3-1/'
const buildRoot = existsSync('dist/index.html') ? 'dist' : 'docs'
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
const builtFiles = walk(buildRoot)
const refs = new Map()
const addRef = (from, value) => {
  const raw = value.trim()
  if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('data:') || raw.startsWith('tel:')) return
  if (raw.startsWith('//') || (raw.startsWith('http') && !raw.startsWith(SITE))) return
  const clean = raw.startsWith(SITE)
    ? raw.slice(SITE.length).split('#')[0].split('?')[0]
    : raw.split('#')[0].split('?')[0]
  if (!clean) return
  const target = raw.startsWith(SITE) || clean.startsWith('/')
    ? join(buildRoot, clean)
    : resolve(dirname(from), clean)
  if (!refs.has(target)) refs.set(target, from)
}

for (const file of builtFiles) {
  if (!['.html', '.css', '.xml', '.txt', '.webmanifest'].includes(extname(file))) continue
  const source = readFileSync(file, 'utf8')
  if (file.endsWith('.css')) {
    for (const match of source.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) addRef(file, match[1])
    continue
  }
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) addRef(file, match[1])
  for (const match of source.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of match[1].split(',')) addRef(file, part.trim().split(/\s+/)[0])
  }
  for (const match of source.matchAll(/<loc>([^<]+)<\/loc>/g)) addRef(file, match[1])
}

const broken = [...refs.entries()].filter(([target]) => !existsSync(target) && !existsSync(join(target, 'index.html')))
check(
  'build: every local link, asset and sitemap URL resolves',
  broken.length === 0
)
check(
  'SEO: the homepage canonical matches the deployed origin',
  built('index.html').includes(`<link rel="canonical" href="${SITE}" />`)
)
if (broken.length) console.log(broken.map(([target, from]) => `  ${target} (from ${from})`).join('\n'))

check(
  'built Pages output: writing and case study have index pages',
  /safer-mpesa-callbacks/.test(built('writing/index.html'))
    && /A Portfolio That Refuses to Invent Numbers/.test(built('case-study/index.html'))
)

/* --- content schema, so a renamed field cannot ship a broken page ------- */
const { writing: writingContent } = await import('../src/data/content.js')
check(
  'content: every note carries the fields its page needs',
  writingContent.posts.every(
    (p) =>
      typeof p.slug === 'string' &&
      /^[a-z0-9-]+$/.test(p.slug) &&
      typeof p.title === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(p.published) &&
      typeof p.kind === 'string' &&
      typeof p.tag === 'string' &&
      Array.isArray(p.body) &&
      p.body.length > 0
  )
)
check(
  'content: note slugs are unique',
  new Set(writingContent.posts.map((p) => p.slug)).size === writingContent.posts.length
)
check(
  'content: a note never reuses `date` or `minutes` for a label',
  writingContent.posts.every((p) => !('date' in p) && !('minutes' in p))
)
check(
  'AEO: llms.txt lists every public repository and every note',
  log.entries.every((entry) => llmsTxt.includes(entry.link.href))
    && writingContent.posts.every((post) => llmsTxt.includes(`/writing/${post.slug}/`))
)
check(
  'content: every note and the case study have a social card',
  writingContent.posts.every((p) => existsSync(`public/assets/og/${p.slug}.png`))
    && existsSync(`public/assets/og/${caseStudy.slug}.png`)
)

/* --- post.css token sync ------------------------------------------------ */
const rootBlock = (css) => css.match(/:root\s*\{[^}]*\}/)?.[0] || ''
check(
  'styles: note pages share the main sheet tokens',
  rootBlock(readFileSync('src/index.css', 'utf8')) === rootBlock(readFileSync('public/assets/post.css', 'utf8'))
)
check(
  'styles: note pages declare the Inter fallback face',
  /Inter Fallback/.test(readFileSync('public/assets/post.css', 'utf8'))
)

/* --- contact: one request at a time, and no stale "delivered" ---------- */
const raceHost = document.createElement('div')
document.body.appendChild(raceHost)
const raceRoot = createRoot(raceHost)
let raceCalls = 0
let resolveRace
const raceGate = new Promise((resolve) => { resolveRace = resolve })
await act(async () => {
  raceRoot.render(
    React.createElement(Contact, {
      initialValues: base,
      deliverMessage: () => {
        raceCalls += 1
        return raceGate
      },
    })
  )
})
const raceSubmit = async () => {
  await act(async () => {
    raceHost.querySelector('.slip__form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }))
  })
}
await raceSubmit()
await raceSubmit()
check('contact: a double submit sends exactly one message', raceCalls === 1)
check('contact: the receipt is marked busy while sending', raceHost.querySelector('.slip__form button[type="submit"]')?.getAttribute('aria-busy') === 'true')
check('contact: the submit button is never disabled, even mid-send', raceHost.querySelector('.slip__form button[type="submit"]')?.disabled === false)

/* edit the brief while the first send is still in flight */
const briefBox = raceHost.querySelector('#field-work')
await act(async () => {
  /* the prototype setter writes the DOM value without touching React's value
     tracker, so the tracker sees a real change and fires onChange */
  const proto = briefBox.tagName === 'TEXTAREA'
    ? dom.window.HTMLTextAreaElement.prototype
    : dom.window.HTMLInputElement.prototype
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(briefBox, 'A different brief entirely')
  briefBox.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
})
await act(async () => {
  resolveRace('sent')
  await new Promise((resolve) => setTimeout(resolve, 20))
})
check(
  'contact: a response for an edited draft is not reported as delivered',
  !raceHost.querySelector('.slip__status.is-sent')
)
await act(async () => raceRoot.unmount())
raceHost.remove()

/* --- error boundary ----------------------------------------------------- */
const crashHost = document.createElement('div')
document.body.appendChild(crashHost)
const crashRoot = createRoot(crashHost)
const Boom = () => { throw new Error('intentional smoke-test failure') }
const originalError = console.error
console.error = () => {}
try {
  await act(async () => {
    crashRoot.render(React.createElement(ErrorBoundary, null, React.createElement(Boom)))
  })
} finally {
  console.error = originalError
}
check(
  'error boundary: a render failure keeps a readable page with contact details',
  /error while rendering/i.test(text(crashHost)) && /felixodhiambo31@live\.com/.test(text(crashHost))
)
await act(async () => crashRoot.unmount())
crashHost.remove()

/* --- theme -------------------------------------------------------------- */
await act(async () => { setTheme('dark', { persist: true }) })
check(
  'theme: setting a theme updates the document and the stored choice',
  document.documentElement.dataset.theme === 'dark' && dom.window.localStorage.getItem('f31-theme') === 'dark'
)
await act(async () => { setTheme('light', { persist: true }) })
check('theme: the theme can be flipped back', getTheme() === 'light')

/* --- palette structure -------------------------------------------------- */
await act(async () => {
  window.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))
})
check(
  'command palette: options are real listbox options, not buttons inside options',
  $$('.cmdk__list [role="option"]').length > 0 && $$('.cmdk__list [role="option"] button').length === 0
)
check(
  'command palette: exactly one option is selected at a time',
  $$('.cmdk__list [role="option"][aria-selected="true"]').length === 1
)
check('command palette: the dialog is modal', $('.cmdk[role="dialog"]')?.getAttribute('aria-modal') === 'true')

/* focus trap: Shift+Tab on the first control must wrap to the last */
const dialogEl = $('.cmdk')
const closeBtn = dialogEl?.querySelector('.cmdk__close')
const paletteInput = dialogEl?.querySelector('.cmdk__input')
if (closeBtn && paletteInput) {
  await act(async () => { closeBtn.focus() })
  await act(async () => {
    closeBtn.dispatchEvent(
      new dom.window.KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true })
    )
  })
}
check(
  'command palette: Shift+Tab on the first control wraps to the last',
  Boolean(closeBtn && paletteInput) && document.activeElement === paletteInput
)

/* --- reveals ------------------------------------------------------------ */
check(
  'reveal: every reveal element is visible in the no-observer fallback',
  $$('[data-reveal]').every((el) => el.hasAttribute('data-reveal-in'))
)

let passed = 0
for (const result of results) {
  if (result.ok) passed += 1
  console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${result.name}`)
}
console.log(`\n${passed}/${results.length} checks passed`)
process.exit(passed === results.length ? 0 : 1)
