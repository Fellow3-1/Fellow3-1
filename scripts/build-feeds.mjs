import { writeFileSync } from 'node:fs'
import { writing, caseStudy } from '../src/data/content.js'

/* The feed and the sitemap are generated from the content module, so a note
   cannot exist in one place and not the other. Run before every build
   (`npm run build` does it for you). */

const SITE = 'https://fellow3-1.github.io/Fellow3-1'
const HOME_UPDATED = process.env.HOME_UPDATED || '2026-11-11'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/* RSS wants RFC 822; the notes go out at 09:00 EAT, as they always have */
const rssDate = (iso) => {
  const d = new Date(`${iso}T00:00:00Z`)
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${DAYS[d.getUTCDay()]}, ${day} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()} 09:00:00 +0300`
}

const xml = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Felloh 3.1 · writing</title>
    <link>${SITE}/#writing</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Short technical notes from a software and IT systems engineer in Nairobi. Long on pitfalls, short on ceremony.</description>
    <language>en-KE</language>
    <lastBuildDate>${rssDate(HOME_UPDATED)}</lastBuildDate>
${writing.posts
  .map(
    (post) => `    <item>
      <title>${xml(post.title)}</title>
      <link>${SITE}/writing/${post.slug}/</link>
      <guid>${SITE}/writing/${post.slug}/</guid>
      <pubDate>${rssDate(post.published || HOME_UPDATED)}</pubDate>
      <description>${xml(post.blurb)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`

writeFileSync('public/feed.xml', feed)
console.log(`feed: ${writing.posts.length} items`)

const images = [
  ['og.jpg', 'Felloh 3.1 · Felix Odhiambo, software and IT systems engineer in Nairobi'],
  ['hero-skyline-day.jpg', 'The Nairobi skyline on a clear day'],
  ['HD-Joker-Wallpapers-scaled.jpg', 'Low-poly Joker, the site muse'],
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${HOME_UPDATED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
${images
  .map(
    ([file, title]) => `    <image:image>
      <image:loc>${SITE}/assets/${file}</image:loc>
      <image:title>${xml(title)}</image:title>
    </image:image>`
  )
  .join('\n')}
  </url>
${writing.posts
  .map(
    (post) => `  <url>
    <loc>${SITE}/writing/${post.slug}/</loc>
    <lastmod>${post.published || HOME_UPDATED}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`
  )
  .join('\n')}
${
  caseStudy
    ? `  <url>
    <loc>${SITE}/case-study/${caseStudy.slug}/</loc>
    <lastmod>${caseStudy.date}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.8</priority>
  </url>`
    : ''
}
</urlset>
`

writeFileSync('public/sitemap.xml', sitemap)
console.log(`sitemap: ${writing.posts.length + 1 + (caseStudy ? 1 : 0)} urls`)
