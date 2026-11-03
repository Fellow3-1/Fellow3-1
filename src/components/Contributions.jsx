import { useEffect, useState } from 'react'
import { brand } from '../data/content.js'
import { useTheme } from '../theme.js'

/* The classic contribution snake. Two sources, in order of preference:
   1. the `output` branch, rebuilt twice a day by .github/workflows/snake.yml
      through Platane/snk (animated, always fresh);
   2. the snapshot committed at the repo root, which renders immediately and
      keeps rendering if Actions is ever paused.
   Only if both are unreachable does the section admit it and point at the
   real graph. */

/* light and dark variants, so the grid dresses to the page theme */
const SNAKE = {
  light: 'https://raw.githubusercontent.com/Fellow3-1/Fellow3-1/output/github-contribution-grid-snake.svg',
  dark: 'https://raw.githubusercontent.com/Fellow3-1/Fellow3-1/output/github-contribution-grid-snake-dark.svg',
}
const SNAPSHOT = {
  light: 'https://raw.githubusercontent.com/Fellow3-1/Fellow3-1/main/github-snake.svg',
  dark: 'https://raw.githubusercontent.com/Fellow3-1/Fellow3-1/main/github-snake-dark.svg',
}

export default function Contributions() {
  const [theme] = useTheme()
  const [errored, setErrored] = useState(false)
  const [snapFailed, setSnapFailed] = useState(false)

  /* a theme change resets the fallback ladder back to the fresh source */
  useEffect(() => {
    setErrored(false)
    setSnapFailed(false)
  }, [theme])

  const src = errored ? SNAPSHOT[theme] : SNAKE[theme]
  const failed = errored && snapFailed
  const step = () => {
    if (!errored) return setErrored(true)
    setSnapFailed(true)
  }

  return (
    <section className="section" id="contributions">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 06 · contributions
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
      </div>
    </section>
  )
}
