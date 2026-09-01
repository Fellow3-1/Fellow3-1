import { Github, GitFork, Star, Users, Trophy } from "lucide-react";
import { SectionHeading, Reveal, Panel, Counter } from "./ui.jsx";
import { stats, achievements } from "../data/content.js";

export default function Stats() {
  return (
    <section id="stats" className="section stats">
      <SectionHeading index="03.5" kicker="telemetry" title="Signals from the network." />
      <div className="stat-grid">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <Panel className="stat-card">
              <p>{s.label}</p>
              <strong>
                <Counter to={s.value} suffix={s.suffix} />
              </strong>
              <span>{s.note}</span>
            </Panel>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="achievements">
        <span className="ach-label">
          <Trophy size={14} /> achievements
        </span>
        {achievements.map((a) => (
          <span key={a} className="achievement">
            <Star size={12} /> {a}
          </span>
        ))}
        <span className="achievement">
          <GitFork size={12} /> 34 forks on mpesa-api-go
        </span>
        <span className="achievement">
          <Users size={12} /> 39 followers
        </span>
        <a className="achievement achievement-link" href="https://github.com/Fellow3-1" target="_blank" rel="noreferrer">
          <Github size={12} /> verify on GitHub
        </a>
      </Reveal>
    </section>
  );
}
