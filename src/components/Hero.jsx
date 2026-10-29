import { brand, hero } from '../data/content.js'
import Arrow from './Arrow.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__top">
          <div className="hero__inner">
            <p className="hero__prompt" data-reveal>
              <b>{brand.name.toLowerCase().replace(' ', '')}@nairobi</b> ~ % whoami
            </p>
            <h1 className="hero__name" data-reveal>
              Felloh <i>3.1</i>
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
              alt="Low-poly Joker bust — the site's muse"
              loading="eager"
              decoding="async"
            />
            <figcaption>the muse_</figcaption>
          </figure>
        </div>

        <figure className="hero__strip" data-reveal>
          <img src="assets/hero-skyline-day.jpg" alt="The Nairobi skyline on a clear day" loading="lazy" decoding="async" />
          <figcaption>nairobi, daytime — the office window view, roughly · EAT UTC+3</figcaption>
        </figure>
      </div>
    </section>
  )
}
