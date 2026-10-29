import { intro } from '../data/content.js'
import Roll from './Roll.jsx'

export default function Intro() {
  return (
    <section className="section chapter" aria-label="About Felix">
      <div className="grid">
        <h2 className="intro__head head" data-reveal>
          {intro.heading}
        </h2>
        <p className="intro__note" data-reveal>
          {intro.note}
        </p>
        <figure className="intro__photo" data-reveal>
          <img src={intro.photo.src} alt={intro.photo.alt} loading="lazy" decoding="async" />
          <figcaption className="cap">{intro.photo.caption}</figcaption>
        </figure>
        <div className="intro__facts" data-reveal>
          {intro.facts.map((f, i) => (
            <div className="fact" key={f.figure}>
              <p className="fact__figure">
                <Roll value={f.figure} delay={i * 90} />
              </p>
              <p className="fact__cap cap">{f.cap}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
