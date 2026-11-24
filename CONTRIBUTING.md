# Contributing

This repository is two things at once: the source of the portfolio at
<https://fellow3-1.github.io/Fellow3-1/>, and the GitHub profile README. The
profile README is the only file here that is written for GitHub's profile page;
everything else builds the site.

## Prerequisites

- Node.js `^20.19.0 || >=22.12.0` (`.nvmrc` pins 22; Vite 8 refuses older lines)
- npm 10+

```bash
npm ci
npm run dev        # http://localhost:5173
```

## Commands

| command | what it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run lint` | ESLint over `src/`, `scripts/` and the config |
| `npm test` | jsdom + React smoke suite; reads `dist/` if present, else `docs/` |
| `npm run build` | feed, sitemap, token sync, Vite build, note/case-study/404 pages |
| `npm run build:pages` | `build` plus a clean copy of `dist/` into `docs/` |
| `npm run check` | lint → build:pages → test, the same sequence CI runs |
| `npm run feeds` | regenerate `public/feed.xml` and `public/sitemap.xml` |
| `npm run sync` | regenerate the token block in `public/assets/post.css` |
| `npm run og` | regenerate `public/assets/og/*.png` (needs ImageMagick) |

## Where things live

- `src/data/content.js` — **all public copy**. Projects, infrastructure, writing,
  FAQ, contact labels and the case study. If a claim appears on the site, it is
  here. `src/data/site.js` is the single definition of the deployed origin.
- `src/components/` — one file per section. `Contact.jsx` owns the form rules
  (`validateDraft`, `deliver`) and exports them so the smoke test can exercise
  the real code paths.
- `scripts/` — the static-site generator and its helpers. `build-posts.mjs`
  writes one page per note, the case study, the `/writing/` and `/case-study/`
  indexes and `404.html`. `build-feeds.mjs` writes the RSS feed and sitemap.
  `sync-post-css.mjs` copies the design tokens from `src/index.css` into
  `public/assets/post.css`; `jsonld.mjs` builds the homepage structured data
  from the content module.
- `public/` — static assets and the generated feed/sitemap. `post.css` is the
  stylesheet for standalone note pages and is not processed by Vite.
- `docs/` — **the committed production build GitHub Pages serves**. Never edit
  it by hand; run `npm run build:pages` and commit the result.
- `supabase/migrations/` — the contact table and its hardening. Apply them in
  order in the Supabase SQL editor.

## Generated files

These are build outputs. Editing them by hand is overwritten on the next build:

- `dist/` (gitignored)
- `docs/`
- `public/feed.xml`, `public/sitemap.xml`
- the block between `/* tokens:sync:start */` and `/* tokens:sync:end */` in
  `public/assets/post.css`
- the JSON-LD `<script>` in the built `index.html` (the source carries only the
  `<!--structured-data-->` placeholder)

## The deploy model

GitHub Pages is configured as **Deploy from a branch → `main` / `docs`**, so
`docs/` is the live site. CI rebuilds it and fails the run if the committed copy
is stale:

1. `npm run build:pages` regenerates `docs/` from `dist/`.
2. `git diff --quiet -- docs` must be empty.

The workflow also has a `deploy` job that uploads `dist/` as a Pages artifact.
It is the mirror that makes switching the Pages source to *GitHub Actions* a
settings-only change. Until that switch is made, `docs/` is authoritative.

If you change anything under `src/`, `public/` or the build scripts, run
`npm run build:pages` before committing, or the stale-docs gate will fail.

## Content rules

The site's premise is that nothing private is published. Keep it that way:

- no employer names, employment dates, client identities, private screenshots,
  infrastructure diagrams, credentials or internal records;
- no invented metrics or testimonials; if a claim cannot be checked from a public
  repository, it does not go on the page;
- the FAQ, `public/llms.txt` and the generated JSON-LD must agree with the copy
  in `content.js`. The smoke test checks the generated output, not a hand copy.

## Tests

`scripts/smoke.test.mjs` bundles `App.jsx` and `Contact.jsx` with esbuild,
renders them in jsdom and asserts on the real DOM. It also checks the generated
feed, sitemap, note pages, 404 page and the committed Pages build.

Add a check by pushing `{ name, ok }` through `check(name, ok)`. Prefer asserting
on rendered text or an attribute over implementation details. The suite runs in
CI after `build:pages`, so `dist/` exists; locally it falls back to `docs/` if
you have not built yet.

## Contact form and database

The browser holds a Supabase **publishable** key and can only insert rows. RLS
denies select/update/delete to `anon` and `authenticated`; the table also has
check constraints and a per-address rate limit. `supabase/migrations/` contains:

- `20261111_portfolio_messages.sql` — table, insert-only policy, rate-limit trigger
- `20261124_message_hardening.sql` — `page` constraint, `read_at` + a purge routine
  that matches the privacy copy (closed conversations after 30 days, unread after
  90), a case-insensitive rate limit, supporting indexes, optional pg_cron schedule

To point a local build at a different project, copy `.env.example` to
`.env.local`. Never commit a service-role or secret key; the publishable key is
public by design and is safe to keep in the bundle.

## Pull requests

- Keep `docs/` in sync with `src/` (run `npm run build:pages`).
- Run `npm run check` before pushing.
- Describe the user-visible change; if it is a fix, say what it fixes and how
  you verified it.
