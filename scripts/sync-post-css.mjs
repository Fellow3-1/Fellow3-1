import { readFileSync, writeFileSync } from 'node:fs'

/* `public/assets/post.css` is the stylesheet for the generated note pages. It
   is not processed by Vite, so it cannot import the tokens from `src/index.css`.
   Before this script the two token blocks were copied by hand and had drifted:
   post.css was missing nine custom properties and the Inter fallback face, so
   links, chips and focus rings rendered differently on note pages than on the
   main sheet.

   This copies the `:root` and dark-theme blocks verbatim, between markers, and
   runs before every build. `npm test` fails if the blocks drift again. */

const indexPath = 'src/index.css'
const postPath = 'public/assets/post.css'

const index = readFileSync(indexPath, 'utf8')
const post = readFileSync(postPath, 'utf8')

const root = index.match(/:root\s*\{[^}]*\}/)
const dark = index.match(/\[data-theme='dark'\]\s*\{[^}]*--paper:[^}]*\}/)

if (!root) throw new Error(`no :root block found in ${indexPath}`)
if (!dark) throw new Error(`no dark theme block with --paper found in ${indexPath}`)

const START = '/* tokens:sync:start — generated from src/index.css by scripts/sync-post-css.mjs */'
const END = '/* tokens:sync:end */'
const block = `${START}
${root[0]}

${dark[0]}
${END}`

const marked = /\/\* tokens:sync:start[\s\S]*?\/\* tokens:sync:end \*\//

const postRoot = post.match(/:root\s*\{[^}]*\}/)
const postDark = post.match(/\[data-theme='dark'\]\s*\{[^}]*--paper:[^}]*\}/)

if (!postRoot || !postDark) throw new Error(`no token blocks found in ${postPath}`)

let next
if (marked.test(post)) {
  next = post.replace(marked, block)
} else {
  /* first run: the hand-maintained blocks are where the marker goes */
  next = post.replace(postRoot[0], block).replace(postDark[0], '')
}

if (next === post) {
  console.log('post.css tokens already in sync')
} else {
  writeFileSync(postPath, next)
  console.log('post.css tokens synced from src/index.css')
}
