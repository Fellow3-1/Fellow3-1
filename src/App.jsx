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

export function useReveals() {
  useEffect(() => {
    /* Reveal state is written as a data attribute, never as a class.
       React owns `className` on these elements; when a hover or click changes
       it (e.g. the infrastructure cards gaining `is-active`), React rewrites
       the whole class attribute and any class added imperatively here is
       dropped — leaving the element at opacity 0 with no observer left to
       bring it back until a reload. `data-reveal-in` survives that rewrite. */
    const els = Array.from(document.querySelectorAll('[data-reveal]:not([data-reveal-in])'))
    if (!els.length) return
    if (
      document.documentElement.classList.contains('reduce') ||
      typeof IntersectionObserver === 'undefined'
    ) {
      els.forEach((el) => el.setAttribute('data-reveal-in', ''))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.setAttribute('data-reveal-in', '')
        io.unobserve(entry.target)
      })
    }, { rootMargin: '-10% 0px -10% 0px', threshold: 0.01 })
    els.forEach((el) => io.observe(el))

    /* Safety net: if an element is already inside the viewport the observer
       still fires, but a browser that never delivers the callback (or a section
       taller than the root margin allows) would leave content at opacity 0
       forever. Reveal everything after five seconds, whatever happened. */
    const failsafe = window.setTimeout(() => {
      els.forEach((el) => {
        if (!el.hasAttribute('data-reveal-in')) el.setAttribute('data-reveal-in', '')
      })
      io.disconnect()
    }, 5000)

    return () => {
      window.clearTimeout(failsafe)
      io.disconnect()
    }
  }, [])
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
      <a className="skiplink" href="#main">Skip to the content</a>
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
