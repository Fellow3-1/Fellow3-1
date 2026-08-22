import { Reveal, SectionHeading, GlassCard, Chip } from "./ui.jsx";
import { profile } from "../data/content.js";

const FACTS = [
  ["Working on", "Full-stack web + mobile"],
  ["Learning", "AI / LLM · Cloud-native"],
  ["Open to", "Senior roles · OSS · Dev tools"],
  ["Weapon", "Neovim & TypeScript"],
  ["Armor", "Docker & Kubernetes"],
];

export default function About() {
  return (
    <section id="about" className="section about">
      <SectionHeading
        index="01"
        kicker="Identity"
        title="A transmission from the Unboxed."
        lede="Senior engineer by trade, tinkerer by instinct."
      />

      <div className="about-grid">
        <Reveal>
          <GlassCard className="about-panel">
            <p className="panel-kicker">// dossier</p>
            <h3 className="about-name">
              {profile.handle}
              <span> — {profile.realName}</span>
            </h3>
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="fun">Fun fact: coffee goes in. Clean, efficient, readable code comes out.</p>
            <ul className="chips">
              <Chip>@BuildForSDG</Chip>
              <Chip>OSAM-ASSOCIATES</Chip>
              <Chip>GitHub Developer Program</Chip>
              <Chip>Nairobi · UTC+3</Chip>
            </ul>
          </GlassCard>
        </Reveal>

        <div className="about-side">
          <Reveal delay={0.1}>
            <GlassCard className="status-panel">
              <p className="panel-kicker">// live status</p>
              <ul className="status-list">
                {FACTS.map(([k, v]) => (
                  <li key={k}>
                    <span>{k}</span>
                    <strong>{v}</strong>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.18}>
            <GlassCard className="portrait-panel">
              <img
                src="https://avatars.githubusercontent.com/u/9266440?v=4"
                alt={profile.handle}
                loading="lazy"
                decoding="async"
                onError={(e) => (e.currentTarget.src = "assets/crest.png")}
              />
              <div>
                <strong>House Android · The Unboxed</strong>
                <span>{profile.availability}</span>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
