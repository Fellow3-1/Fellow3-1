import { brand, footer } from '../data/content.js'

export default function Footer() {
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
            <span className="cap">Technical hygiene</span>
            <ul>
              {footer.hygienic.map((h) => (
                <li key={h}>
                  <p>{h}</p>
                </li>
              ))}
              <li>
                <a href={`${brand.repoUrl}`} target="_blank" rel="noreferrer">
                  source on GitHub
                </a>
              </li>
            </ul>
          </div>
          <div className="foot__col">
            <span className="cap">Colophon</span>
            {footer.colophon.map((c) => (
              <p key={c}>{c}</p>
            ))}
            <p className="foot__muse" title="The returned muse">
              <img src="assets/favicon-joker.png" alt="" width="20" height="20" />
              {footer.muse}
            </p>
          </div>
        </div>
        <div className="foot__base">
          <p>{footer.line}</p>
          <p>
            <a href="sitemap.xml">sitemap</a> · <a href="cv.html">printable CV</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
