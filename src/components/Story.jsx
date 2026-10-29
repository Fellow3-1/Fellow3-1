import { story } from '../data/content.js'

export default function Story() {
  return (
    <section className="section chapter chapter--paper" id="story">
      <div className="grid">
        <h2 className="story__head head" data-reveal>
          {story.headingA}
          <em>{story.headingB}</em>
        </h2>
        <div className="story__table" data-reveal>
          {story.rows.map((r) => (
            <div className="story__row" key={r.year}>
              <p className="story__year">{r.year}</p>
              <div>
                <p className="story__what">{r.what}</p>
                <span className="story__org">
                  {r.org}
                  {r.certificate ? (
                    <a className="story__cert" href={r.certificate.href} target="_blank" rel="noreferrer">
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
