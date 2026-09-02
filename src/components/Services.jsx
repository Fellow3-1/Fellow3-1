import { Globe, Smartphone, Cloud, Sparkles, Wrench, Compass } from "lucide-react";
import { SectionHeading, Reveal, Panel } from "./ui.jsx";
import { services } from "../data/content.js";

const ICONS = { Globe, Smartphone, Cloud, Sparkles, Wrench, Compass };

/** Plain-language list of what Felix offers. */
export default function Services() {
  return (
    <section id="services" className="section services">
      <SectionHeading
        index="03"
        kicker="What I can do for you"
        title="How I can help."
        lede="Whatever the project, you get one person who can take it from idea to launch."
      />

      <div className="services-grid">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon] || Wrench;
          return (
            <Reveal key={s.title} delay={i * 0.05}>
              <Panel className="service-card">
                <div className="service-head">
                  <div className="service-icon">
                    <Icon size={21} strokeWidth={1.6} />
                  </div>
                  <span className="service-unit">
                    <em>
                      <span className="live-dot" aria-hidden="true" /> Available
                    </em>
                  </span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Panel>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
