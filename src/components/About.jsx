import { about } from '../data/content.js'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <p className="logmark" data-reveal><b>[log]</b> 07 · profile</p>
        <h2 className="head" data-reveal>{about.heading}</h2>
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
            <div className="profile__credentials">
              <h3>Education</h3>
              <ul>{about.education.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>Certification</h3>
              <ul>{about.certifications.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <aside className="about__card" data-reveal>
            <figure className="about__shot macwin">
              <div className="macwin__chrome" aria-hidden="true">
                <span className="slip__light slip__light--red" />
                <span className="slip__light slip__light--amber" />
                <span className="slip__light slip__light--green" />
                <span className="macwin__title">profile.app</span>
              </div>
              <img src="assets/intro-desk.jpg" alt="A desk with a laptop, phones and notebooks" loading="lazy" decoding="async" />
              <figcaption>an engineer's workspace</figcaption>
            </figure>
            <h3>{about.availability.heading}</h3>
            <ul>{about.availability.lines.map((line) => <li key={line}>{line}</li>)}</ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
