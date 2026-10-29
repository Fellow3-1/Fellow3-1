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
                <p className="post__share">
                  <span className="cap">share</span>
                  <a
                    className="alink"
                    href={`https://x.com/intent/post?text=${encodeURIComponent(`${p.title} · Felloh 3.1, engineering log`)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    post on X
                  </a>
                  <a
                    className="alink"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://fellow3-1.github.io/Fellow3-1/#writing')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    share on LinkedIn
                  </a>
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
