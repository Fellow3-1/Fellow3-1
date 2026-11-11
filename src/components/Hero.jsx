import { useEffect, useState } from 'react'
import { brand, hero } from '../data/content.js'
import { useTheme } from '../theme.js'
import Arrow from './Arrow.jsx'

const TYPED = 'whoami'

const eatClock = new Intl.DateTimeFormat('en-KE', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: brand.tz,
})

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [clock, setClock] = useState('')
  const [theme] = useTheme()

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

  /* the "now" line carries a live Nairobi clock */
  useEffect(() => {
    const tick = () => setClock(eatClock.format(new Date()))
    tick()
    const id = window.setInterval(tick, 20000)
    return () => window.clearInterval(id)
  }, [])

  const nameLetters = 'Felloh'.split('')
  const versionLetters = '3.1'.split('')
  const night = theme === 'dark'

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
            <p className="hero__now" data-reveal>
              <span className="hero__now-dot" aria-hidden="true" />
              now · nairobi {clock || '· ·:··'} · {hero.now.status}
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
            <picture>
              <source srcSet="assets/HD-Joker-Wallpapers-scaled.webp" type="image/webp" />
              <img
                src="assets/HD-Joker-Wallpapers-scaled.jpg"
                alt="Low-poly Joker bust, the site's muse"
                width="2560"
                height="1440"
                loading="eager"
                decoding="async"
              />
            </picture>
            <figcaption>the muse_</figcaption>
          </figure>
        </div>

        {/* the strip follows the theme: skyline by day, interchange by night */}
        <figure className="hero__strip" data-reveal>
          <picture>
            <source
              srcSet={night ? 'assets/window-nairobi.webp' : 'assets/hero-skyline-day.webp'}
              type="image/webp"
            />
            <img
              src={night ? 'assets/window-nairobi.jpg' : 'assets/hero-skyline-day.jpg'}
              alt={night ? 'Nairobi’s interchange at night, light trails looping through the dark' : 'The Nairobi skyline on a clear day'}
              width={night ? 1376 : 928}
              height="360"
              loading="eager"
              decoding="async"
            />
          </picture>
          <figcaption>
            {night
              ? 'nairobi, after lights-out. The window view, roughly · EAT UTC+3'
              : 'nairobi, daytime. The office window view, roughly · EAT UTC+3'}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
