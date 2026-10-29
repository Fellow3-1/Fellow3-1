import { profile, nav } from "../data/content.js";

export default function Nav() {
  return (
    <header className="nav">
      <a className="nav__mark" href="#top">
        {profile.realName}
      </a>
      <nav className="nav__links" aria-label="Sections">
        {nav.map((item) => (
          <a key={item.href} className="link" href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="nav__cta button" href={`mailto:${profile.email}`}>
        Email me
      </a>
    </header>
  );
}
