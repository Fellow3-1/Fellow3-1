import { Reveal, SectionHeading, Panel, Chip } from "./ui.jsx";
import { profile } from "../data/content.js";
import { useUptime } from "../hooks.js";

const FACTS = [
  ["Working on", "Websites and mobile apps"],
  ["Learning", "AI features and better hosting"],
  ["Open to", "Jobs, freelance work and collaborations"],
  ["Based in", "Nairobi, Kenya"],
  ["Reply time", "Usually within a day"],
];

export default function About() {
  const uptime = useUptime();
  return (
    <section id="about" className="section about">
      <SectionHeading
        index="01"
        kicker="About me"
        title="Hi, I'm Felix."
        lede="A software engineer from Nairobi who likes making complicated things feel simple."
      />

      <div className="about-grid">
        <Reveal>
          <Panel className="about-panel">
            <p className="panel-kicker">A little background</p>
            <h3 className="about-name">
              {profile.handle}
              <span> — {profile.realName}</span>
            </h3>
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="fun">Fun fact: coffee goes in, software that just works comes out.</p>
            <ul className="chips">
              <Chip>@BuildForSDG</Chip>
              <Chip>Open source</Chip>
              <Chip>GitHub developer</Chip>
              <Chip>Nairobi, Kenya</Chip>
            </ul>
          </Panel>
        </Reveal>

        <div className="about-side">
          <Reveal delay={0.1}>
            <Panel className="status-panel">
              <p className="panel-kicker">Right now</p>
              <ul className="status-list">
                {FACTS.map(([k, v]) => (
                  <li key={k}>
                    <span>{k}</span>
                    <strong>{v}</strong>
                  </li>
                ))}
                <li>
                  <span>Doing this for</span>
                  <strong className="mono">{uptime || "12+ years"}</strong>
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
                <strong>Felix Odhiambo</strong>
                <span>{profile.availability}</span>
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
