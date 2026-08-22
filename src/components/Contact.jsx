import { useEffect, useState } from "react";
import { Send, Copy, Check } from "lucide-react";
import { SectionHeading, Reveal, GlassCard } from "./ui.jsx";
import { socials, terminalScript } from "../data/content.js";

function Terminal() {
  const [out, setOut] = useState("");

  useEffect(() => {
    let cancelled = false;
    let text = "";
    const lines = [];
    terminalScript.forEach((row) => {
      lines.push(`$ ${row.cmd}`, row.out, "");
    });

    let idx = 0;
    const type = () => {
      if (cancelled) return;
      if (idx < lines.length) {
        text += (text ? "\n" : "") + lines[idx];
        idx += 1;
        setOut(text + "\n$ █");
        setTimeout(type, idx % 3 === 0 ? 340 : 160);
      } else {
        setOut(text + "\n$ █");
      }
    };
    type();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <GlassCard className="terminal" hover={false}>
      <div className="term-bar">
        <span />
        <span />
        <span />
        <p>felloh@nairobi:~</p>
      </div>
      <pre className="term-body">{out}</pre>
    </GlassCard>
  );
}

function ContactForm() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("felixodhiambo31@live.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable (e.g. non-secure context) */
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(form.message || "");
    window.location.href = `mailto:felixodhiambo31@live.com?subject=${subject}&body=${body}`;
  };

  return (
    <GlassCard className="contact-form" hover={false}>
      <p className="panel-kicker">// open a channel</p>
      <h3>Start something crispy.</h3>
      <form onSubmit={submit}>
        <label>
          <span>Name</span>
          <input
            type="text"
            placeholder="Operator name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          <span>Message</span>
          <textarea
            rows={4}
            placeholder="What are we building?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <Send size={15} /> Send via email
          </button>
          <button type="button" className="btn btn-ghost" onClick={copyEmail}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
      </form>
    </GlassCard>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <SectionHeading
        index="05"
        kicker="Signal"
        title="Open a channel."
        lede="For roles, consulting, or open-source collaboration — Nairobi is online."
      />
      <div className="contact-grid">
        <Reveal>
          <Terminal />
        </Reveal>
        <div className="contact-side">
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.14}>
            <div className="signal-links">
              {socials.map((s) =>
                s.href ? (
                  <a
                    key={s.label}
                    className="glass link-card"
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <span>{s.label}</span>
                    <strong>{s.value}</strong>
                  </a>
                ) : (
                  <div key={s.label} className="glass link-card">
                    <span>{s.label}</span>
                    <strong>{s.value}</strong>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
