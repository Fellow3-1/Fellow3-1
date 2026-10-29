import { useEffect, useState } from "react";
import { profile, nav, credits } from "../data/content.js";

// The close: the name returns across the last photograph (Nairobi at dusk),
// with the links above it and the credits small underneath. The photograph
// drifts slowly with the scroll; under reduced motion it is simply still.
// The clock reports real Nairobi time, live.
export default function Closer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat("en-KE", {
        timeZone: profile.timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    } catch {
      fmt = new Intl.DateTimeFormat("en-KE", { hour: "2-digit", minute: "2-digit" });
    }
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 20000);
    return () => clearInterval(t);
  }, []);

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
        <span>
          {credits[0]} · {credits[1]} ·{" "}
          <span className="closer__clock">
            Nairobi{time ? ` ${time}` : ""} ({profile.utc})
          </span>
        </span>
      </div>
    </footer>
  );
}
