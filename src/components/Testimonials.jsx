import { commitments } from '../data/content.js'

/* Commitments in the first person. Anonymous quotes are not published
   here; the content lives in src/data/content.js. */
export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 08 · working together
        </p>
        <h2 className="head" data-reveal>
          {commitments.heading}
        </h2>
        <p className="tlist__note" data-reveal>
          {commitments.note}
        </p>
        <div className="tlist">
          {commitments.items.map((t, i) => (
            <article className="tcard" key={t.label} data-reveal style={{ '--rd': `${i * 70}ms` }}>
              <span className="tcard__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <p>{t.line}</p>
              <footer>
                <span className="tcard__rule" aria-hidden="true" />
                <span className="cap">{t.label}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
