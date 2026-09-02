import { Github, GitFork, Star, Users, Trophy, Hourglass, FolderGit2, Wallet } from "lucide-react";
import { SectionHeading, Reveal, Panel, Counter } from "./ui.jsx";
import { stats, achievements } from "../data/content.js";

const STAT_ICONS = [Hourglass, FolderGit2, Users, Wallet];

export default function Stats() {
  return (
    <section id="stats" className="section stats">
      <SectionHeading index="05" kicker="By the numbers" title="A quick snapshot." />
      <div className="stat-grid">
        {stats.map((s, i) => {
          const StatIcon = STAT_ICONS[i % STAT_ICONS.length];
          return (
            <Reveal key={s.label} delay={i * 0.06}>
              <Panel className="stat-card">
                <div className="stat-top">
                  <p>{s.label}</p>
                  <span className="stat-icon" aria-hidden="true">
                    <StatIcon size={15} strokeWidth={2} />
                  </span>
                </div>
                <strong>
                  <Counter to={s.value} suffix={s.suffix} />
                </strong>
                <span>{s.note}</span>
              </Panel>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="achievements">
        <span className="ach-label">
          <Trophy size={14} /> Highlights
        </span>
        {achievements.map((a) => (
          <span key={a} className="achievement">
            <Star size={12} /> {a}
          </span>
        ))}
        <span className="achievement">
          <GitFork size={12} /> Payment tool reused by 34 teams
        </span>
        <span className="achievement">
          <Users size={12} /> 39 developers following
        </span>
        <a className="achievement achievement-link" href="https://github.com/Fellow3-1" target="_blank" rel="noreferrer">
          <Github size={12} /> See it on GitHub
        </a>
      </Reveal>
    </section>
  );
}
