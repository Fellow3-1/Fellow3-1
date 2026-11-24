import { useState } from 'react'
import { writing } from '../data/content.js'
import { SITE } from '../data/site.js'
import Arrow from './Arrow.jsx'

export default function Writing() {
  const [copiedSlug, setCopiedSlug] = useState('')

  const copyLink = async (slug, url) => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('unavailable')
      await navigator.clipboard.writeText(url)
      setCopiedSlug(slug)
      window.setTimeout(() => {
        setCopiedSlug((cur) => (cur === slug ? '' : cur))
      }, 2200)
    } catch {
      window.history.replaceState(null, '', '#writing')
    }
  }

  return (
    <section className="section" id="writing">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 05 · writing
        </p>
        <h2 className="head" data-reveal>
          {writing.heading}
        </h2>
        <p className="writing__note" data-reveal>
          {writing.note}
        </p>
        <div className="posts">
          {writing.posts.map((p, i) => {
            const noteUrl = `${SITE}/writing/${p.slug}/`
            const isCopied = copiedSlug === p.slug
            return (
              <details className="post" key={p.slug} data-reveal style={{ '--rd': `${i * 70}ms` }}>
                <summary>
                  <span className="post__date">{p.kind}</span>
                  <span className="post__title">{p.title}</span>
                  <span className="post__min">{p.tag}</span>
                </summary>
                <div className="post__body">
                  {p.body.map((para, i) => (
                    <p key={`${p.slug}-${i}`}>{para}</p>
                  ))}
                  <p className="post__open">
                    <a className="alink" href={`writing/${p.slug}/`}>
                      read it as its own page
                      <Arrow />
                    </a>
                  </p>
                  <p className="post__share">
                    <span className="cap">share</span>
                    <a
                      className="alink"
                      href={`https://x.com/intent/post?text=${encodeURIComponent(`${p.title} · Felloh 3.1`)}&url=${encodeURIComponent(noteUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      post on X
                    </a>
                    <a
                      className="alink"
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(noteUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      share on LinkedIn
                    </a>
                    <button
                      type="button"
                      className="alink post__copy"
                      onClick={() => copyLink(p.slug, noteUrl)}
                    >
                      {isCopied ? 'link copied' : 'copy link'}
                    </button>
                  </p>
                </div>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
