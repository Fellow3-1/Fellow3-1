import { useEffect, useRef, useState } from 'react'
import { brand, nav } from '../data/content.js'
import { useTheme, flipTheme } from '../theme.js'

export default function Nav() {
  const [active, setActive] = useState('')
  const [theme] = useTheme()
  const headerRef = useRef(null)
  const linksRef = useRef(null)
  const barRef = useRef(null)

  /* reading-progress bar + subtle scrolled glass state, direct style/class writes */
  useEffect(() => {
    const header = headerRef.current
    const bar = barRef.current
    if (!header) return undefined
    const reduced = () => document.documentElement.classList.contains('reduce')
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      header.classList.toggle('is-scrolled', y > 12)
      if (bar && !reduced()) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.min(1, y / max) : 0
        bar.style.transform = `scaleX(${p})`
      }
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

  /* scrollspy: mark the nav link whose section owns the viewport middle band */
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const targets = nav.links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean)
    if (!targets.length) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 }
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* keep the active link visible in the horizontal mobile strip */
  useEffect(() => {
    const row = linksRef.current
    if (!active || !row || row.scrollWidth <= row.clientWidth) return
    const current = row.querySelector(`[href="${active}"]`)
    if (!current || typeof row.scrollTo !== 'function') return
    const target = current.offsetLeft - (row.clientWidth - current.offsetWidth) / 2
    const reduced = document.documentElement.classList.contains('reduce')
    row.scrollTo({
      left: Math.max(0, target),
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [active])

  return (
    <header className="nav" ref={headerRef}>
      <div className="nav__inner">
        <a className="nav__brand" href="#top">
          <span className="nav__prompt">$</span>
          {brand.name}
        </a>
        <nav className="nav__links" aria-label="Sections" ref={linksRef}>
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? 'is-here' : undefined}
              aria-current={active === l.href ? 'location' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          className="nav__theme"
          type="button"
          id="theme-flip"
          onClick={flipTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={theme === 'dark'}
          title={theme === 'dark' ? 'Lights on' : 'Lights out'}
        >
          <span className="nav__theme-orb" aria-hidden="true" />
        </button>
      </div>
      <div className="nav__progress" aria-hidden="true">
        <span className="nav__bar" ref={barRef} />
      </div>
    </header>
  )
}
