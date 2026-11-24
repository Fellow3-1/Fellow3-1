# Portfolio review · Felloh 3.1

Reviewed 11 November 2026 on `arena/1ca319e1-fellow3-1` (branched from `8a5b24d`).

**Short verdict:** the craft was already above most developer portfolios. The weak points
were not taste — they were **what actually shipped**, **what happened after someone tried to
contact you**, and **how much the first screen cost to download**. Everything below is
either fixed in this branch or documented with the reason it could not be.

Run `npm test` (115 checks) and `npm run build:pages`, then `npm run preview`.

---

## 1 · Fixed

### 1.1 The live site was serving an older build than the repo

Pages is configured as *Deploy from a branch → `main` / `docs`*, and `docs/` is a committed
build. That build had **7 numbered sections** and an old `<title>`; `src/` on `main` had
**9**. Every improvement merged since then — infrastructure, the reworked about section,
testimonials — never reached the live site.

`docs/` is rebuilt, and the Pages workflow now **fails the build when the committed copy is
stale**, so this cannot happen again silently.

> Switching Pages to *GitHub Actions* would let `docs/` be deleted entirely. That needs
> repository admin (`PUT /repos/…/pages` returned 403 for this integration), so the guard is
> the interim fix. See §3.1.

### 1.2 The contact form had no delivery path — now it does

Mail-to-only loses everyone reading mail in a browser tab. The form now:

- validates on submit (the button is never silently disabled), with announced errors,
  `aria-invalid`, `aria-describedby`, focus moved to the first bad field;
- posts `{ name, brief, email, page }` to Supabase table **`portfolio_messages`** — the
  publishable key travels on `apikey` only, since it is not a JWT and PostgREST rejects it
  as a bearer token;
- keeps the local email draft as a first-class fallback, and says plainly when delivery
  failed rather than pretending;
- carries a honeypot field (offscreen, out of the tab order) that silently succeeds without
  sending anything.

Server side (`supabase/migrations/20261111_portfolio_messages.sql`):

| control | effect |
| --- | --- |
| RLS: insert policy only, for `anon` | the public key can add a row and nothing else |
| `revoke all` + `grant insert` | reads are denied at the privilege level too — verified: `select` as `anon` returns `42501 permission denied` |
| check constraints | name 2–80, brief 4–800, email shaped like an address |
| trigger `portfolio_rate_limit` | max 3 messages per address per 15 minutes |

The privacy copy, the FAQ schema and `llms.txt` now describe exactly this, including
deletion when the conversation ends.

### 1.3 The testimonials were drafts presented as quotes

`content.js` labelled them `DRAFT QUOTES`, yet the page published three anonymous
endorsements. On a site whose argument is verifiable claims, that was the one place where
the content contradicted the premise. The section is now **first-person commitments**
(communication, handover, change), numbered like the log, with references offered on
request — honest, and the same length on the page.

### 1.4 One piece of work at depth

New case study: **“A Portfolio That Refuses to Invent Numbers”** — the rule, what was cut
for it, how the site is built, what broke (including this site's own deploy drift and the
223 KB hero), how the promises are checked, and what is still unfinished. It is about work
that can be described in full without touching anyone else's data. The prose is
first-person and deliberately dash-free; both are now enforced by the smoke test.

- page: `/case-study/a-portfolio-that-refuses-to-invent-numbers/`
- linked from the work section as a dark field-note card
- its own `Article` + `BreadcrumbList` JSON-LD and social card

### 1.5 The hero on small screens

The strip was a 260 px band of a portrait photo, so a phone got a letterboxed slice with
both ends of the skyline cut off.

- art-directed mobile sources (`hero-skyline-day-mobile.*`, `window-nairobi-mobile.*`),
  3:2 crops that keep the whole skyline / interchange;
- under 700 px the image keeps its own 3:2 shape instead of a fixed 260 px height;
- 71 KB webp (day) and 61 KB (night) instead of zooming the desktop band;
- the nav drops its live clock under 700 px so the bar stops wrapping into the hero.

Desktop is unchanged: the 928×360 / 1376×360 band, 44 KB and 74 KB.

### 1.6 Weight and the critical path

- **Inter is self-hosted** — latin subset, 300/400/500, 24 KB each, one preload. Two
  `fonts.googleapis.com` preconnects, a render-blocking stylesheet and a third-party
  round trip are gone from both the main page and the generated note pages.
- Six unreferenced assets removed (~480 KB), and the hero cropped to the band actually
  rendered. `public/assets` is 1.7 MB — still down from 2.0 MB after adding the mobile
  crops, the social cards and the fonts.
- Every `<img>` carries intrinsic `width`/`height`; the strip is `loading="eager"` (it was
  preloaded *and* lazy, so the preload did nothing).

### 1.7 Generated feed, sitemap and social cards

`public/feed.xml` and `public/sitemap.xml` are now generated from `content.js`
(`npm run feeds`, wired into `prebuild`), so a note cannot exist in one and not the other.
The case study and all three notes are listed.

`npm run og` regenerates 1200×630 cards from the repository's own Inter copies
(`scripts/fonts`, SIL OFL 1.1) and ImageMagick — real share images instead of the one
generic `og.jpg` for every URL.

### 1.8 Shell, semantics and accessibility

