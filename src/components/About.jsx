import { about } from '../data/content.js'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 06 — about
        </p>
        <h2 className="head" data-reveal>
          {about.heading}
        </h2>
        <div className="about__grid">
          <div data-reveal>
            <p className="about__bio">{about.bio}</p>
            <div className="depth">
              {about.skills.map((s) => (
                <div className="depth__row" key={s.depth}>
                  <span className="cap">{s.depth}</span>
                  <p>{s.items}</p>
                </div>
              ))}
            </div>
            <div className="refs">
              <p className="refs__intro">{about.referencesIntro}</p>
              {about.references.map((r) => (
                <div className="refs__row" key={r.role}>
                  <span className="refs__role">{r.role}</span>
                  <span className="refs__line">{r.line}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="about__card" data-reveal>
            <h3>{about.availability.heading}</h3>
            <ul>
              {about.availability.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
