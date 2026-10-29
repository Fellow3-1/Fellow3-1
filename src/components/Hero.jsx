import { useEffect, useState } from 'react'
import { brand, hero } from '../data/content.js'
import Arrow from './Arrow.jsx'

const TYPED = 'whoami'

export default function Hero() {
  const [typed, setTyped] = useState('')

  /* one terminal keeps typing; everything else respects reduced motion */
  useEffect(() => {
    if (document.documentElement.classList.contains('reduce')) {
      setTyped(TYPED)
      return undefined
    }
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(TYPED.slice(0, i))
      if (i >= TYPED.length) window.clearInterval(id)
    }, 120)
    return () => window.clearInterval(id)
  }, [])

  const nameLetters = 'Felloh'.split('')
  const versionLetters = '3.1'.split('')

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__top">
          <div className="hero__inner">
            <p className="hero__prompt" data-reveal aria-label={`${brand.name.toLowerCase().replace(' ', '')}@nairobi ~ % ${TYPED}`}>
              <b>{brand.name.toLowerCase().replace(' ', '')}@nairobi</b> ~ %{' '}
              <span className="hero__typed">{typed}</span>
            </p>
            <h1 className="hero__name" data-reveal aria-label="Felloh 3.1">
              <span aria-hidden="true">
                {nameLetters.map((c, i) => (
                  <span className="ltr" style={{ '--i': i }} key={i}>
                    {c}
                  </span>
                ))}
              </span>{' '}
              <i aria-hidden="true">
                {versionLetters.map((c, i) => (
                  <span className="ltr" style={{ '--i': i + 7 }} key={i}>
                    {c}
                  </span>
                ))}
              </i>
            </h1>
            <p className="hero__tag" data-reveal>
              {hero.tagline}
            </p>
            <p className="hero__note" data-reveal>
              {hero.note}
            </p>
            <div className="hero__links" data-reveal>
              {hero.links.map((l) => (
                <a key={l.label} className="alink" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel={l.href.startsWith('http') ? 'noreferrer' : undefined}>
                  {l.label}
                  <Arrow />
                </a>
              ))}
            </div>
          </div>

          <figure className="polaroid" data-reveal>
            <img
              src="assets/HD-Joker-Wallpapers-scaled.jpg"
              alt="Low-poly Joker bust, the site's muse"
              loading="eager"
              decoding="async"
            />
            <figcaption>the muse_</figcaption>
          </figure>
        </div>

        <figure className="hero__strip" data-reveal>
          <img src="assets/hero-skyline-day.jpg" alt="The Nairobi skyline on a clear day" loading="lazy" decoding="async" />
          <figcaption>nairobi, daytime. The office window view, roughly · EAT UTC+3</figcaption>
        </figure>
      </div>
    </section>
  )
}
