import { useEffect } from 'react'
import Stage from './components/Stage.jsx'
import Intro from './components/Intro.jsx'
import Work from './components/Work.jsx'
import Story from './components/Story.jsx'
import Services from './components/Services.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export function useReveals(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-in)'))
    if (!els.length) return
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          const kin = el.closest('section, footer')
          const order = kin ? Array.from(kin.querySelectorAll('[data-reveal]')).indexOf(el) : 0
          el.style.setProperty('--rd', `${Math.min(order * 70, 350)}ms`)
          el.classList.add('is-in')
          io.unobserve(el)
        })
      },
      { rootMargin: '-14% 0px -14% 0px', threshold: 0.01 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default function App() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.classList.toggle('reduce', reduced)
    const raf = requestAnimationFrame(() => document.body.classList.add('is-in'))
    return () => cancelAnimationFrame(raf)
  }, [])

  useReveals()

  return (
    <>
      <a className="skiplink" href="#work">
        Skip to the work
      </a>
      <Stage />
      <main id="main">
        <Intro />
        <Work />
        <Story />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
