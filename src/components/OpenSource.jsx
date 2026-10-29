import { useEffect, useState } from 'react'
import { brand, oss } from '../data/content.js'

/* Live repo highlights from the GitHub API, with the documented
   static fallback when the network or the rate limiter says no. */

export default function OpenSource() {
  const [rows, setRows] = useState(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (typeof window.fetch !== 'function') return undefined
    const ctrl = new AbortController()
    const timer = window.setTimeout(() => ctrl.abort(), 6000)
    window
      .fetch(`https://api.github.com/users/${brand.handle}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`http ${r.status}`))))
      .then((repos) => {
        const top = repos
          .filter((r) => !r.fork && !r.archived)
          .map((r) => ({
            name: r.name,
            desc: r.description || 'No description given',
            lang: r.language || 'code',
            meta: `${r.stargazers_count} stars · ${r.forks_count} forks`,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice(0, 6)
        if (top.length) {
          setRows(top)
          setLive(true)
        }
      })
      .catch(() => {})
      .finally(() => window.clearTimeout(timer))
    return () => {
      window.clearTimeout(timer)
      ctrl.abort()
    }
  }, [])

  const shown = rows || oss.fallback

  return (
    <section className="section" id="open-source">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 05 — open source
        </p>
        <h2 className="head" data-reveal>
          {oss.heading}
        </h2>
        <div className="oss__rows" data-reveal>
          {shown.map((r) => (
            <a
              className="oss__row"
              key={r.name}
              href={`${brand.repoUrl}/${r.name}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="oss__name">{r.name}</span>
              <span className="oss__desc">{r.desc}</span>
              <span className="oss__meta">
                {r.lang} · {r.meta}
              </span>
            </a>
          ))}
        </div>
        <p className="oss__live" data-reveal>
          {live ? (
            <>
              <b>[ok]</b> live from the GitHub API — {brand.repo}
            </>
          ) : (
            <>{oss.note}</>
          )}
        </p>
      </div>
    </section>
  )
}
