import { Globe, Smartphone, Cloud, Sparkles, Wrench, Compass } from "lucide-react";
import { SectionHeading, Reveal, GlassCard } from "./ui.jsx";
import { services } from "../data/content.js";

const ICONS = { Globe, Smartphone, Cloud, Sparkles, Wrench, Compass };

export default function Services() {
  return (
    <section id="services" className="section services">
      <SectionHeading
        index="02.5"
        kicker="What I do"
        title="Capabilities, not keywords."
        lede="Senior-level delivery across the whole stack — from pixels to production."
      />

      <div className="services-grid">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon] || Wrench;
          return (
            <Reveal key={s.title} delay={i * 0.05}>
              <GlassCard className="service-card">
                <div className="service-icon">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
