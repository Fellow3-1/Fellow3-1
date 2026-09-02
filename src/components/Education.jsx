import { GraduationCap, Award, BadgeCheck, Layers } from "lucide-react";
import { SectionHeading, Reveal, Panel } from "./ui.jsx";
import { education } from "../data/content.js";

const ICONS = { Program: GraduationCap, Certification: Award, Cohort: BadgeCheck };
const DEFAULT_ICON = Layers;

export default function Education() {
  return (
    <section id="education" className="section education">
      <SectionHeading index="07" kicker="Training" title="Where I learned it." />
      <div className="edu-grid">
        {education.map((e, i) => {
          const Icon = ICONS[e.type] || DEFAULT_ICON;
          return (
            <Reveal key={e.title} delay={i * 0.06}>
              <Panel className="edu-card">
                <div className="edu-head">
                  <div className="edu-icon">
                    <Icon size={19} strokeWidth={1.6} />
                  </div>
                  <p className="panel-kicker">{e.type}</p>
                </div>
                <h3>{e.title}</h3>
                <span className="edu-org">{e.org}</span>
                <p>{e.body}</p>
              </Panel>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
