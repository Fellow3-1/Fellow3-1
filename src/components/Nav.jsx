import { useEffect, useRef, useState } from 'react'
import { brand, nav } from '../data/content.js'

export default function Nav() {
  const [clock, setClock] = useState('')
  const barRef = useRef(null)

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

  /* thin reading-progress bar, direct style writes, rAF-throttled */
  useEffect(() => {
    const bar = barRef.current
    if (!bar || document.documentElement.classList.contains('reduce')) return undefined
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      bar.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
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
      <div className="nav__progress" aria-hidden="true">
        <span className="nav__bar" ref={barRef} />
      </div>
    </header>
  )
}
