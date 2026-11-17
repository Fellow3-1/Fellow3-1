import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Log from './components/Log.jsx'
import Infrastructure from './components/Infrastructure.jsx'
import Approach from './components/Approach.jsx'
import Writing from './components/Writing.jsx'
import Contributions from './components/Contributions.jsx'
import FAQ from './components/FAQ.jsx'
import Testimonials from './components/Testimonials.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CommandPalette from './components/CommandPalette.jsx'

export function useReveals(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]:not(.is-in)'))
    if (!els.length) return
    if (
      document.documentElement.classList.contains('reduce') ||
      typeof IntersectionObserver === 'undefined'
    ) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        io.unobserve(entry.target)
      })
    }, { rootMargin: '-10% 0px -10% 0px', threshold: 0.01 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, deps)
}

export default function App() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => document.documentElement.classList.toggle('reduce', mq.matches)
    sync()
    mq.addEventListener?.('change', sync)
    const raf = requestAnimationFrame(() => document.body.classList.add('is-in'))
    return () => {
      mq.removeEventListener?.('change', sync)
      cancelAnimationFrame(raf)
    }
  }, [])

  useReveals()

  return (
    <>
      <a className="skiplink" href="#work">Skip to the work</a>
      <Nav />
      <main id="main">
        <Hero />
        <Log />
        <Infrastructure />
        <Approach />
        <Writing />
        <Contributions />
        <FAQ />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  )
}
