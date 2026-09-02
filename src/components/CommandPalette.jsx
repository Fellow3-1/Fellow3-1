import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CornerDownLeft } from "lucide-react";
import { commands } from "../data/content.js";
import { Kbd } from "./ui.jsx";
import { useSfx } from "../hooks.js";

/**
 * ⌘K command palette — the signature Nexus OS interaction.
 * Arrow keys navigate, Enter runs, Esc closes. Focus is trapped while open
 * and restored to the invoking element on close. Body scroll is locked.
 */
export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const play = useSfx();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      // Wait a frame so the dialog exists before focusing.
      requestAnimationFrame(() => inputRef.current?.focus());
      const scrollbar = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbar}px`;
      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }
    return undefined;
  }, [open]);

  const run = useCallback(
    (cmd) => {
      if (!cmd) return;
      play("launch");
      const target = cmd.run();
      onClose();
      if (!target) return;
      if (target.startsWith("#")) {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (target.endsWith(".txt")) {
        const a = document.createElement("a");
        a.href = target;
        a.download = "";
        a.click();
      } else {
        window.open(target, "_blank", "noreferrer");
      }
    },
    [onClose, play],
  );

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      play("confirm");
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[cursor]);
    } else if (e.key === "Tab") {
      // Minimal focus trap: the input is the only tab stop while open.
      e.preventDefault();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    setCursor(0);
  }, [query]);

  // Keep the active row visible while arrowing through a long list.
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [cursor, results]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="cmdk"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="cmdk-bar">
              <Search size={15} aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search this site…"
                aria-label="Command search"
                autoComplete="off"
                spellCheck="false"
              />
              <Kbd>ESC</Kbd>
            </div>
            <ul className="cmdk-list" ref={listRef} role="listbox" aria-label="Commands">
              {results.length === 0 && <li className="cmdk-empty">Nothing found — try “projects”</li>}
              {results.map((c, i) => (
                <li
                  key={c.id}
                  role="option"
                  aria-selected={i === cursor}
                  data-active={i === cursor}
                  className="cmdk-item"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => run(c)}
                >
                  <span className="cmdk-label">{c.label}</span>
                  <span className="cmdk-hint">{c.hint}</span>
                  {c.kbd ? <Kbd>{c.kbd}</Kbd> : null}
                  {i === cursor ? <CornerDownLeft size={13} className="cmdk-enter" aria-hidden="true" /> : null}
                </li>
              ))}
            </ul>
            <div className="cmdk-foot" aria-hidden="true">
              <span>
                <Kbd>↑</Kbd> <Kbd>↓</Kbd> move
              </span>
              <span>
                <Kbd>↵</Kbd> open
              </span>
              <span className="cmdk-brand">Quick search</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
