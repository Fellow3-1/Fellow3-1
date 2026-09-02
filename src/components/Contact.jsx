import { useEffect, useRef, useState } from "react";
import { Send, Copy, Check, TerminalSquare } from "lucide-react";
import { SectionHeading, Reveal, Panel } from "./ui.jsx";
import { socials, termCommands } from "../data/content.js";
import { useSfx } from "../hooks.js";

const EMAIL = "felixodhiambo31@live.com";
const BANNER = ["Curious? This is a mini command line — just for fun.", "Type help and press enter to see what it can do."];

/**
 * A REAL terminal, not a scripted loop: a stateful line-reader with a
 * command registry, history (↑/↓), tab-completion, and autoscroll.
 * Announces output politely to screen readers via aria-live.
 */
function Terminal() {
  const [lines, setLines] = useState(BANNER);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const play = useSfx();

  const print = (out) => setLines((prev) => [...prev, ...(Array.isArray(out) ? out : [out])]);

  useEffect(() => {
    // Keep the latest line in view as output streams in.
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const exec = (raw) => {
    const input = raw.trim();
    print(`you: ${input}`);
    if (!input) return;
    setHistory((h) => [...h, input]);
    setHistIndex(-1);
    const [cmd, ...args] = input.split(/\s+/);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "sudo") {
      print(["Nice try — this one runs on trust and coffee."]);
      return;
    }
    if (cmd === "open" && args[0]?.startsWith("mailto")) {
      window.location.href = `mailto:${EMAIL}`;
      return;
    }
    const fn = termCommands[cmd];
    if (fn) {
      play("confirm");
      print(fn(args));
    } else {
      print([`I don\u2019t know "${cmd}" — type help to see the options.`]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      play("key");
      exec(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = histIndex < 0 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex < 0) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(-1);
        setValue("");
      } else {
        setHistIndex(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(termCommands).find((c) => c.startsWith(value.trim()) && value.trim());
      if (match) setValue(`${match} `);
    }
  };

  return (
    <Panel className="terminal" hover={false}>
      <div className="term-bar">
        <span className="term-dot td-r" />
        <span className="term-dot td-y" />
        <span className="term-dot td-g" />
        <p>Mini terminal</p>
        <span className="term-badge">
          <TerminalSquare size={11} aria-hidden="true" /> Just for fun
        </span>
      </div>
      <div
        className="term-body"
        ref={bodyRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        role="log"
        aria-live="polite"
        aria-label="Interactive terminal"
      >
        {lines.map((l, i) => (
          <p key={i} className={l.startsWith("you:") ? "term-cmd" : ""}>
            {l || "\u00A0"}
          </p>
        ))}
        <div className="term-input-row">
          <span aria-hidden="true">you:</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="help"
            aria-label="Terminal input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            enterKeyHint="send"
          />
        </div>
      </div>
    </Panel>
  );
}

function ContactForm() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
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
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Panel className="contact-form" hover={false}>
      <p className="panel-kicker">Send a message</p>
      <h3>Let's build something.</h3>
      <form onSubmit={submit}>
        <label>
          <span>Name</span>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label>
          <span>Message</span>
          <textarea
            rows={4}
            placeholder="Tell me a little about your project"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <Send size={15} /> Send message
          </button>
          <button type="button" className="btn btn-ghost" onClick={copyEmail}>
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
      </form>
    </Panel>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <SectionHeading
        index="08"
        kicker="Get in touch"
        title="Say hello."
        lede="Got a project, a role, or just a question? I read every message."
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
                    className="panel link-card"
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    <span>{s.label}</span>
                    <strong>{s.value}</strong>
                  </a>
                ) : (
                  <div key={s.label} className="panel link-card">
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
