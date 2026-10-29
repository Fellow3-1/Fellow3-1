import { stage, profile } from '../data/content.js'

export default function Stage() {
  return (
    <section className="stage" id="top" aria-label={`${profile.name}, ${profile.role}`}>
      <div className="stage__pins">
        <h1 className="stage__name">
          <span className="stage__pin stage__pin--tl">{profile.first}</span>
          <span className="stage__pin stage__pin--br">{profile.last}</span>
        </h1>
      </div>

      <div className="panel panel--paper">
        <div className="panel__col">
          <p className="panel__sentence">{stage.sentence}</p>
          <div className="panel__actions">
            <a className="btn" href={stage.action.href}>
              {stage.action.label}
            </a>
            <a className="panel__mail" href={`mailto:${profile.email}`}>
              {stage.mailNote}
            </a>
          </div>
        </div>
        <nav className="panel__links" aria-label="Sections">
          {stage.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <figure className="panel__photo">
          <img
            src={stage.photoA.src}
            alt={stage.photoA.alt}
            fetchPriority="high"
            decoding="async"
          />
          <figcaption className="photocap">{stage.photoA.caption}</figcaption>
        </figure>
      </div>

      <figure className="panel panel--photo">
        <img src={stage.photoB.src} alt={stage.photoB.alt} loading="lazy" decoding="async" />
        <figcaption className="photocap">{stage.photoB.caption}</figcaption>
      </figure>

      <div className="panel panel--field">
        <p className="panel__lines">
          {stage.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <p className="panel__note cap">{stage.note}</p>
      </div>
    </section>
  )
}
