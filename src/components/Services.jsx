import { Globe, Smartphone, Cloud, Sparkles, Wrench, Compass } from "lucide-react";
import { SectionHeading, Reveal, Panel } from "./ui.jsx";
import { services } from "../data/content.js";

const ICONS = { Globe, Smartphone, Cloud, Sparkles, Wrench, Compass };

/** Services presented as systemd units — enabled and running. */
export default function Services() {
  return (
    <section id="services" className="section services">
      <SectionHeading
        index="02.5"
        kicker="systemctl list-units"
        title="Capabilities, not keywords."
        lede="Senior-level delivery across the whole stack — from pixels to production."
      />

      <div className="services-grid">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon] || Wrench;
          const unit = s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          return (
            <Reveal key={s.title} delay={i * 0.05}>
              <Panel className="service-card">
                <div className="service-head">
                  <div className="service-icon">
                    <Icon size={21} strokeWidth={1.6} />
                  </div>
                  <span className="service-unit">
                    {unit}.service
                    <em>
                      <span className="live-dot" aria-hidden="true" /> enabled · running
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
