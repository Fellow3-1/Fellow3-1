import { numbers } from '../data/content.js'
import Roll from './Roll.jsx'

export default function Numbers() {
  return (
    <section className="section" id="numbers" aria-label="Numbers">
      <div className="wrap">
        <h2 className="head" data-reveal>
          {numbers.heading}
        </h2>
        <div className="nums__cards" data-reveal>
          {numbers.facts.map((f, i) => (
            <div className="num" key={f.cap}>
              <p className="num__figure">
                <Roll value={f.figure} delay={i * 90} />
              </p>
              <span className="cap">{f.cap}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
