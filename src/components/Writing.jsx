import { writing } from '../data/content.js'

export default function Writing() {
  return (
    <section className="section" id="writing">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 04 · writing
        </p>
        <h2 className="head" data-reveal>
          {writing.heading}
        </h2>
        <p className="writing__note" data-reveal>
          {writing.note}
        </p>
        <div className="posts">
          {writing.posts.map((p, i) => (
            <details className="post" key={p.title} data-reveal style={{ '--rd': `${i * 70}ms` }}>
              <summary>
                <span className="post__date">{p.date}</span>
                <span className="post__title">{p.title}</span>
                <span className="post__min">{p.minutes}</span>
              </summary>
              <div className="post__body">
                {p.body.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
