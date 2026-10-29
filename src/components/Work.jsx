import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/content.js'
import Arrow from './Arrow.jsx'

/* Held picture, passing captions: one photograph pinned at mid-screen
   while the project captions travel past it. */

export default function Work() {
  const [active, setActive] = useState(0)
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (!list || typeof IntersectionObserver === 'undefined') return undefined
    const items = Array.from(list.querySelectorAll('.work__item'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number(entry.target.getAttribute('data-i'))
          setActive((prev) => (prev === idx ? prev : idx))
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    items.forEach((it) => io.observe(it))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section chapter" id="work">
      <h2 className="work__head head" data-reveal>
        Selected work
      </h2>
      <div className="work__split">
        <figure className="work__media" aria-hidden="true">
          {projects.map((p, i) => (
            <img
              key={p.slug}
              src={p.picture.src}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={i === active ? 'is-on' : ''}
            />
          ))}
          <figcaption className="work__count">
            {active + 1} of {projects.length}
          </figcaption>
        </figure>
        <ol className="work__list" ref={listRef}>
          {projects.map((p, i) => (
            <li className={`work__item${i === active ? ' is-active' : ''}`} data-i={i} key={p.slug}>
              <h3>{p.name}</h3>
              <p className="work__kicker">{p.kicker}</p>
              <p className="work__detail">{p.detail}</p>
              <p className="work__tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
              <a className="alink" href={p.href} target="_blank" rel="noreferrer">
                View on GitHub
                <Arrow />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
