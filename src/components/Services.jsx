import { services } from "../data/content.js";

// One-size name columns: pure text, three columns, the right quarter left
// empty on purpose. The heading is the first line of the list itself.
export default function Services() {
  return (
    <section className="services" aria-label="What I do">
      <h2 className="head" data-reveal>
        What I do, <strong>honestly listed</strong>
      </h2>
      {services.map((s, i) => (
        <div className="service" key={s.name} data-reveal style={{ "--d": `${i * 55}ms` }}>
          <h3>{s.name}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </section>
  );
}
