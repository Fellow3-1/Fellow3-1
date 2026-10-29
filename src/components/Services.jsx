import { services } from '../data/content.js'

export default function Services() {
  return (
    <section className="section chapter chapter--paper" id="services">
      <div className="grid">
        <h2 className="svc__lead head" data-reveal>
          {services.lead}
        </h2>
        {services.rows.map((r, i) => (
          <div
            className="svc__row"
            key={r.name}
            data-reveal
            style={{ '--rd': `${Math.min(i * 60, 300)}ms` }}
          >
            <h3 className="svc__name">{r.name}</h3>
            <p className="svc__tail">{r.tail}</p>
          </div>
        ))}
        <figure className="svc__photo" data-reveal>
          <img src={services.photo.src} alt={services.photo.alt} loading="lazy" decoding="async" />
          <figcaption className="cap">{services.photo.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}
