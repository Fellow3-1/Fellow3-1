import { faq } from '../data/content.js'

/* Question-format answers: this is the section answer engines quote. */

export default function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 06 · frequently asked
        </p>
        <h2 className="head" data-reveal>
          {faq.heading}
        </h2>
        <p className="writing__note" data-reveal>
          {faq.note}
        </p>
        <div className="posts">
          {faq.items.map((it, i) => (
            <details className="post" key={it.q} data-reveal style={{ '--rd': `${i * 60}ms` }}>
              <summary>
                <span className="post__title post__title--q">{it.q}</span>
              </summary>
              <div className="post__body">
                <p>{it.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
