import { highlights } from '../data/content.js'

export default function Highlights() {
  return (
    <section className="section" id="highlights">
      <div className="wrap">
        <h2 className="head" data-reveal>
          {highlights.heading}
        </h2>
        <div className="tiles">
          {highlights.tiles.map((t, i) => (
            <div
              className={`tile tile--${t.tone}`}
              key={t.key}
              data-reveal
              style={{ '--rd': `${Math.min(i * 70, 280)}ms` }}
            >
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <figure>
                <img src={t.img.src} alt={t.img.alt} loading="lazy" decoding="async" />
              </figure>
            </div>
          ))}
        </div>
        <p className="tiles__foot" data-reveal>
          {highlights.footnote}
        </p>
      </div>
    </section>
  )
}
