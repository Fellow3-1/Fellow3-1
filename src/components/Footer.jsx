import { useEffect, useState } from 'react'
import { brand, footer } from '../data/content.js'

export default function Footer() {
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
    <footer className="foot">
      <div className="wrap">
        <div className="foot__cols">
          <div className="foot__col">
            <span className="cap">Sections</span>
            <ul>
              {footer.sections.map((s) => (
                <li key={s.href}>
                  <a href={s.href}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="foot__col">
            <span className="cap">Reach me</span>
            <ul>
              <li>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </li>
              {brand.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="foot__col">
            <span className="cap">Recognition</span>
            <ul>
              {footer.recognition.map((r) => (
                <li key={r}>
                  <p style={{ fontSize: '15px', color: 'var(--ink)' }}>{r}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="foot__col">
            <span className="cap">Colophon</span>
            {footer.colophon.map((c) => (
              <p key={c}>{c}</p>
            ))}
            <p className="foot__clock">
              Nairobi — {clock || '· · : · ·'} {brand.tzLabel}
            </p>
          </div>
        </div>

        <div className="foot__band">
          <p className="foot__mark" aria-label={brand.name}>
            Felloh <i>3.1</i>
          </p>
        </div>

        <div className="foot__base">
          <p>{footer.line}</p>
          <p>
            Built by hand ·{' '}
            <a href={brand.repoUrl} target="_blank" rel="noreferrer">
              source on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
