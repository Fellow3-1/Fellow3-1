/* Smoke test — jsdom render of the real App, asserting the DOM contract
   of the engineering-log build. Run: node scripts/smoke.test.mjs */

import { JSDOM } from 'jsdom'
import React from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'

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
try {
  Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true })
} catch {
  /* navigator already exists in this Node */
}
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
globalThis.cancelAnimationFrame = (id) => clearTimeout(id)
window.matchMedia =
  window.matchMedia ||
  ((q) => ({ matches: false, media: q, addListener() {}, removeListener() {} }))
/* no network in tests: OpenSource must take its documented fallback path */
window.fetch = undefined

globalThis.IS_REACT_ACT_ENVIRONMENT = true

const results = []
const check = (name, ok, extra = '') => results.push({ name, ok: Boolean(ok), extra })

const { default: App } = await import('../node_modules/.smoke/app.mjs')

const root = createRoot(document.getElementById('root'))
await act(async () => {
  root.render(React.createElement(App))
})
await act(async () => {
  await new Promise((r) => setTimeout(r, 60))
})

const $ = (sel) => document.querySelector(sel)
const $$ = (sel) => Array.from(document.querySelectorAll(sel))
const text = (el) => (el ? el.textContent.trim() : null)

/* — hero — */
check(
  'hero: exact tagline from the brief',
  text($('.hero__tag')) ===
    'Full-stack engineer. I build payment-ready web and Android products that stay fast under real traffic.',
)
check('hero: name carries Felloh 3.1', text($('.hero__name')).includes('Felloh 3.1'))
check('hero: three route links (GitHub, CV, Email)', $$('.hero__links a').length === 3)
check('hero: anonymised-positioning note shown', /described by sector, not by client/.test(text($('.hero__note')) || ''))
check(
  'hero: joker polaroid sits opposite the name',
  $('.hero__top .polaroid img')?.getAttribute('src') === 'assets/HD-Joker-Wallpapers-scaled.jpg' &&
    text($('.polaroid figcaption')) === 'the muse_',
)

/* — the log — */
check('log: five entries', $$('.entry').length === 5)
check(
  'log: entries numbered as a log',
  $$('.entry__num').map((el) => text(el)).join(',') === '#01,#02,#03,#04,#05',
)
check(
  'log: labels are sector + problem, no employer names',
  ['Refugee artisan marketplace', 'SMS gateway monitoring dashboard', 'M-PESA Daraja library', 'Android libraries: tovuti + sms-verifier', 'Construction and logistics platform'].every((l) =>
    $$('.entry__label').some((el) => text(el) === l),
  ),
)
check('log: every entry has a stack tag row', $$('.entry .tagrow').length === 5)
check('log: every entry has three impact-number cells', $$('.entry__nums').length === 5 && $$('.entry__num-cell').length === 15)
check('log: every entry records decisions', $$('.entry__decisions').length === 5)
check('log: every entry expands to architecture + shot', $$('.entry details').length === 5 && $$('.flow').length === 5)
check('log: every architecture diagram has four nodes', $$('.flow').every((f) => f.querySelectorAll('.flow__node').length === 4))
check(
  'log: only the public repo links out live',
  $$('.entry .alink').length === 1 && $('.entry .alink')?.href === 'https://github.com/Fellow3-1/Fello_Daraja_API',
)
check('log: non-public imagery is marked demo/redacted', $$('.entry__shot figcaption').filter((f) => /demo|redacted|screen grab|illustrative|private/i.test(text(f))).length >= 4)

/* — approach — */
check('approach: three pillars incl. DevOps and leadership', $$('.block').length === 3 && /DevOps and reliability/.test($$('.block h3').map((h) => text(h)).join(',')))

/* — writing — */
check('writing: three technical notes', $$('.post').length === 3)
check('writing: posts carry real body text', $$('.post__body p').length >= 5)

/* — contributions snake — */
check('oss section is gone', $('.oss__rows') === null && $$('.nav__links a').every((a) => text(a) !== 'Open source'))
check(
  'snake: targets the repo output branch',
  $('.snake img')?.src ===
    'https://raw.githubusercontent.com/Fellow3-1/Fellow3-1/output/github-contribution-grid-snake.svg',
)
await act(async () => {
  $('.snake img').dispatchEvent(new window.Event('error'))
  await new Promise((r) => setTimeout(r, 30))
})
check('snake: missing file falls back to an honest note with the real grid link', $('.snake__note') !== null)

