import { profile, nav, credits } from "../data/content.js";

// The close: the name returns across the last photograph (Nairobi at dusk),
// with the links above it and the credits small underneath. The photograph
// drifts slowly with the scroll; under reduced motion it is simply still.
export default function Closer() {
  return (
    <footer className="closer" aria-label="Footer">
      <div className="closer__photo" aria-hidden="true">
        <img src="assets/closer-nairobi.jpg" alt="" width="1376" height="768" loading="lazy" decoding="async" />
      </div>

      <div className="closer__row closer__row--top">
        <span>{profile.realName} · software engineer</span>
        <nav aria-label="Footer">
          {nav.map((item) => (
            <a key={item.href} className="link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <p className="closer__name" aria-hidden="true">
        {profile.handle}
      </p>

      <div className="closer__row closer__row--bottom">
        <span>© 2026 {profile.realName}</span>
        <span>{credits.join(" · ")}</span>
      </div>
    </footer>
  );
}
