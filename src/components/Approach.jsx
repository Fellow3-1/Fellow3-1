import { approach } from '../data/content.js'

export default function Approach() {
  return (
    <section className="section" id="approach">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 03 · engineering approach
        </p>
        <h2 className="head" data-reveal>
          {approach.heading}
        </h2>
        <div className="blocks">
          {approach.blocks.map((b, i) => (
            <div className="block" key={b.title} data-reveal style={{ '--rd': `${i * 70}ms` }}>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
