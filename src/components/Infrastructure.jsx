import { useRef, useState } from 'react'
import { infrastructure } from '../data/content.js'
import SwarmField from './SwarmField.jsx'

export default function Infrastructure() {
  const sectionRef = useRef(null)
  const [pinned, setPinned] = useState(-1)
  const [hovered, setHovered] = useState(-1)

  const activeIndex = hovered >= 0 ? hovered : pinned

  return (
    <section className="section" id="infrastructure" ref={sectionRef}>
      <div className="wrap">
        <p className="logmark" data-reveal><b>[log]</b> 03 · infrastructure</p>
        <h2 className="head" data-reveal>{infrastructure.heading}</h2>
        <p className="infra__intro" data-reveal>{infrastructure.intro}</p>

        <SwarmField
          sectionRef={sectionRef}
          groups={infrastructure.groups}
          activeIndex={activeIndex}
          pinnedIndex={pinned}
          onHover={setHovered}
          onSelect={setPinned}
        />

        <div
          className={`infra__grid${activeIndex >= 0 ? ' has-focus' : ''}`}
          onPointerLeave={() => setHovered(-1)}
        >
          {infrastructure.groups.map((group, index) => {
            const isFocused = activeIndex === index
            return (
              <article
                className={`infra__card infra__card--${index}${isFocused ? ' is-active' : ''}`}
                key={group.title}
                data-reveal
                style={{ '--rd': `${index * 65}ms` }}
                onPointerEnter={() => setHovered(index)}
                onClick={() => {
                  if (window.getSelection?.()?.toString()) return
                  setPinned((cur) => (cur === index ? -1 : index))
                }}
              >
                <div className="infra__card-top">
                  <span className="infra__code" aria-hidden="true">
                    <span className="infra__dot" />
                    {String(index + 1).padStart(2, '0')} · {group.code}
                  </span>
                </div>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            )
          })}
        </div>
        <p className="infra__note" data-reveal>{infrastructure.note}</p>
      </div>
    </section>
  )
}
