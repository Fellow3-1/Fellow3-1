/* Smoke test — jsdom render of the real App, asserting the DOM contract
   of the light Felloh 3.1 product landing. Run: node scripts/smoke.test.mjs */

import { JSDOM } from 'jsdom'
import React from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'

/* bundle the real components once, then render them in jsdom */
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

/* — brand carried from GitHub — */
check('brand: page named after the GitHub handle', text($('.hero__title')) === 'Felloh 3.1')
check('brand: kicker ties handle to the person', /Felix Odhiambo is Fellow3-1/.test(text($('.badge')) || ''))
check('brand: nav brand reads Felloh 3.1', text($('.nav__brand')).includes('Felloh 3.1'))

/* — nav — */
check('nav: four section links', $$('.nav__links a').length === 4)
check('nav: pill CTA to contact', $('.nav .pill')?.getAttribute('href') === '#contact')

/* — hero band with real shots + the muse — */
check('hero: two CTAs', $$('.hero__ctas a').length === 2)
check('hero: laptop shot carries a real project still', $('.shot--lap img')?.src.includes('work-foundations'))
check('hero: phone shot carries a real project still', $('.shot--phone img')?.src.includes('work-tovuti'))
check(
  'hero: the joker muse is returned',
  $('.shot--muse img')?.src.includes('HD-Joker-Wallpapers-scaled.jpg'),
  $('.shot--muse img')?.getAttribute('src'),
)
check('hero: muse card is labelled', /muse/i.test(text($('.shot--muse figcaption')) || ''))

/* — highlights incl. the muse tile — */
check('highlights: four tiles', $$('.tile').length === 4)
check('highlights: plum muse tile present', $('.tile--plum img')?.src.includes('HD-Joker'))
check('highlights: underscore voice kept', $$('.tile h3').some((h) => text(h).endsWith('_')))

/* — numbers — */
check('numbers: four cards', $$('.num').length === 4)
const numValues = $$('.num .roll__sr').map((el) => text(el))
check(
  'numbers: values plain-readable for assistive tech',
  ['90+', '34', '12', 'UTC+3'].every((v) => numValues.includes(v)),
  numValues.join(','),
)

/* — work cards — */
check('work: six cards', $$('.card').length === 6)
check(
  'work: every card links out to GitHub',
  $$('.card .alink').length === 6 && $$('.card .alink').every((a) => a.href.startsWith('https://github.com/Fellow3-1/')),
)
check('work: every card shows a real screenshot', $$('.card figure img').length === 6)

/* — timeline — */
check('timeline: five honest rows', $$('.tline__row').length === 5)
check(
  'timeline: certificate link intact',
  $('.tline__org a')?.href === 'https://intranet.alxswe.com/certificates/sG7YpyrSCM',
)

/* — contact + receipt flow — */
check('contact: studio CTA heading', /Bring Felloh 3\.1/.test(text($('.cta .head')) || ''))
check('contact: slip branded with the muse icon', $('.slip__brand img')?.src.includes('favicon-joker'))
check('receipt: build button disabled until filled', $('.slip__form .pill').disabled === true)

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
  setInput($('#field-work'), 'a shop site with M-PESA checkout')
  setInput($('#field-reach'), 'wanjiku@company.co.ke')
  await new Promise((r) => setTimeout(r, 30))
})

check('receipt: button unlocks once filled', $('.slip__form .pill').disabled === false)

await act(async () => {
  $('.slip__form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }))
  await new Promise((r) => setTimeout(r, 40))
})

check('receipt: CONFIRMED block prints', $('.slip__confirm') !== null)
const mail = $('.slip__confirm a')
check('receipt: mail draft is a mailto', mail?.getAttribute('href').startsWith('mailto:felixodhiambo31@live.com'))
check(
  'receipt: draft carries the filled values',
  /Wanjiku%20Mwangi/.test(mail?.getAttribute('href') || '') && /M-PESA%20checkout/.test(mail?.getAttribute('href') || ''),
)
check(
  'receipt: figures sharpen when confirmed',
  $('.slip__card').classList.contains('is-confirmed') && $$('.slip__fig').length >= 4,
)

/* — footer — */
check('footer: wordmark reads Felloh 3.1', text($('.foot__mark')).replace(/\s+/g, ' ') === 'Felloh 3.1')
check('footer: four quiet columns', $$('.foot__col').length === 4)
check('footer: clock ticking with a colon', /:/.test(text($('.foot__clock')) || ''), text($('.foot__clock')))

/* — page furniture — */
check('reveal: observers registered on real nodes', $$('[data-reveal]').length >= 20, String($$('[data-reveal]').length))
check('skip link points into the page', $('.skiplink')?.getAttribute('href') === '#work')

/* — reduced motion — */
document.documentElement.classList.add('reduce')
await act(async () => {
  await new Promise((r) => setTimeout(r, 20))
})
check('reduced: true values remain in the DOM', $$('.num .roll__sr').length === 4)
document.documentElement.classList.remove('reduce')

/* — tally — */
let pass = 0
for (const r of results) {
  if (r.ok) pass += 1
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.extra ? `  → ${r.extra}` : ''}`)
}
console.log(`\n${pass}/${results.length} checks passed`)
process.exit(pass === results.length ? 0 : 1)
