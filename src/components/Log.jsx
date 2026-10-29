import { log } from '../data/content.js'
import Arrow from './Arrow.jsx'

function FlowArrow() {
  return (
    <svg className="flow__arr" viewBox="0 0 22 12" fill="none" aria-hidden="true">
      <path d="M0 6h18M14 1.5 19 6l-5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Entry({ e }) {
  return (
    <article className="entry" data-reveal>
      <div className="entry__line">
        <span className="entry__num">{e.num}</span>
        <h3 className="entry__label">{e.label}</h3>
        <span className="entry__meta">
          <b>{e.sector}</b>
          <br />
          {e.client} · {e.when}
        </span>
      </div>

      <div className="entry__main">
        <div>
          <p className="entry__problem">{e.problem}</p>

          <p className="tagrow" aria-label="Stack">
            {e.stack.map((s, i) => (
              <span key={s} style={{ '--n': i }}>
                {s}
              </span>
            ))}
          </p>

          <div className="entry__nums" aria-label="Impact numbers">
            {e.numbers.map(([v, k], i) => (
              <div className="entry__num-cell" key={k} style={{ '--n': i }}>
                <b>{v}</b>
                <span>{k}</span>
              </div>
            ))}
          </div>

          <div className="entry__decisions">
            {e.decisions.map((d, i) => (
              <p key={d} style={{ '--n': i }}>
                {d}
              </p>
            ))}
          </div>
        </div>

        <figure className="entry__shot">
          <img src={e.img.src} alt={e.img.alt} loading="lazy" decoding="async" />
          <figcaption>{e.img.note}</figcaption>
        </figure>
      </div>

      <div className="entry__foot">
        {e.link ? (
          <a className="alink" href={e.link.href} target="_blank" rel="noreferrer">
            {e.link.label}
            <Arrow />
          </a>
        ) : null}
        <details>
          <summary>Architecture</summary>
          <div className="flow">
            <p className="flow__title">Architecture</p>
            <div className="flow__nodes">
              {e.diagram.map(([label, sub], i) => (
                <span key={label} style={{ display: 'contents', '--n': i }}>
                  {i > 0 ? <FlowArrow /> : null}
                  <span className="flow__node">
                    {label}
                    <span>{sub}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </details>
      </div>
    </article>
  )
}

export default function Log() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 02 · selected work
        </p>
        <h2 className="head" data-reveal>
          {log.heading}
        </h2>
        <p className="log__intro" data-reveal>
          {log.intro}
        </p>
        <div className="entries">
          {log.entries.map((e) => (
            <Entry e={e} key={e.label} />
          ))}
        </div>
        <p className="log__foot" data-reveal>
          {log.footnote}
        </p>
      </div>
    </section>
  )
}
