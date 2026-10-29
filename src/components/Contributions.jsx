import { useState } from 'react'
import { brand } from '../data/content.js'

/* The classic contribution snake, served from the repo's `output`
   branch (built nightly by .github/workflows/snake.yml via Platane/snk).
   If the file is missing, admit it and point at the real graph. */

const SNAKE_SRC =
  'https://raw.githubusercontent.com/Fellow3-1/Fellow3-1/output/github-contribution-grid-snake.svg'

export default function Contributions() {
  const [failed, setFailed] = useState(false)

  return (
    <section className="section" id="contributions">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 05 — contributions
        </p>
        <h2 className="head" data-reveal>
          The contribution snake_
        </h2>
        <div className="snake" data-reveal>
          {failed ? (
            <p className="snake__note">
              [pending] the snake hatches after the first run of{' '}
              <a className="alink" href={`${brand.repoUrl}/actions`} target="_blank" rel="noreferrer">
                the snake workflow
              </a>{' '}
              — meanwhile the honest grid lives at{' '}
              <a className="alink" href={brand.repoUrl} target="_blank" rel="noreferrer">
                {brand.repo}
              </a>
              .
            </p>
          ) : (
            <img
              src={SNAKE_SRC}
              alt={`GitHub contribution snake for ${brand.handle} — the grid, animated as a snake eating commits`}
              loading="lazy"
              decoding="async"
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <p className="writing__note" data-reveal>
          Served from the repo’s output branch, regenerated twice a day. If it is missing, run the
          workflow once: Actions → “Generate snake” → Run workflow.
        </p>
      </div>
    </section>
  )
}
