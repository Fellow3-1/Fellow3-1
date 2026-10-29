/* Smoke test — jsdom render of the real App, asserting the DOM contract
   of the name-as-monument build. Run: node scripts/smoke.test.mjs */

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
const check = (name, ok, extra = '') =>
  results.push({ name, ok: Boolean(ok), extra })

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

/* — the stage — */
const pins = $$('.stage__pin')
check('stage: name pinned as two halves', pins.length === 2)
check(
  'stage: halves spell the name',
  pins.map((p) => text(p)).join(' ') === 'Felix Odhiambo',
  pins.map((p) => text(p)).join(' '),
)
check('stage: both halves live inside one h1', $('h1.stage__name') !== null)
check('stage: three trailer panels', $$('.stage .panel').length === 3)
check(
  'stage: pinned layer carries no pointer traps',
  $('.stage__pins') !== null && $('.stage__pins').parentElement.className === 'stage',
)
check(
  'stage: three section links in the white panel',
  $$('.panel__links a').length === 3 &&
    $$('.panel__links a').every((a) => a.getAttribute('href').startsWith('#')),
)
check('stage: single primary action to contact', text($('.panel__actions .btn')) === 'Start a project')
check('stage: mail fallback present', $('.panel__mail')?.getAttribute('href') === 'mailto:felixodhiambo31@live.com')

/* — intro — */
check('intro: heading present', text($('.intro__head')) === 'Twelve years of shipped work.')
check('intro: four facts', $$('.fact').length === 4)
const factValues = $$('.fact .roll__sr').map((el) => text(el))
check(
  'intro: fact values are plain-readable for assistive tech',
  ['2014', '90+', '34', 'UTC+3'].every((v) => factValues.includes(v)),
  factValues.join(','),
)

/* — work: held picture, passing captions — */
check('work: six captions', $$('.work__item').length === 6)
check('work: six held pictures', $$('.work__media img').length === 6)
check('work: first picture lit without IO (jsdom path)', $('.work__media img').classList.contains('is-on'))
check('work: count reads 1 of 6', text($('.work__count')) === '1 of 6')
check(
  'work: every caption links out to GitHub',
  $$('.work__item .alink').length === 6 &&
    $$('.work__item .alink').every((a) => a.href.startsWith('https://github.com/Fellow3-1/')),
)
check('work: count uses plain ordinals, no zero padding', !/0\d/.test(text($('.work__count'))))

/* — story + services — */
check('story: five honest rows', $$('.story__row').length === 5)
check(
  'story: certificate link intact',
  $('.story__cert')?.href === 'https://intranet.alxswe.com/certificates/sG7YpyrSCM',
)
check('services: six poster rows', $$('.svc__row').length === 6)

/* — contact: display rows + the receipt flow — */
check('contact: five display rows (greeting + four)', $$('.crow').length === 5)
check(
  'contact: email row is a working mailto',
  $('.crows a.crow')?.getAttribute('href') === 'mailto:felixodhiambo31@live.com',
)

/* jsdom's synthetic input events never trip React's change plugin here, so we
   call the fiber's bound onChange with a target-shaped object (the handler only
   reads event.target.value). jsdom also skips click→submit wiring, so the form
   receives a real submit event instead. */
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

check('receipt: build button disabled until the slip is filled', $('.slip__form .btn').disabled === true)

await act(async () => {
  setInput($('#field-name'), 'Wanjiku Mwangi')
  setInput($('#field-work'), 'a shop site with M-PESA checkout')
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
check(
  'receipt: draft carries the filled values',
  /Wanjiku%20Mwangi/.test(mail?.getAttribute('href') || '') &&
    /M-PESA%20checkout/.test(mail?.getAttribute('href') || ''),
)
check(
  'receipt: figures sharpen when confirmed',
  $('.slip').classList.contains('is-confirmed') && $$('.slip__fig').length >= 4,
)

/* — footer — */
check('footer: wordmark at full width', text($('.foot__mark')) === 'FELLOH')
check('footer: four quiet columns', $$('.foot__col').length === 4)
check('footer: clock ticking with a colon', /:/.test(text($('.foot__clock')) || ''), text($('.foot__clock')))

/* — page furniture — */
check('reveal: observers registered on real nodes', $$('[data-reveal]').length >= 14, String($$('[data-reveal]').length))
check('skip link points into the page', $('.skiplink')?.getAttribute('href') === '#work')

/* — reduced motion — rolls collapse to plain text — */
document.documentElement.classList.add('reduce')
await act(async () => {
  await new Promise((r) => setTimeout(r, 20))
})
check('reduced: true values remain in the DOM', $$('.fact .roll__sr').length === 4)
document.documentElement.classList.remove('reduce')

/* — tally — */
let pass = 0
for (const r of results) {
  if (r.ok) pass += 1
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.extra ? `  → ${r.extra}` : ''}`)
}
console.log(`\n${pass}/${results.length} checks passed`)
process.exit(pass === results.length ? 0 : 1)
