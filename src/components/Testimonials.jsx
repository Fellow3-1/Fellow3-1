import { testimonials } from '../data/content.js'

/* Short role-based quotes, anonymous by the same privacy rule as the rest
   of the site. The content drafts live in src/data/content.js. */
export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 08 · word of mouth
        </p>
        <h2 className="head" data-reveal>
          {testimonials.heading}
        </h2>
        <p className="tlist__note" data-reveal>
          {testimonials.note}
        </p>
        <div className="tlist">
          {testimonials.items.map((t, i) => (
            <blockquote className="tcard" key={t.who} data-reveal style={{ '--rd': `${i * 70}ms` }}>
              <p>{t.quote}</p>
              <footer>
                <span className="tcard__rule" aria-hidden="true" />
                <span className="cap">— {t.who}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
