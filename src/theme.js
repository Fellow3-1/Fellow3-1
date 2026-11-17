import { useEffect, useState } from 'react'

/* One small module owns the theme. The initial paint is set by the inline
   script in index.html (before CSS, so there is no flash); this module is
   for flipping it after load, keeping localStorage, the OS preference and
   the theme-color meta in step, and letting components subscribe. */

const KEY = 'f31-theme'
const LIGHT_META = '#f6f6f3'
const DARK_META = '#0d060b'

function readSaved() {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'dark' || v === 'light' ? v : null
  } catch {
    return null
  }
}

export function getTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(next, { persist = true } = {}) {
  document.documentElement.dataset.theme = next
  if (persist) {
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* private mode: the session flip still works, it just won't persist */
    }
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', next === 'dark' ? DARK_META : LIGHT_META)
  window.dispatchEvent(new CustomEvent('f31:theme', { detail: next }))
}

export function flipTheme() {
  const root = document.documentElement
  /* animate surface colour swaps for a brief window, unless motion is off */
  if (!root.classList.contains('reduce')) {
    root.classList.add('theming')
    window.setTimeout(() => root.classList.remove('theming'), 420)
  }
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')
}

/* React subscription. Follows cross-tab storage and live OS theme flips
   when the visitor hasn't pinned an explicit choice. */
export function useTheme() {
  const [theme, setThemeState] = useState(getTheme)
  useEffect(() => {
    const onFlip = (event) => setThemeState(event.detail ?? getTheme())
    const onStorage = (event) => {
      if (event.key && event.key !== KEY) return
      const saved = readSaved()
      if (saved) setTheme(saved, { persist: false })
    }
    const mq = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null
    const onSystem = (event) => {
      if (readSaved()) return
      setTheme(event.matches ? 'dark' : 'light', { persist: false })
    }

    window.addEventListener('f31:theme', onFlip)
    window.addEventListener('storage', onStorage)
    mq?.addEventListener?.('change', onSystem)
    return () => {
      window.removeEventListener('f31:theme', onFlip)
      window.removeEventListener('storage', onStorage)
      mq?.removeEventListener?.('change', onSystem)
    }
  }, [])
  return [theme, flipTheme]
}
