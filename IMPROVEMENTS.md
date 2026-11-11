# Portfolio review · Felloh 3.1

Reviewed 11 November 2026 on `arena/1ca319e1-fellow3-1` (branched from `8a5b24d`).

**Short verdict:** the craft is already above most developer portfolios. The identity is
specific (engineering log + terminal + Nairobi), the copy is honest about privacy, the
markup is semantic, and there is a real test suite. The weak points are not visual taste —
they are **what actually ships**, **what happens after someone tries to contact you**, and
**how much the first screen costs to download**. Those are the three I fixed here.

---

## 1 · Fixed in this branch

### 1.1 The live site was serving an older build than the repo (highest impact)

GitHub Pages is configured as *Deploy from a branch → `main` / `docs`*, and `docs/` is a
committed build. That build had **7 numbered sections** and an old `<title>`
(`… full-stack engineer in Nairobi (M-PESA, Android, web)`) with no
`SoftwareSourceCode` schema. `src/` on `main` had **9** (infrastructure and testimonials
were added, the about section was reworked).

So every improvement merged since that build never reached `fellow3-1.github.io`. Fixed by
rebuilding Pages (`npm run build:pages`); `docs/` now matches `dist/` file-for-file.

> The workflow in `.github/workflows/portfolio-pages.yml` also uploads `dist` as a Pages
> artifact. Those two deploy paths disagree. Pick one — see §2.4.

### 1.2 The contact form could not be completed by many visitors

Before: the submit button was silently `disabled` until all three fields had two
characters, nothing said why, the email field accepted `a@b`, the only action appeared
*after* confirmation, and the whole flow ended at a `mailto:` link — which does nothing for
anyone reading mail in a browser tab. The visitor's own typed name and address were also
blurred (`filter: blur(5px)`) until confirmation, so typos could not be proofread.

Now:

- the button is always enabled; submitting runs validation and **explains what is missing**
  (`role="alert"`, `aria-invalid`, `aria-describedby`, focus moves to the first bad field);
- the address must look like an address (`you@company.com`), with per-field length caps so a
  draft can never produce a 40 KB `mailto:` URL;
- `required` and `autocomplete="email"` are set, so password managers and mobile keyboards
  do the right thing;
- the address is **always visible** in plain text under the channel pills, for people who
  would rather start the mail themselves;
- after a valid submit there are two exits side by side: **Open email draft** and **Copy
  draft** (clipboard, with an honest failure message when the browser blocks it);
- the receipt no longer blurs what the visitor typed — it dims slightly, then settles.

Still true, and still stated on the page: nothing is submitted to the site.

### 1.3 A failed bundle left a blank page

`html.js body { opacity: 0 }` and React adds `is-in` after mount. If the bundle 404s, is
blocked by an extension, or a CDN hiccups, the portfolio renders as an empty sheet forever.
Added a 2.5 s watchdog in `index.html` that reveals the page anyway. Reduced-motion users
also no longer get smooth-scrolling anchor jumps (the media query killed transitions but not
`scroll-behavior`).

### 1.4 The hero image was 80 % waste

The hero strip is a 260 px-tall band of a portrait photograph. At every viewport, CSS
`object-fit: cover` was discarding the sky above and the park below — those pixels were
downloaded and never seen.

| asset | before | after | |
| --- | ---: | ---: | --- |
| `hero-skyline-day.webp` | 223 KB | **43 KB** | −80 % |
| `window-nairobi.webp` (dark) | 118 KB | **74 KB** | −37 % |
| `hero-skyline-day.jpg` fallback | 298 KB | 64 KB | |
| `window-nairobi.jpg` fallback | 190 KB | 107 KB | |

The crop is the exact band that was already visible, so desktop composition is unchanged;
on phones the strip reads slightly tighter and keeps the skyline. The image is now
`loading="eager"` (it was preloaded in `<head>` *and* lazy — the preload had nothing to do),
and every `<img>` carries intrinsic `width`/`height` to stop layout shift.

Also removed six unreferenced assets (`hero-2.jpg`, `work-ai/foundations/logistics/vr.jpg`,
`favicon.svg`, ~480 KB). `public/assets` went from 2.0 MB to 1.1 MB, `docs/` from 1.8 MB to
1.4 MB.

### 1.5 Accessibility and semantics

- **Focus rings clear contrast.** The ring was accent pink `#ff488b` on paper `#f6f6f3`
  ≈ 2.9:1 — under the 3:1 floor for focus indicators. Now `--focus` (`#7b3f97`, ≈ 5.2:1;
  `#ff9cc2` on the dark sheet), applied consistently, including the theme toggle and the
  macOS pills, which previously used a 35 %-alpha aqua glow.
