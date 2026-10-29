import { brand, nav } from '../data/content.js'

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top">
          <img src="assets/favicon-joker.png" alt="" width="24" height="24" />
          {brand.name}
        </a>
        <nav className="nav__links" aria-label="Sections">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="pill" href={nav.cta.href}>
          {nav.cta.label}
        </a>
      </div>
    </header>
  )
}
