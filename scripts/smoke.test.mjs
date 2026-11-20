import { JSDOM } from 'jsdom'
import React from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { build } from 'esbuild'
import { mkdirSync, readFileSync, existsSync } from 'node:fs'
import { caseStudy } from '../src/data/content.js'

mkdirSync('node_modules/.smoke', { recursive: true })
await build({
  entryPoints: ['src/App.jsx', 'src/components/Contact.jsx'],
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
try { Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true }) } catch {}
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, addListener() {}, removeListener() {} }))
window.fetch = undefined
globalThis.IS_REACT_ACT_ENVIRONMENT = true

const results = []
const check = (name, ok) => results.push({ name, ok: Boolean(ok) })
const { default: App } = await import('../node_modules/.smoke/App.mjs')
const { default: Contact, validateDraft, deliver } = await import('../node_modules/.smoke/Contact.mjs')
const root = createRoot(document.getElementById('root'))
await act(async () => { root.render(React.createElement(App)) })
await act(async () => { await new Promise((resolve) => setTimeout(resolve, 50)) })

const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => Array.from(document.querySelectorAll(selector))
const text = (element) => element?.textContent.trim() || ''

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
check('SEO: privacy-safe title and metadata', /Software & IT Systems Engineer/.test(readFileSync('index.html', 'utf8')))
check('SEO: FAQ schema describes privacy policy', /Why is there no employment timeline/.test(readFileSync('index.html', 'utf8')))
check('AEO: llms profile includes project links and privacy policy', existsSync('public/llms.txt') && /Privacy policy/.test(readFileSync('public/llms.txt', 'utf8')))
check('profile README: no CV download or employment timeline', !/download.*cv|employment timeline/i.test(readFileSync('README.md', 'utf8')))
check('profile README: no education or certification claims', !/education|certification|\bdegree\b/i.test(readFileSync('README.md', 'utf8')))
check('footer: no downloadable CV link exists', !$$('a').some((a) => /cv|resume/i.test(a.textContent + a.href)))
check('skip link points to project section', $('.skiplink')?.getAttribute('href') === '#work')

/* --- contact: validation, recovery and the two ways out ------------------ */
const submit = async (scope) => {
  await act(async () => {
    scope.querySelector('.slip__form').dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }))
  })
}

check('contact: submit is never silently disabled', $('.slip__form button[type="submit"]')?.disabled === false)
check('contact: a plain mailto address is always on screen', $$('#contact a[href^="mailto:"]').length >= 1)
check('contact: email field asks the browser for an email address', $('#field-reach')?.getAttribute('autocomplete') === 'email')
check('contact: fields are marked required', $$('#contact input[required]').length === 3)

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

globalThis.fetch = window.fetch = async () => { throw new Error('offline') }
check('contact: a failed delivery is reported, not disguised', (await deliver({ name: 'A', brief: 'B', email: 'c@d.ee', page: 'portfolio' })) === 'failed')
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
  /SoftwareSourceCode/.test(indexHtml) && /"codeRepository": "https:\/\/github\.com\/Fellow3-1\/mpesa-api-go"/.test(indexHtml)
)
check('SEO: index.html carries no retired repository link', !/AndroidStudyOpenSource/.test(indexHtml))
check('AEO: llms profile links the live repositories', /github\.com\/Fellow3-1\/mpesa-api-go/.test(llmsTxt) && !/AndroidStudyOpenSource/.test(llmsTxt))
check(
  'built Pages output: no retired repository link is served',
  !readFileSync('docs/index.html', 'utf8').includes('AndroidStudyOpenSource')
    && !readFileSync('docs/llms.txt', 'utf8').includes('AndroidStudyOpenSource')
)

let passed = 0
for (const result of results) {
  if (result.ok) passed += 1
  console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${result.name}`)
}
console.log(`\n${passed}/${results.length} checks passed`)
process.exit(passed === results.length ? 0 : 1)
