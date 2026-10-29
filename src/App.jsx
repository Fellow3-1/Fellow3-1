import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Log from './components/Log.jsx'
import Approach from './components/Approach.jsx'
import Writing from './components/Writing.jsx'
import Contributions from './components/Contributions.jsx'
import FAQ from './components/FAQ.jsx'
import About from './components/About.jsx'
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
          el.classList.add('is-in')
          io.unobserve(el)
        })
      },
      { rootMargin: '-12% 0px -12% 0px', threshold: 0.01 },
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
      <Nav />
      <main id="main">
        <Hero />
        <Log />
        <Approach />
        <Writing />
        <Contributions />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
