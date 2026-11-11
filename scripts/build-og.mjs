import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { writing, caseStudy } from '../src/data/content.js'

/* Social cards for the standalone pages: 1200x630, dark sheet, the site
   gradient as a hairline, Inter for the type. Generated with ImageMagick
   from the repository's own font copies (scripts/fonts, SIL OFL 1.1), so
   the cards are reproducible instead of mystery binaries.

   Run with `npm run og` after adding or renaming a note. */

const OUT = 'public/assets/og'
const FONTS = 'scripts/fonts'
const INK = '#f3edf2'
const MUTED = '#a795a6'
const ACCENT = '#ff5796'
const WORK = mkdtempSync(join(tmpdir(), 'og-'))

const convert = (args) => execFileSync(process.env.MAGICK || 'convert', args, { stdio: 'pipe' })

mkdirSync(OUT, { recursive: true })

/* the brand gradient, built from the same three stops the CSS uses */
convert(['-size', '600x6', 'gradient:#ff5796-#8650a0', join(WORK, 'a.png')])
convert(['-size', '600x6', 'gradient:#8650a0-#3bdb84', join(WORK, 'b.png')])
convert([join(WORK, 'a.png'), join(WORK, 'b.png'), '+append', join(WORK, 'grad.png')])

const card = ({ slug, kicker, title, line }) => {
  const out = join(OUT, `${slug}.png`)
  const type = join(WORK, `${slug}-title.png`)

  /* the title wraps inside a 1040px column */
  convert([
    '-background', 'none',
    '-fill', INK,
    '-font', join(FONTS, 'Inter-500.ttf'),
    '-pointsize', '64',
    '-size', '1040x280',
    `caption:${title}`,
    type,
  ])

  convert([
    '-size', '1200x630', 'xc:#0d060b',
    join(WORK, 'grad.png'), '-geometry', '+0+0', '-composite',
    '-font', join(FONTS, 'Inter-600.ttf'),
    '-pointsize', '24',
    '-fill', ACCENT,
    '-annotate', '+80+132', kicker.toUpperCase(),
    type, '-geometry', '+80+180', '-composite',
    '-font', join(FONTS, 'Inter-400.ttf'),
    '-pointsize', '24',
    '-fill', MUTED,
    '-annotate', '+80+560', line,
    '-gravity', 'SouthEast',
    '-font', join(FONTS, 'Inter-500.ttf'),
    '-pointsize', '22',
    '-fill', '#3bdb84',
    '-annotate', '+80+52', 'fellow3-1.github.io',
    '-depth', '8',
    '-strip',
    out,
  ])

  console.log(`og card: ${out}`)
}

for (const post of writing.posts) {
  card({
    slug: post.slug,
    kicker: `Felloh 3.1 · ${post.minutes}`,
    title: post.title,
    line: post.blurb,
  })
}

card({
  slug: caseStudy.slug,
  kicker: `Felloh 3.1 · ${caseStudy.kicker}`,
  title: caseStudy.title,
  line: `${caseStudy.minutes} · how this site is built`,
})
