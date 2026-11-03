import { useEffect, useState } from 'react'

/* One small module owns the theme. The initial paint is set by the inline
   script in index.html (before CSS, so there is no flash); this module is
   for flipping it after load, keeping localStorage and the theme-color
   meta in step, and letting components subscribe. */

const KEY = 'f31-theme'
const LIGHT_META = '#f6f6f3'
const DARK_META = '#0d060b'

export function getTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(next) {
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem(KEY, next)
  } catch {
    /* private mode: the session flip still works, it just won't persist */
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

/* React subscription. Also follows the storage event so two tabs agree. */
export function useTheme() {
  const [theme, setThemeState] = useState(getTheme)
  useEffect(() => {
    const onFlip = (event) => setThemeState(event.detail ?? getTheme())
    window.addEventListener('f31:theme', onFlip)
    window.addEventListener('storage', onFlip)
    return () => {
      window.removeEventListener('f31:theme', onFlip)
      window.removeEventListener('storage', onFlip)
    }
  }, [])
  return [theme, flipTheme]
}
