import { GraduationCap, Award, BadgeCheck, Layers } from "lucide-react";
import { SectionHeading, Reveal, GlassCard } from "./ui.jsx";
import { education } from "../data/content.js";

const ICONS = { Program: GraduationCap, Certification: Award, Cohort: BadgeCheck };
const DEFAULT_ICON = Layers;

export default function Education() {
  return (
    <section id="education" className="section education">
      <SectionHeading
        index="04.75"
        kicker="Education & credentials"
        title="Formally trained, self-forged."
      />
      <div className="edu-grid">
        {education.map((e, i) => {
          const Icon = ICONS[e.type] || DEFAULT_ICON;
          return (
            <Reveal key={e.title} delay={i * 0.06}>
              <GlassCard className="edu-card">
                <div className="edu-icon">
                  <Icon size={20} strokeWidth={1.6} />
                </div>
                <p className="panel-kicker">{e.type}</p>
                <h3>{e.title}</h3>
                <span className="edu-org">{e.org}</span>
                <p>{e.body}</p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