/* — added imagery — */
check('hero: field photo strip present', $('.hero__strip img')?.getAttribute('src') === 'assets/hero-skyline-day.jpg')
check('log: every entry shows its picture inline', $$('.entry__shot img').length === 5)
check(
  'log: construction entry uses the real yard photo',
  $$('.entry__shot img').some((i) => i.getAttribute('src') === 'assets/work-logistics.jpg'),
)
check('about: desk photo present', $('.about__shot img')?.getAttribute('src') === 'assets/intro-desk.jpg')

/* — about — */
check('about: skills grouped by depth', $$('.depth__row').length === 3 && text($$('.depth__row')[0]).includes('Daily use'))
check('about: availability card lists engagement types', /full-time, contract, or consulting/.test(text($('.about__card')) || ''))
check('about: EAT timezone stated', text($('.about__card'))?.includes('EAT'))
check('about: references are anonymised by role', $$('.refs__row').length === 3 && !/@[a-z]+\./i.test(text($('.refs')) || ''))

/* — contact + receipt flow — */
check('contact: name placeholder is Susan Akinyi', $('#field-name')?.placeholder === 'Susan Akinyi')
check('receipt: build button disabled until filled', $('.slip__form .btn').disabled === true)

/* jsdom's synthetic input events never trip React's change plugin here, so we
   call the fiber's bound onChange with a target-shaped object; jsdom also
   skips click→submit wiring, so the form receives a real submit event. */
const setInput = (input, value) => {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  setter.call(input, value)
  const propsKey = Object.keys(input).find((k) => k.startsWith('__reactProps$'))
  if (propsKey && typeof input[propsKey].onChange === 'function') {
    input[propsKey].onChange({ target: input })
  } else {
    input.dispatchEvent(new window.Event('input', { bubbles: true }))
  }
}

await act(async () => {
  setInput($('#field-name'), 'Wanjiku Mwangi')
  setInput($('#field-work'), 'a payment integration for our shop')
  setInput($('#field-reach'), 'wanjiku@company.co.ke')
  await new Promise((r) => setTimeout(r, 30))
})

check('receipt: button unlocks once filled', $('.slip__form .btn').disabled === false)

await act(async () => {
  $('.slip__form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }))
  await new Promise((r) => setTimeout(r, 40))
})

check('receipt: CONFIRMED block prints', $('.slip__confirm') !== null)
const mail = $('.slip__confirm a')
check('receipt: mail draft is a mailto', mail?.getAttribute('href').startsWith('mailto:felixodhiambo31@live.com'))
check('receipt: draft carries the filled values', /Wanjiku%20Mwangi/.test(mail?.getAttribute('href') || ''))
check('receipt: figures sharpen when confirmed', $('.slip__card').classList.contains('is-confirmed'))

/* — furniture + muse — */
check('nav: fixed bar with open status', $('.nav') !== null && /open · nairobi/.test(text($('.nav__status')) || ''))
check('muse: joker favicon img survives in footer badge', $('.foot__muse img')?.getAttribute('src') === 'assets/favicon-joker.png')
check('footer: hygiene column lists no-trackers', /No trackers/.test(text($('.foot')) || ''))
check('footer: sitemap + CV links', $$('.foot__base a').some((a) => a.getAttribute('href') === 'sitemap.xml') && $$('.foot__base a').some((a) => a.getAttribute('href') === 'cv.html'))
check('reveal: observers registered on real nodes', $$('[data-reveal]').length >= 18, String($$('[data-reveal]').length))
check('skip link points into the page', $('.skiplink')?.getAttribute('href') === '#work')

/* — tally — */
let pass = 0
for (const r of results) {
  if (r.ok) pass += 1
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.extra ? `  → ${r.extra}` : ''}`)
}
console.log(`\n${pass}/${results.length} checks passed`)
process.exit(pass === results.length ? 0 : 1)
