import { infrastructure } from '../data/content.js'

export default function Infrastructure() {
  return (
    <section className="section" id="infrastructure">
      <div className="wrap">
        <p className="logmark" data-reveal><b>[log]</b> 03 · infrastructure</p>
        <h2 className="head" data-reveal>{infrastructure.heading}</h2>
        <p className="infra__intro" data-reveal>{infrastructure.intro}</p>
        <div className="infra__grid">
          {infrastructure.groups.map((group, index) => (
            <article className="infra__card" key={group.title} data-reveal style={{ '--rd': `${index * 65}ms` }}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="infra__note" data-reveal>{infrastructure.note}</p>
      </div>
    </section>
  )
}