- **Landmarks:** the contact channel links are a real `<nav aria-label="Channels">` instead
  of a `div[role=navigation]`; the skip link target (`#work`) is focusable.
- **Mobile nav affordance:** the horizontally scrollable row fades at its right edge instead
  of looking clipped.
- **Forms:** error text is announced, not just coloured.

### 1.6 Search and answer engines

- `SoftwareSourceCode` entries for the three public repositories, inside the existing
  JSON-LD `@graph` — the projects were the only part of the page with no structured data.
- `og:image:type`, and `lastmod` refreshed in `sitemap.xml`.

### 1.7 Tests

`npm test` went from **29 to 46 checks**: submit is never disabled, empty submit explains
all three fields, invalid fields are flagged for assistive tech, the rules are exercised
directly (`validateDraft`), a complete draft reaches the ready state with both exits
present, plus the watchdog and the new schema.

---

## 2 · What I would change next, in priority order

### 2.1 Replace or reframe the testimonials — *decision needed*

`src/data/content.js` still labels them `DRAFT QUOTES`. Three anonymous quotes from
"a systems support colleague", "a project stakeholder" and "an operations teammate" read as
real endorsements on a site whose entire argument is *verifiable claims only*. Either swap
in consented quotes (role-only attribution works perfectly with your privacy posture), or
reframe the section as principles in your own voice until real quotes exist. This is the one
place where the page's integrity and its content disagree.

### 2.2 Give the contact form a real delivery path — *I can wire this*

Mail-only is a conversion tax: webmail users, locked-down corporate machines, and anyone on
a phone without a configured mail app simply stop at the button. A Supabase project (the
connector is available in this session) gives you:

- a `contact_messages` table with RLS that allows `INSERT` only, never `SELECT`, from the
  anon key;
- the same form posting to `/rest/v1/contact_messages`, with the current mailto flow kept as
  the fallback when the request fails;
- a honeypot field plus a per-IP rate limit in an Edge Function, so the inbox stays clean;
- the privacy line updated to say exactly what is stored and for how long.

Effort is small; the only thing I need from you is the go-ahead to create/use a project.

### 2.3 One piece of evidence at depth

The three projects are honest but small: two are libraries marked *work in progress*. A
single case study — constraint, options considered, decision, what broke, what you
instrumented — would out-argue ten more cards. It can stay privacy-safe: no client name, no
screenshots, no invented metrics, just the thinking. The writing pages already prove the
format works.

### 2.4 Collapse the two deploy paths

Right now Pages serves `main /docs` while Actions uploads `dist` as an artifact. That
ambiguity is exactly how the live site drifted a version behind. Recommended: switch Pages
to **GitHub Actions** as the source, then delete `docs/` from the repo and add it to
`.gitignore`. One source of truth, no 1.4 MB of duplicated build output, no drift.

### 2.5 Self-host Inter

Two Google Fonts preconnects and a third-party stylesheet on the critical path, for two
weights. Subsetting Inter to latin, `woff2`, with `font-display: swap` in `public/assets`
removes the external dependency and the FOUT, and makes the page work offline-first.

### 2.6 Generate the feed and sitemap

`public/feed.xml` and `public/sitemap.xml` are maintained by hand while the note pages are
generated from `content.js`. Add both to `scripts/build-posts.mjs` (with `<lastmod>` from a
date on each post) and they can never drift again.

### 2.7 Smaller items

- `lang="en-KE"` instead of `en` — you already declare `en_KE` in Open Graph.
- `<time datetime>` for post dates once posts carry real dates; `date: 'Guide'` is a tag, not
  a date.
- Per-note Open Graph images (1200×630), generated from the note title in the same build
  step.
- The 80 KB (gzip) React bundle for what is essentially a document. Fine for now; if you
  want a perfect Lighthouse score, the generated note pages show you already have a static
  pipeline.
- `:focus-visible` on the `#work` section shows an outline around the whole section when the
  skip link is used. Harmless, slightly ugly.

---

## 3 · How to verify

```bash
npm ci
npm test              # 46 checks
npm run build         # writes dist/ and the note pages
npm run build:pages   # also refreshes the committed Pages build in docs/
```

Then open the preview and tab through the page: skip link → nav → hero links → theme
toggle → project links and `<details>` → form. Submit it empty to see the error path;
fill it in to see both exits.