- 2.5 s watchdog: a failed bundle can no longer leave a blank sheet of paper.
- Contrast-safe focus ring (`#7b3f97` on paper ≈ 5.2:1; pink was ≈ 2.9:1), including the
  theme toggle and macOS pills, which used a 35 %-alpha aqua glow.
- Reduced-motion users no longer get smooth-scrolling anchor jumps.
- `lang="en-KE"` on every page; the channel links are
  a real `<nav aria-label="Channels">`, the skip target is focusable, and the mobile nav row
  fades at its right edge.
- `SoftwareSourceCode` entries for the three public repositories.

### 1.9 Section 03 no longer erases itself on hover or click

The infrastructure cards animate in through `useReveals`, which added an `is-in`
class to `[data-reveal]` elements from outside React. The same cards also have a
React-owned `className` that gains `is-active` when hovered or selected. React
rewrites the whole `class` attribute when that prop changes, so the first hover
or click deleted `is-in`, left the card at `opacity: 0`, and the observer had
already stopped watching it — the four cards stayed invisible until a reload.

The reveal state is now `data-reveal-in`, an attribute React never writes, and
every reveal selector in `index.css` keys off it. Five checks were added: hover
on one card, hover moving to another, pin, unpin, and a source guard that fails
if reveal visibility ever returns to a React-owned class.

### 1.10 Tests

**29 → 75 checks**, including: the request the browser actually makes (URL, method, key
headers, exact body), the failure path falling back to the draft, the honeypot, the receipt
reporting delivery, the reframed section, and every note appearing in the feed and sitemap.

---

## 2 · Deliberately not done

- **Rebuilding the site without React.** 93 KB gzip is fine for this page, and the note
  pages already prove the static pipeline works. It would be a rewrite for a number, not a
  user.
- **Inventing post dates or metrics.** The three notes carry the date the feed already
  published (`2025-11-03`); nothing else was invented to fill a template.

---

## 3 · Still open

### 3.1 Pages source needs an admin

Switching Pages to *GitHub Actions* (`build_type: workflow`) would let `docs/` disappear and
remove the drift risk at the root. The API call returns **403 Resource not accessible by
integration** — the connected GitHub app lacks Pages administration. Do it once in
*Settings → Pages → Source*, then delete `docs/`, drop `build:pages`, and remove the guard
step from the workflow.

### 3.2 Optional: mail notification

A new row sits in the database until you open the dashboard. If you want an email, add a
`pg_net` trigger (or a scheduled Edge Function) that calls your mail provider on insert.
Not added here because it needs a provider key and an address to send from.

### 3.3 Real quotes

The commitments section is the honest placeholder. When two people agree to be quoted, swap
the three items and keep role-only attribution — the layout needs no change.

---

## 4 · Verify

```bash
npm ci
npm run lint          # eslint over src, scripts and config
npm test              # 115 checks
npm run build         # generates feed, sitemap, note pages, case study, 404
npm run build:pages   # refreshes the committed Pages build in docs/
npm run preview
```

Tab through the preview: skip link → nav → hero → project details → form. Submit it empty
for the error path; submit it filled for delivery, the receipt and both exits.


---

## 5 · 2026-11-24 follow-up

A second review found the remaining gaps and closed them:

- **Writing posts misused two fields.** `date` held the category label (`Guide`)
  and `minutes` held the topic (`Payments`). They are now `kind` and `tag`, and
  the note pages print the real publication date instead of the word "Guide".
- **The contact form could double-submit and report a stale "delivered".** The
  in-flight lock is a ref now, not state, and editing a draft invalidates the
  response for the old one. Non-OK replies are distinguished: 429 is `limited`,
  other 4xx is `rejected`, a network failure is `offline`.
- **The contact table accepted any `page` value and counted email quotas
  case-sensitively.** `20261124_message_hardening.sql` adds the check constraint,
  a `lower(email)` expression index, a per-address advisory lock and a
  `read_at` + purge routine behind the deletion promise.
- **No `<noscript>`, no error boundary.** A failed bundle now renders a readable
  fallback with the contact details, and a render error is caught instead of
  unmounting the page.
- **`404.html` was a byte copy of the homepage.** It is a real noindex page with
  absolute asset URLs, so it also works on nested unknown paths.
- **`/writing/` and `/case-study/` were 404s.** Both have index pages now, and
  the feed carries the case study as well as the notes.
- **The note stylesheet had drifted from the main sheet.** `npm run sync` copies
  the tokens from `src/index.css`, and the smoke test fails if they diverge.
- **The palette had no focus trap and put a button inside a listbox option.**
  The background is `inert` while it is open, Tab is trapped, and options are the
  list items themselves.
- **Infrastructure cards were click-only.** Each card now has a labelled pin
  button for keyboard users, and the domain chips announce the domain name.
- **The polaroid was 2560 px and the preload guessed the wrong theme.** It is a
  960 px crop now, and the preload is chosen after the stored theme is known.
- **The smoke test read the committed `docs/` build.** CI now builds first and
  the test reads `dist/`, so it checks the code in the commit rather than the
  artifact it is about to replace.
- **The duplicate deploy template is gone.** `docs/` is the documented source of
  truth; the workflow's `deploy` job is a mirror for when Pages moves to Actions.
