import { useState } from 'react'
import { brand } from '../data/content.js'

/* The classic contribution snake. Two sources, in order of preference:
   1. the `output` branch, rebuilt twice a day by .github/workflows/snake.yml
      through Platane/snk (animated, always fresh);
   2. the snapshot committed at the repo root, which renders immediately and
      keeps rendering if Actions is ever paused.
   Only if both are unreachable does the section admit it and point at the
   real graph. */

const SNAKE_SRC =
  'https://raw.githubusercontent.com/Fellow3-1/Fellow3-1/output/github-contribution-grid-snake.svg'
const SNAKE_SNAPSHOT = 'https://raw.githubusercontent.com/Fellow3-1/Fellow3-1/main/github-snake.svg'

export default function Contributions() {
  const [src, setSrc] = useState(SNAKE_SRC)
  const [failed, setFailed] = useState(false)

  const step = () => {
    if (src === SNAKE_SRC) return setSrc(SNAKE_SNAPSHOT)
    setFailed(true)
  }

  return (
    <section className="section" id="contributions">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 05 · contributions
        </p>
        <h2 className="head" data-reveal>
          The contribution snake_
        </h2>
        <div className="snake macwin" data-reveal>
          <div className="macwin__chrome" aria-hidden="true">
            <span className="slip__light slip__light--red" />
            <span className="slip__light slip__light--amber" />
            <span className="slip__light slip__light--green" />
            <span className="macwin__title">contributions.app</span>
          </div>
          {failed ? (
            <p className="snake__note">
              [pending] the snake is between runs and no snapshot is reachable. The honest grid
              lives at{' '}
              <a className="alink" href={brand.repoUrl} target="_blank" rel="noreferrer">
                {brand.repo}
              </a>
              .
            </p>
          ) : (
            <img
              src={src}
              alt={`GitHub contribution snake for ${brand.handle}: the grid, animated as a snake eating commits`}
              loading="lazy"
              decoding="async"
              onError={step}
            />
          )}
        </div>
        <p className="writing__note" data-reveal>
          Served from the repo’s output branch, regenerated twice a day by{' '}
          <a className="alink" href={`${brand.repoUrl}/actions`} target="_blank" rel="noreferrer">
            the snake workflow
          </a>
          . If that branch is between runs, a committed snapshot stands in.
        </p>
      </div>
    </section>
  )
}
