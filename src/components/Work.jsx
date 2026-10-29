import { useRef, useState } from "react";
import { projects } from "../data/content.js";

// Big names, fixed preview: the names are the index; the hovered or focused
// row lights the preview frame level with it (the frame follows the row,
// never the pointer). Touch and narrow screens get each still above its name.
export default function Work() {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const [active, setActive] = useState(-1);

  const show = (i, row) => {
    const frame = frameRef.current;
    const root = rootRef.current;
    if (frame && root) {
      const y = row.offsetTop + row.offsetHeight / 2 - frame.offsetHeight / 2;
      const max = Math.max(0, root.offsetHeight - frame.offsetHeight);
      frame.style.transform = `translateY(${Math.min(max, Math.max(0, y))}px)`;
    }
    setActive(i);
  };

  const hide = () => setActive(-1);

  return (
    <section className="work" id="work" aria-label="Selected work" ref={rootRef}>
      <h2 className="head" data-reveal>
        Work
      </h2>

      <ul
        className="work__list"
        onPointerLeave={hide}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) hide();
        }}
      >
        {projects.map((p, i) => (
          <li key={p.name} data-reveal style={{ "--d": `${i * 60}ms` }}>
            <a
              className="work__row"
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={(e) => show(i, e.currentTarget)}
              onFocus={(e) => show(i, e.currentTarget)}
            >
              <img
                className="work__thumb"
                src={p.image}
                alt={`${p.title}, a still from the project`}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
              />
              <span className="work__name">{p.name}</span>
              <small>
                {p.lang}
                {p.detail ? ` · ${p.detail}` : ""}
              </small>
              <svg
                className="work__go"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 17 7" />
                <path d="M9 7h8v8" />
              </svg>
            </a>
          </li>
        ))}
      </ul>

      <div className={`work__frame${active >= 0 ? " is-open" : ""}`} ref={frameRef} aria-hidden="true">
        {active >= 0 && (
          <figure key={projects[active].name}>
            <img src={projects[active].image} alt="" width={projects[active].w} height={projects[active].h} />
            <figcaption>
              <p className="work__frame-title">{projects[active].title}</p>
              <p className="work__frame-desc">{projects[active].description}</p>
              {projects[active].detail && (
                <p className="work__frame-detail">{projects[active].detail}</p>
              )}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
