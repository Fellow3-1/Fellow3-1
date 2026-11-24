import { useEffect, useMemo, useRef, useState } from 'react'
import { brand, log, writing, caseStudy } from '../data/content.js'
import { useTheme, flipTheme } from '../theme.js'

/* eslint-disable react-hooks/refs -- close() reads lastFocusRef from event handlers only */

/* Lightweight terminal/macOS jump palette (Cmd/Ctrl + K).
   Opens instantly — keyboard actions stay un-animated so repeat use feels crisp.

   `react-hooks/refs` is disabled for this file: `close()` reads the element to
   restore focus to, and it is only ever called from keyboard/mouse handlers. */

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const [toast, setToast] = useState('')
  const [theme] = useTheme()
  const inputRef = useRef(null)
  const lastFocusRef = useRef(null)

  const items = useMemo(
    () => [
      { id: 'sec-top', group: 'Sections', label: 'Top · Hero', hint: '#top', href: '#top' },
      { id: 'sec-work', group: 'Sections', label: '02 · Selected work', hint: '#work', href: '#work' },
      { id: 'sec-infra', group: 'Sections', label: '03 · Infrastructure & swarm', hint: '#infrastructure', href: '#infrastructure' },
      { id: 'sec-approach', group: 'Sections', label: '04 · Engineering approach', hint: '#approach', href: '#approach' },
      { id: 'sec-writing', group: 'Sections', label: '05 · Technical notes', hint: '#writing', href: '#writing' },
      { id: 'sec-contrib', group: 'Sections', label: '06 · Contribution snake', hint: '#contributions', href: '#contributions' },
      { id: 'sec-faq', group: 'Sections', label: '07 · Frequently asked', hint: '#faq', href: '#faq' },
      { id: 'sec-together', group: 'Sections', label: '08 · Working together', hint: '#testimonials', href: '#testimonials' },
      { id: 'sec-about', group: 'Sections', label: '09 · Profile & skills', hint: '#about', href: '#about' },
      { id: 'sec-contact', group: 'Sections', label: '10 · Contact & receipt', hint: '#contact', href: '#contact' },
      ...log.entries.map((entry) => ({
        id: `repo-${entry.num}`,
        group: 'Repositories',
        label: entry.label,
        hint: `${entry.when} ↗`,
        href: entry.link.href,
        external: true,
      })),
      {
        id: 'page-case',
        group: 'Reading',
        label: caseStudy.title,
        hint: 'case study',
        href: `case-study/${caseStudy.slug}/`,
      },
      ...writing.posts.map((post) => ({
        id: `note-${post.slug}`,
        group: 'Reading',
        label: post.title,
        hint: post.tag.toLowerCase(),
        href: `writing/${post.slug}/`,
      })),
      {
        id: 'act-theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        hint: 'theme',
        action: 'theme',
      },
      {
        id: 'act-email',
        group: 'Actions',
        label: `Copy email · ${brand.email}`,
        hint: 'clipboard',
        action: 'email',
      },
    ],
    [theme]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        it.group.toLowerCase().includes(q) ||
        it.hint.toLowerCase().includes(q)
    )
  }, [items, query])

  const close = () => {
    setOpen(false)
    setQuery('')
    setToast('')
    const prev = lastFocusRef.current
    lastFocusRef.current = null
    if (prev && typeof prev.focus === 'function') {
      window.setTimeout(() => prev.focus(), 0)
    }
  }

  const show = () => {
    lastFocusRef.current = document.activeElement
    setQuery('')
    setCursor(0)
    setToast('')
    setOpen(true)
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (open) close()
        else show()
      } else if (event.key === 'Escape' && open) {
        event.preventDefault()
        close()
      }
    }
    const onOpen = () => show()
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('f31:palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('f31:palette', onOpen)
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    inputRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    /* Everything behind the dialog is inert: a screen reader cannot wander into
       the page while the palette is modal, and clicks on the backdrop still work
       because the backdrop is the dialog element itself. */
    const behind = Array.from(document.getElementById('root')?.children || []).filter(
      (el) => !el.classList.contains('cmdk')
    )
    behind.forEach((el) => el.setAttribute('inert', ''))

    return () => {
      document.body.style.overflow = prevOverflow
      behind.forEach((el) => el.removeAttribute('inert'))
    }
  }, [open])

  const run = async (item) => {
    if (!item) return
    if (item.action === 'theme') {
      flipTheme()
      close()
      return
    }
    if (item.action === 'email') {
      try {
        if (!navigator.clipboard?.writeText) throw new Error('unavailable')
        await navigator.clipboard.writeText(brand.email)
        setToast('address copied to clipboard')
        window.setTimeout(close, 520)
      } catch {
        window.location.href = `mailto:${brand.email}`
        close()
      }
      return
    }
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
      close()
      return
    }
    if (item.href?.startsWith('#')) {
      const target = document.getElementById(item.href.slice(1))
      close()
      if (target) {
        const reduced = document.documentElement.classList.contains('reduce')
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
        window.history.replaceState(null, '', item.href)
      }
      return
    }
    if (item.href) {
      window.location.href = item.href
    }
  }

  /* Tab and Shift+Tab stay inside the dialog. The input owns the arrow keys;
     this only closes the loop at the two ends. */
  const onDialogKeyDown = (event) => {
    if (event.key !== 'Tab') return
    const focusable = event.currentTarget.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const onInputKeyDown = (event) => {
    if (!filtered.length) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setCursor((c) => (c + 1) % filtered.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setCursor((c) => (c - 1 + filtered.length) % filtered.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setCursor(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setCursor(filtered.length - 1)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      run(filtered[cursor])
    }
  }

  if (!open) return null

  const activeItem = filtered[cursor]

  return (
    <div
      className="cmdk"
      role="dialog"
      aria-modal="true"
      aria-label="Quick navigation"
      onKeyDown={onDialogKeyDown}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <div className="cmdk__panel">
        <div className="cmdk__chrome">
          <button
            type="button"
            className="slip__light slip__light--red cmdk__close"
            onClick={close}
            aria-label="Close quick navigation"
          />
          <span className="slip__light slip__light--amber" aria-hidden="true" />
          <span className="slip__light slip__light--green" aria-hidden="true" />
          <span className="cmdk__title">jump.app</span>
          <kbd className="cmdk__esc">esc</kbd>
        </div>

        <div className="cmdk__bar">
          <span className="cmdk__prompt" aria-hidden="true">$</span>
          <input
            ref={inputRef}
            type="text"
            className="cmdk__input"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="cmdk-list"
            aria-activedescendant={activeItem ? `cmdk-${activeItem.id}` : undefined}
            placeholder="Jump to a section, repo, note or action…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setCursor(0)
            }}
            onKeyDown={onInputKeyDown}
          />
        </div>

        <ul className="cmdk__list" id="cmdk-list" role="listbox" aria-label="Commands">
          {filtered.length === 0 ? (
            <li className="cmdk__empty">No matching command for “{query}”.</li>
          ) : (
            filtered.map((item, idx) => {
              const showGroup = idx === 0 || filtered[idx - 1].group !== item.group
              const selected = idx === cursor
              return (
                <li
                  key={item.id}
                  id={`cmdk-${item.id}`}
                  role="option"
                  aria-selected={selected}
                  className={`cmdk__item${selected ? ' is-selected' : ''}`}
                  /* keep focus in the input so typing keeps filtering */
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setCursor(idx)}
                  onClick={() => run(item)}
                >
                  {showGroup ? (
                    <span className="cmdk__group" aria-hidden="true">{item.group}</span>
                  ) : null}
                  <span className="cmdk__label">{item.label}</span>
                  <span className="cmdk__hint">{item.hint}</span>
                </li>
              )
            })
          )}
        </ul>

        <div className="cmdk__foot">
          {toast ? (
            <span className="cmdk__toast" role="status" aria-live="polite">{toast}</span>
          ) : (
            <span>↑↓ navigate · ↵ open · esc close</span>
          )}
        </div>
      </div>
    </div>
  )
}
