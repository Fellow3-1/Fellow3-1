import { useRef, useState } from "react";
import { profile, receiptNeeds, socials } from "../data/content.js";

// M-PESA-style receipt codes: ten characters, no lookalikes (0/O, 1/I).
function receiptNo() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const buf = new Uint32Array(10);
  (window.crypto || {}).getRandomValues
    ? window.crypto.getRandomValues(buf)
    : buf.forEach((_, i) => (buf[i] = Math.floor(Math.random() * 2 ** 32)));
  return Array.from(buf, (n) => chars[n % chars.length]).join("");
}

function nairobiTime() {
  try {
    return new Intl.DateTimeFormat("en-KE", {
      timeZone: profile.timeZone,
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());
  } catch {
    return new Date().toLocaleString();
  }
}

// The live thing. The artefact Felix's most-reused code produces, the
// M-PESA payment confirmation, becomes the way a visitor opens a
// conversation: type a name, pick a need, and a confirmation prints.
// Nothing is fake: "Send it" opens the visitor's mail app with the receipt
// already written, and the plain email address is right above it.
export default function Contact() {
  const [name, setName] = useState("");
  const [need, setNeed] = useState(receiptNeeds[0]);
  const [receipt, setReceipt] = useState(null);
  const [copied, setCopied] = useState(false);
  const receiptRef = useRef(null);

  const print = (e) => {
    e.preventDefault();
    const r = { no: receiptNo(), date: nairobiTime(), name: name.trim() || "A new client", need };
    setReceipt(r);
    setCopied(false);
    requestAnimationFrame(() => {
      receiptRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      receiptRef.current?.querySelector(".receipt__status")?.focus?.();
    });
  };

  const receiptText = receipt
    ? [
        "CONFIRMATION",
        `Receipt No.: ${receipt.no}`,
        `Date: ${receipt.date} (Nairobi)`,
        `From: ${receipt.name}`,
        `To: ${profile.realName}`,
        `For: ${receipt.need}`,
        "Status: CONFIRMED",
        "Asante sana. I reply within one working day.",
      ].join("\n")
    : "";

  const mailto = receipt
    ? `mailto:${profile.email}?subject=${encodeURIComponent(
        `New project: ${receipt.need} for ${receipt.name} (ref ${receipt.no})`
      )}&body=${encodeURIComponent(receiptText + "\n\nMy message:\n")}`
    : `mailto:${profile.email}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(receiptText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="contact" id="contact" aria-label="Get in touch">
      <p className="contact__lead" data-reveal>
        Get in touch · {profile.location}, {profile.utc}
      </p>
      <h2 className="contact__email" data-reveal style={{ "--d": "90ms" }}>
        <a href={`mailto:${profile.email}`}>felixodhiambo31@live.com</a>
      </h2>
      <p className="contact__note" data-reveal style={{ "--d": "180ms" }}>
        {profile.availability}
      </p>
      <ul className="contact__links" data-reveal style={{ "--d": "270ms" }}>
        {socials.map((s) => (
          <li key={s.label}>
            <span>{s.label}</span>
            <a href={s.href}>{s.value}</a>
          </li>
        ))}
      </ul>

      <div className="receipt-block" data-reveal>
        <form className="receipt-form" onSubmit={print}>
          <h3>Or start the way a good payment ends, with a confirmation.</h3>
          <p>
            Tell me who you are and what you need. The confirmation prints instantly, and sending it is
            one tap.
          </p>

          <fieldset>
            <legend>Your name</legend>
            <label htmlFor="receipt-name" className="sr-only">
              Your name
            </label>
            <input
              id="receipt-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Wanjiku from Acme"
              autoComplete="name"
              maxLength={60}
            />
          </fieldset>

          <fieldset>
            <legend id="receipt-need-label">What do you need?</legend>
            <div className="receipt-needs" role="group" aria-labelledby="receipt-need-label">
              {receiptNeeds.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={need === n}
                  onClick={() => setNeed(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          <button className="receipt-submit button" type="submit">
            Print my confirmation
          </button>
        </form>

        {receipt && (
          <div className="receipt" ref={receiptRef} role="status" data-printing data-ui>
            <p className="receipt__top" style={{ "--i": 0 }}>
              <span>Confirmation</span>
              <span className="receipt__no">{receipt.no}</span>
            </p>
            <hr // taste-skill-ignore: the dashed tear line is a real receipt's own convention
 style={{ "--i": 1 }} />
            <dl style={{ "--i": 2 }}>
              <dt>Date</dt>
              <dd>{receipt.date}</dd>
              <dt>From</dt>
              <dd>{receipt.name}</dd>
              <dt>To</dt>
              <dd>{profile.realName}</dd>
              <dt>For</dt>
              <dd>{receipt.need}</dd>
            </dl>
            <div className="receipt__status" style={{ "--i": 3 }} tabIndex={-1}>
              CONFIRMED
            </div>
            <p className="receipt__thanks" style={{ "--i": 4 }}>
              Asante sana. Thank you, and expect a reply within one working day.
            </p>
            <div className="receipt__actions" style={{ "--i": 5 }}>
              <a className="send button" href={mailto}>
                Send it to Felix
              </a>
              <button className="copy" type="button" onClick={copy}>
                {copied ? "Copied" : "Copy the text"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
