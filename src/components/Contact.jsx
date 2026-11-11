import { useMemo, useRef, useState } from 'react'
import { brand, contact } from '../data/content.js'

/* The receipt survives yet another redesign: fill the slip, it prints
   into a ready-made email. Same proven flow, log-paper dressing.

   Nothing is sent to this site. The form validates on submit (so the
   button is never silently disabled), then hands the visitor two ways
   out: open the mail app, or copy the draft if there is no mail app. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const LIMITS = { name: 80, work: 800, reach: 160 }

const trim = (value) => value.trim()

export function validateDraft(values) {
  const errors = {}
  const name = trim(values.name)
  const work = trim(values.work)
  const reach = trim(values.reach)

  if (name.length < 2) errors.name = 'Add the name the reply should be addressed to.'
  else if (name.length > LIMITS.name) errors.name = `Keep this under ${LIMITS.name} characters.`

  if (work.length < 4) errors.work = 'A line about the role, project or requirement.'
  else if (work.length > LIMITS.work) errors.work = `Keep this under ${LIMITS.work} characters.`

  if (!reach) errors.reach = 'An address to reply to.'
  else if (reach.length > LIMITS.reach) errors.reach = `Keep this under ${LIMITS.reach} characters.`
  else if (!EMAIL_RE.test(reach)) errors.reach = 'This address is missing an @ or a domain, like you@company.com.'

  return errors
}

/* `initialValues` exists so the smoke tests can mount the slip with a
   complete draft; the app itself never passes it. */
export default function Contact({ initialValues }) {
  const [values, setValues] = useState(() => ({ name: '', work: '', reach: '', ...initialValues }))
  const [errors, setErrors] = useState({})
  const [confirmed, setConfirmed] = useState(false)
  const [copied, setCopied] = useState('')
  const mailRef = useRef(null)
  const fieldRefs = useRef({})

  const draftBody = useMemo(
    () =>
      contact.fields
        .map((f) => `${f.label}: ${trim(values[f.key]) || '—'}`)
        .join('\n'),
    [values]
  )

  const mailto = useMemo(
    () =>
      `mailto:${brand.email}?` +
      `subject=${encodeURIComponent('New project: via Felloh 3.1')}` +
      `&body=${encodeURIComponent(draftBody + '\n\n(printed from the receipt)')}`,
    [draftBody]
  )

  const update = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }))
    setCopied('')
    /* the draft described the old text; make the visitor print it again */
    setConfirmed(false)
    /* clear the complaint as soon as the visitor starts fixing the field */
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  const buildReceipt = () => {
    const found = validateDraft(values)
    const firstBad = contact.fields.find((f) => found[f.key])

    if (firstBad) {
      setErrors(found)
      setConfirmed(false)
      setCopied('')
      fieldRefs.current[firstBad.key]?.focus()
      return
    }

    setErrors({})
    setCopied('')
    setConfirmed(true)
    window.setTimeout(() => mailRef.current?.focus(), 60)
  }

  const copyDraft = async () => {
    const text = `${draftBody}\n\n(printed from the receipt)`
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(text)
      setCopied('draft copied to the clipboard')
    } catch {
      setCopied('copy blocked by the browser — use “open email draft”.')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <p className="logmark" data-reveal>
          <b>[log]</b> 10 · contact
        </p>
        <div className="cta" data-reveal>
          <div>
            <h2 className="head">{contact.heading}</h2>
            <p className="cta__intro">{contact.intro}</p>
            {/* macOS window chrome: red/amber/green dots, glyphs reveal on group hover */}
            <nav className="maclights" aria-label="Channels">
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
            </nav>
            <p className="cta__direct">
              {contact.directLabel}{' '}
              <a className="alink" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </p>

            <form
              className="slip__form"
              noValidate
              aria-describedby="slip-hint"
              onSubmit={(e) => {
                e.preventDefault()
                buildReceipt()
              }}
            >
              {contact.fields.map((f) => {
                const error = errors[f.key]
                return (
                  <div className={`field${error ? ' field--bad' : ''}`} key={f.key}>
                    <label className="field__label cap" htmlFor={`field-${f.key}`}>
                      {f.label}
                    </label>
                    <input
                      id={`field-${f.key}`}
                      name={f.key}
                      type={f.key === 'reach' ? 'email' : 'text'}
                      required
                      maxLength={LIMITS[f.key]}
                      autoComplete={f.key === 'name' ? 'name' : f.key === 'reach' ? 'email' : 'off'}
                      placeholder={f.placeholder}
                      value={values[f.key]}
                      aria-invalid={error ? 'true' : undefined}
                      aria-describedby={error ? `field-${f.key}-error` : undefined}
                      ref={(el) => {
                        fieldRefs.current[f.key] = el
                      }}
                      onChange={(e) => update(f.key, e.target.value)}
                    />
                    {error ? (
                      <p className="field__err" id={`field-${f.key}-error`} role="alert">
                        {error}
                      </p>
                    ) : null}
                  </div>
                )
              })}

              <div className="slip__actions">
                <button className="macpill macpill--green" type="submit">
                  <span className="macpill__dot" data-glyph="+" aria-hidden="true" />
                  {confirmed ? contact.ctaDone : contact.ctaLabel}
                </button>

                {confirmed ? (
                  <>
                    <a className="macpill macpill--green" href={mailto} ref={mailRef}>
                      <span className="macpill__dot" data-glyph="+" aria-hidden="true" />
                      {contact.mailLabel}
                    </a>
                    <button className="macpill" type="button" onClick={copyDraft}>
                      <span className="macpill__dot" data-glyph="−" aria-hidden="true" />
                      {contact.copyLabel}
                    </button>
                  </>
                ) : null}
              </div>

              <p className="slip__hint" id="slip-hint">
                {contact.hint}
              </p>
              <p className="slip__result" role="status" aria-live="polite">
                {copied}
              </p>
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
                  <dd className="slip__fig">{trim(values[f.key]) || '···'}</dd>
                </div>
              ))}
            </dl>

            <div className="slip__total">
              <span>status</span>
              <b className="slip__fig">email draft</b>
            </div>

            <div className="slip__bars" aria-hidden="true">
              {Array.from({ length: 42 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <p className="slip__num">LOCAL DRAFT</p>

            {confirmed ? (
              <div className="slip__confirm" role="status">
                <b>{contact.confirmed[0]}</b>
                <span>{contact.confirmed[1]}</span>
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
