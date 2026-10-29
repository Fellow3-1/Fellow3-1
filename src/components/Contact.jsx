import { useMemo, useRef, useState } from 'react'
import { contact, profile } from '../data/content.js'

/* The receipt: fill the slip, build it, and it prints itself into a
   ready-made email. Same proven flow, re-papered for the plum chapter. */

const RATES = { name: 40, work: 60, reach: 20 }

export default function Contact() {
  const [values, setValues] = useState({ name: '', work: '', reach: '' })
  const [confirmed, setConfirmed] = useState(false)
  const mailRef = useRef(null)

  const ready = contact.fields.every((f) => values[f.key].trim().length > 1)

  const mailto = useMemo(() => {
    const body = contact.fields
      .map((f) => `${f.label}: ${values[f.key].trim() || '—'}`)
      .join('\n')
    return (
      `mailto:${profile.email}?` +
      `subject=${encodeURIComponent('New project — via felloh.dev')}` +
      `&body=${encodeURIComponent(body + '\n\n— printed from the receipt')}`
    )
  }, [values])

  const total = contact.fields.reduce((sum, f) => sum + values[f.key].trim().length * RATES[f.key], 0)

  const buildReceipt = () => {
    if (!ready) return
    setConfirmed(true)
    window.setTimeout(() => mailRef.current?.focus(), 60)
  }

  return (
    <section className="section chapter chapter--plum" id="contact">
      <div className="crows">
        <h2 className="crow" data-reveal>
          {contact.hello}
        </h2>
        {contact.rows.map((r) =>
          r.href ? (
            <a className="crow" key={r.label} href={r.href} data-reveal>
              <span className="cap">{r.label}</span>
              {r.value}
            </a>
          ) : (
            <p className="crow" key={r.label} data-reveal>
              <span className="cap">{r.label}</span>
              {r.value}
            </p>
          ),
        )}
      </div>

      <p className="contact__intro" data-reveal>
        {contact.receiptIntro}
      </p>

      <div className={`slip${confirmed ? ' is-confirmed' : ''}`}>
        <div className="slip__card" data-reveal>
          <div className="slip__head">
            <p className="slip__brand">{profile.brand}</p>
            <p className="slip__stateline">
              {profile.role} · {profile.city}
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
              <b>CONFIRMED</b>
              <span>Ready to post — one tap opens your email app.</span>
              <a
                className="btn"
                style={{ marginTop: '16px', background: '#0d060b', borderColor: '#0d060b' }}
                href={mailto}
                ref={mailRef}
              >
                Open in your email app
              </a>
            </div>
          ) : (
            <p className="slip__idleshow">
              <b>Nothing printed yet.</b>
              Fill the three lines and this slip prints itself.
            </p>
          )}
        </div>

        <form
          className="slip__form"
          data-reveal
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
          <div className="slip__formfoot">
            <button className="btn btn--inverse" type="submit" disabled={!ready}>
              {confirmed ? 'Printed — edit & rebuild' : 'Build the receipt'}
            </button>
          </div>
          <p className="slip__note">{contact.note}</p>
        </form>
      </div>
    </section>
  )
}
