import { timeline } from '../data/content.js'

export default function Timeline() {
  return (
    <section className="section" id="timeline">
      <div className="wrap">
        <h2 className="head" data-reveal>
          {timeline.heading}
        </h2>
        <div className="tline">
          {timeline.rows.map((r, i) => (
            <div className="tline__row" key={r.year} data-reveal style={{ '--rd': `${Math.min(i * 60, 300)}ms` }}>
              <p className="tline__year">{r.year}</p>
              <div>
                <p className="tline__what">{r.what}</p>
                <span className="tline__org">
                  {r.org}
                  {r.certificate ? (
                    <a href={r.certificate.href} target="_blank" rel="noreferrer">
                      {r.certificate.label}
                    </a>
                  ) : null}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
