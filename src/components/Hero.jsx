import { hero } from '../data/content.js'
import Arrow from './Arrow.jsx'

export default function Hero() {
  const { shots } = hero
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__inner">
          <p className="badge" data-reveal>
            {hero.kicker}
          </p>
          <h1 className="hero__title" data-reveal>
            {hero.title}
          </h1>
          <p className="hero__tag" data-reveal>
            {hero.tagline}
          </p>
          <div className="hero__ctas" data-reveal>
            {hero.ctas.map((c) =>
              c.primary ? (
                <a key={c.href} className="pill" href={c.href}>
                  {c.label}
                </a>
              ) : (
                <a key={c.href} className="alink" href={c.href}>
                  {c.label}
                  <Arrow />
                </a>
              ),
            )}
          </div>
          <p className="hero__note" data-reveal>
            {hero.note}
          </p>
        </div>

        <div className="hero__band" data-reveal>
          <p className="hero__bandnote">Shipped work as the product shots. The grin on the left is the site muse.</p>
          <figure className="shot shot--lap">
            <div className="shot__screen">
              <img src={shots.laptop.src} alt={shots.laptop.alt} fetchPriority="high" decoding="async" />
            </div>
            <div className="shot__base" aria-hidden="true" />
          </figure>
          <figure className="shot shot--phone">
            <span className="shot__notch" aria-hidden="true" />
            <img src={shots.phone.src} alt={shots.phone.alt} loading="lazy" decoding="async" />
          </figure>
          <figure className="shot shot--muse">
            <img src={shots.muse.src} alt={shots.muse.alt} loading="lazy" decoding="async" />
            <figcaption>{shots.muse.label}</figcaption>
          </figure>
        </div>

        <p className="hero__foot">{hero.footnote}</p>
      </div>
    </section>
  )
}
