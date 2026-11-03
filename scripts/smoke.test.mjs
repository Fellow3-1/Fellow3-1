import { JSDOM } from 'jsdom'
import React from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { build } from 'esbuild'
import { mkdirSync, readFileSync, existsSync } from 'node:fs'

mkdirSync('node_modules/.smoke', { recursive: true })
await build({
  entryPoints: ['src/App.jsx'],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
  outfile: 'node_modules/.smoke/app.mjs',
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
const { default: App } = await import('../node_modules/.smoke/app.mjs')
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
check('projects: Go wrapper points to documented repository', $$('.entry .alink').some((a) => a.href.includes('AndroidStudyOpenSource/mpesa-api-go')))
check('projects: Tovuti describes connectivity checks', /connectivity before an application makes HTTP requests/i.test(text($('.entry:nth-child(2)'))))
check('projects: SMS verifier documents SMS permissions', /READ_SMS and RECEIVE_SMS/i.test(text($('.entry:nth-child(3)'))))
check('infrastructure: four capability groups render', $$('.infra__card').length === 4)
check('infrastructure: privacy and experience caveat is visible', /does not imply that every product/i.test(text($('#infrastructure'))))
check('approach: three engineering principles render', $$('.block').length === 3)
check('profile: no education or certification section renders', !/education|certification/i.test(text($('#about'))))
check('SEO: llms profile carries no education or certification block', !/## Education/i.test(readFileSync('public/llms.txt', 'utf8')))
check('profile: no employment reference records render', $$('.refs__row').length === 0)
check('hero: live now-line renders', /now · nairobi/.test(text($('.hero__now'))))
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

let passed = 0
for (const result of results) {
  if (result.ok) passed += 1
  console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${result.name}`)
}
console.log(`\n${passed}/${results.length} checks passed`)
process.exit(passed === results.length ? 0 : 1)
