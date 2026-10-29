import { projects } from '../data/content.js'
import Arrow from './Arrow.jsx'

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <h2 className="head" data-reveal>
          Selected work_
        </h2>
        <div className="cards">
          {projects.map((p, i) => (
            <article className="card" key={p.slug} data-reveal style={{ '--rd': `${Math.min(i * 60, 300)}ms` }}>
              <figure>
                <img src={p.img.src} alt={p.img.alt} loading="lazy" decoding="async" />
              </figure>
              <h3>{p.name}</h3>
              <p className="card__k">{p.kicker}</p>
              <p className="card__t">{p.tags}</p>
              <a className="alink" href={p.href} target="_blank" rel="noreferrer">
                View on GitHub
                <Arrow />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
