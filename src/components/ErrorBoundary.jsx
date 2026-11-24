import { Component } from 'react'

/* A render error anywhere in the tree used to unmount the whole page and leave
   the root empty — the same blank sheet the boot watchdog in index.html guards
   against, but caused by our own code instead of a failed request. This keeps
   the contact details on screen and gives the visitor a way back. */

export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error, info) {
    /* surface the real error in development; never in a visitor's console */
    if (import.meta.env?.DEV) console.error('portfolio render failed', error, info)
  }

  render() {
    if (!this.state.failed) return this.props.children

    const box = {
      maxWidth: '42rem',
      margin: '0 auto',
      padding: 'clamp(3rem, 10vh, 7rem) 1.5rem 4rem',
      fontFamily:
        "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
      lineHeight: 1.6,
      color: '#111318',
      background: '#f6f6f3',
    }
    const link = { color: '#111318', textDecoration: 'underline' }

    return (
      <main style={box} role="alert">
        <p
          style={{
            fontSize: '12px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#5f6068',
            margin: 0,
          }}
        >
          Felloh 3.1 · engineering log
        </p>
        <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', lineHeight: 1.15, margin: '0.6rem 0 1rem' }}>
          The page hit an error while rendering.
        </h1>
        <p style={{ maxWidth: '58ch' }}>
          A reload usually clears it. If it keeps happening, the contact details
          below do not depend on the page working.
        </p>
        <ul style={{ margin: '1.2rem 0', paddingInlineStart: '1.2rem' }}>
          <li><a style={link} href="mailto:felixodhiambo31@live.com">felixodhiambo31@live.com</a></li>
          <li><a style={link} href="https://github.com/Fellow3-1" rel="noreferrer">github.com/Fellow3-1</a></li>
          <li><a style={link} href="https://linkedin.com/in/felloh31" rel="noreferrer">linkedin.com/in/felloh31</a></li>
        </ul>
        <p style={{ marginTop: '2rem' }}>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              font: 'inherit',
              padding: '10px 16px',
              border: '1px solid rgba(17, 19, 24, 0.18)',
              borderRadius: 8,
              background: '#ffffff',
              color: '#111318',
              cursor: 'pointer',
            }}
          >
            Reload the page
          </button>
        </p>
      </main>
    )
  }
}
