import { cpSync, rmSync } from 'node:fs'

/* The committed `docs/` directory is what GitHub Pages actually serves
   (Deploy from a branch -> main / docs). This replaces the old
   `rm -rf docs && cp -a dist/. docs` shell pipeline, which does not run on
   Windows and silently keeps files that no longer exist in `dist/`. */

rmSync('docs', { recursive: true, force: true })
cpSync('dist', 'docs', { recursive: true })
console.log('docs/ refreshed from dist/')
