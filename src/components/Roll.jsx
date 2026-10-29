import { useEffect, useMemo, useRef, useState } from 'react'

/* A figure that settles like a reel when it enters view.
   The true value always lives in an sr-only span; motion is presentation only. */

function buildStrip(target) {
  const len = 5 + Math.floor(Math.random() * 4)
  const strip = []
  for (let i = 0; i < len - 1; i += 1) strip.push(Math.floor(Math.random() * 10))
  strip.push(Number(target))
  return strip
}

export default function Roll({ value, delay = 0 }) {
  const [spun, setSpun] = useState(false)
  const ref = useRef(null)
  const match = String(value).match(/^([^0-9]*)([0-9]+)(.*)$/)
  const strips = useMemo(
    () => (match ? match[2].split('').map((d) => buildStrip(d)) : []),
    // rebuild reels only when the value itself changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  )

  useEffect(() => {
    if (document.documentElement.classList.contains('reduce')) return undefined
    if (spun) return undefined
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSpun(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          window.setTimeout(() => setSpun(true), delay)
          io.disconnect()
        })
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [spun, delay])

  if (!match) return <span>{value}</span>

  const [, pre, , suf] = match

  return (
    <span className={`roll${spun ? ' roll--ready' : ''}`} ref={ref}>
      <span className="roll__sr">{value}</span>
      <span className="roll__in" aria-hidden="true">
        {pre ? <span className="roll__static">{pre}</span> : null}
        {strips.map((strip, i) => (
          <span className="roll__col" key={i}>
            <span
              className={`roll__strip${spun ? ' roll__spin' : ''}`}
              style={{ transform: spun ? `translateY(-${strip.length - 1}em)` : 'translateY(0)' }}
            >
              {strip.map((n, j) => (
                <span key={j}>{n}</span>
              ))}
            </span>
          </span>
        ))}
        {suf ? <span className="roll__static">{suf}</span> : null}
      </span>
    </span>
  )
}
