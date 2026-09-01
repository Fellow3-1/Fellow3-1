import { Reveal, SectionHeading, Panel, Chip } from "./ui.jsx";
import { profile } from "../data/content.js";
import { useUptime } from "../hooks.js";

const FACTS = [
  ["working_on", "Full-stack web + mobile"],
  ["learning", "AI / LLM · Cloud-native"],
  ["open_to", "Senior roles · OSS · Dev tools"],
  ["editor", "Neovim (btw)"],
  ["armor", "Docker & Kubernetes"],
];

export default function About() {
  const uptime = useUptime();
  return (
    <section id="about" className="section about">
      <SectionHeading
        index="01"
        kicker="whoami"
        title="A transmission from the Unboxed."
        lede="Senior engineer by trade, tinkerer by instinct."
      />

      <div className="about-grid">
        <Reveal>
          <Panel className="about-panel">
            <p className="panel-kicker">{"// dossier"}</p>
            <h3 className="about-name">
              {profile.handle}
              <span> — {profile.realName}</span>
            </h3>
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="fun">fun_fact: coffee goes in. clean, efficient, readable code comes out.</p>
            <ul className="chips">
              <Chip>@BuildForSDG</Chip>
              <Chip>OSAM-ASSOCIATES</Chip>
              <Chip>GitHub Developer Program</Chip>
              <Chip>Nairobi · UTC+3</Chip>
            </ul>
          </Panel>
        </Reveal>

        <div className="about-side">
          <Reveal delay={0.1}>
            <Panel className="status-panel">
              <p className="panel-kicker">{"// live status"}</p>
              <ul className="status-list">
                {FACTS.map(([k, v]) => (
                  <li key={k}>
                    <span>{k}</span>
                    <strong>{v}</strong>
                  </li>
                ))}
                <li>
                  <span>session_uptime</span>
                  <strong className="mono">{uptime || "—"}</strong>
                </li>
              </ul>
            </Panel>
          </Reveal>

          <Reveal delay={0.18}>
            <Panel className="portrait-panel">
              <img
                src="https://avatars.githubusercontent.com/u/9266440?v=4"
                alt={profile.handle}
                loading="lazy"
                decoding="async"
                width="72"
                height="72"
                onError={(e) => (e.currentTarget.src = "assets/crest.png")}
              />
              <div>
                <strong>House Android · The Unboxed</strong>
                <span>{profile.availability}</span>
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
