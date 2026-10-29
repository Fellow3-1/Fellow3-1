import { useMemo, useRef, useState } from 'react'
import { brand, contact } from '../data/content.js'

/* The receipt survives yet another redesign: fill the slip, it prints
   into a ready-made email. Same proven flow, log-paper dressing. */

const RATES = { name: 40, work: 60, reach: 20 }

export default function Contact() {
  const [values, setValues] = useState({ name: '', work: '', reach: '' })
  const [confirmed, setConfirmed] = useState(false)
  const mailRef = useRef(null)

  const ready = contact.fields.every((f) => values[f.key].trim().length > 1)

  const mailto = useMemo(() => {
    const body = contact.fields.map((f) => `${f.label}: ${values[f.key].trim() || '—'}`).join('\n')
    return (
      `mailto:${brand.email}?` +
      `subject=${encodeURIComponent('New project: via Felloh 3.1')}` +
      `&body=${encodeURIComponent(body + '\n\n(printed from the receipt)')}`
    )
  }, [values])

  const total = contact.fields.reduce((sum, f) => sum + values[f.key].trim().length * RATES[f.key], 0)

  const buildReceipt = () => {
    if (!ready) return
    setConfirmed(true)
    window.setTimeout(() => mailRef.current?.focus(), 60)
  }

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 08 · contact
        </p>
        <div className="cta" data-reveal>
          <div>
            <h2 className="head">{contact.heading}</h2>
            <p className="cta__intro">{contact.intro}</p>
            {/* macOS window chrome: red/amber/green dots, glyphs reveal on group hover */}
            <div className="maclights" role="navigation" aria-label="Channels">
              {contact.pills.map((p) => (
                <a
                  key={p.label}
                  className={`macpill macpill--${p.dot}`}
                  href={p.href}
                  target={p.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={p.href.startsWith('mailto') ? undefined : 'noreferrer'}
                >
                  <span className="macpill__dot" data-glyph={p.glyph} aria-hidden="true" />
                  {p.label}
                </a>
              ))}
            </div>

            <form
              className="slip__form"
              onSubmit={(e) => {
                e.preventDefault()
                buildReceipt()
              }}
            >
              {contact.fields.map((f) => (
                <div className="field" key={f.key}>
                  <label className="field__label cap" htmlFor={`field-${f.key}`}>
                    {f.label}
                  </label>
                  <input
                    id={`field-${f.key}`}
                    name={f.key}
                    type={f.key === 'reach' ? 'email' : 'text'}
                    autoComplete={f.key === 'name' ? 'name' : 'off'}
                    placeholder={f.placeholder}
                    value={values[f.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  />
                </div>
              ))}
              <div>
                <button className="macpill macpill--green" type="submit" disabled={!ready}>
                  <span className="macpill__dot" data-glyph="+" aria-hidden="true" />
                  {confirmed ? contact.ctaDone : contact.ctaLabel}
                </button>
              </div>
            </form>
          </div>

          <div className={`slip__card${confirmed ? ' is-confirmed' : ''}`}>
            {/* window chrome: the receipt is a little mac window */}
            <div className="slip__chrome" aria-hidden="true">
              <span className="slip__light slip__light--red" />
              <span className="slip__light slip__light--amber" />
              <span className="slip__light slip__light--green" />
              <span className="slip__title">receipt.app</span>
            </div>
            <div className="slip__head">
              <p className="slip__brand">
                <img src="assets/favicon-joker.png" alt="" width="24" height="24" />
                {brand.name}
              </p>
              <p className="slip__stateline">
                {brand.person} · {brand.role} · {brand.city}
              </p>
            </div>

            <dl className="slip__sheet" aria-label="Receipt contents">
              {contact.fields.map((f) => (
                <div className="slip__row" key={f.key}>
                  <dt>{f.label}</dt>
                  <dd className="slip__fig">{values[f.key].trim() || '···'}</dd>
                </div>
              ))}
            </dl>

            <div className="slip__total">
              <span>total due</span>
              <b className="slip__fig">KES {total.toLocaleString('en-KE')}</b>
            </div>

            <div className="slip__bars" aria-hidden="true">
              {Array.from({ length: 42 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <p className="slip__num">№ F3-2026</p>

            {confirmed ? (
              <div className="slip__confirm" role="status">
                <b>{contact.confirmed[0]}</b>
                <span>{contact.confirmed[1]}</span>
                <p style={{ marginTop: '14px' }}>
                  <a className="macpill macpill--green" href={mailto} ref={mailRef}>
                    <span className="macpill__dot" data-glyph="+" aria-hidden="true" />
                    {contact.mailLabel}
                  </a>
                </p>
              </div>
            ) : (
              <p className="slip__idleshow">
                <b>{contact.idleshow[0]}</b>
                {contact.idleshow[1]}
              </p>
            )}
          </div>
        </div>
        <p className="cta__note" data-reveal>
          {contact.disclaimer}
        </p>
      </div>
    </section>
  )
}
