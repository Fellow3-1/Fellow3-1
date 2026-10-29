import { useEffect, useState } from 'react'
import { brand, nav } from '../data/content.js'

export default function Nav() {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-KE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: brand.tz,
    })
    const tick = () => setClock(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 20000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top">
          <span className="nav__prompt">$</span>
          {brand.name}
        </a>
        <nav className="nav__links" aria-label="Sections">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <span className="nav__status">
          <span className="nav__dot" aria-hidden="true" />
          open · nairobi {clock || '· ·:··'}
        </span>
      </div>
    </header>
  )
}
