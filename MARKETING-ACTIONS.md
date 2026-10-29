# Visibility console log

What was wired into the site, and the console steps only the account owner can do.
Date of this run: 2026-10-30.

## Already wired (in code, committed)

- [x] robots meta: `index, follow, max-image-preview:large, max-snippet:-1`
- [x] canonical URL + og:url + og:type=profile + profile:first/last/username
- [x] Open Graph image with absolute URL, dimensions and alt text (1200×630)
- [x] Twitter card: summary_large_image, title/description/image/alt
- [x] JSON-LD graph: Person (with sameAs GitHub/X, knowsAbout skills), ProfilePage,
      WebSite, ItemList of three BlogPosting entries, and FAQPage matching the
      visible FAQ section word for word
- [x] FAQ section with question-format headings (AEO: answer engines quote these)
- [x] `llms.txt` with citable facts and section map
- [x] `robots.txt` explicitly allowing GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
      PerplexityBot, Google-Extended, Bingbot
- [x] RSS feed (`feed.xml`) for the three writing posts + `<link rel="alternate">`
- [x] Sitemap with `xmlns:image` entries + `lastmod`
- [x] `site.webmanifest` for install identity
- [x] `humans.txt`
- [x] Share-intent links (X, LinkedIn) on every writing post
- [x] Keyword-bearing title/description (M-PESA, Android, Nairobi, engagement types)
- [x] Zero trackers kept as a privacy/marketing feature (stated on the site)

## Console steps (owner only; nothing here can be done without your accounts)

1. **Google Search Console** · https://search.google.com/search-console
   - Add property: `https://fellow3-1.github.io/Fellow3-1/` (URL-prefix).
   - Choose "HTML tag" verification, copy the token, paste it into the commented
     `<meta name="google-site-verification">` in `index.html`, uncomment, rebuild
     (`npm run build:pages`), push, then click Verify.
   - Sitemaps → submit: `sitemap.xml`.
   - URL Inspection → paste the homepage URL → "Request indexing".
2. **Bing Webmaster Tools** · https://www.bing.com/webmasters
   - "Import from Google Search Console" (one click) or the same meta flow for
     `msvalidate.01`.
3. **Rich Results Test** · https://search.google.com/test/rich-results
   - Paste the URL: expect detections for WebSite, ProfilePage/Person, BlogPosting,
     FAQPage, Image metadata. Screenshot the green ticks for your records.
4. **Social preview check** · paste the URL into https://www.opengraph.xyz (or the X
   composer) and confirm the og image, title and description render.
5. **PageSpeed Insights** · https://pagespeed.web.dev · aim: 95+ mobile; this build
   ships ~250 kB JS / 78 kB gz with lazy images, so it should sit near the ceiling.

## Cadence that moves the metrics

- Publish one more short technical note per month (add to `writing` in
  `src/data/content.js` AND to `feed.xml`, bump `lastmod` in `sitemap.xml`).
- When the FAQ changes in `content.js`, mirror it in the FAQPage JSON-LD in
  `index.html` (rich results require structured data to match visible content).
- The snake runs itself: on its own workflow landing, on demand, and every 12 hours. If
  the section shows the snapshot instead, open Actions → "Generate snake animation" →
  Run workflow and check the run log.
- Ask real references for one quotable sentence each; swap the "on request" lines
  only when the quote is real and anonymised by role.
- Quarterly: review GSC Performance queries; add the questions people used to find
  you as new FAQ items. That loop is the whole AEO game.
