import { brand, footer } from '../data/content.js'
import { openPalette } from './CommandPalette.jsx'

const shortcutLabel =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '')
    ? '⌘K'
    : 'Ctrl K'

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
            <p className="foot__jump">
              <button type="button" className="foot__cmdk" onClick={openPalette}>
                <kbd>{shortcutLabel}</kbd>
                <span>quick jump</span>
              </button>
            </p>
          </div>
        </div>
        <div className="foot__base">
          <p>{footer.line}</p>
          <p className="foot__meta-links">
            <a href="feed.xml">rss</a>
            <span aria-hidden="true">·</span>
            <a href="sitemap.xml">sitemap</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
