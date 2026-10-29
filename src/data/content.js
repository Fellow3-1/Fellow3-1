export const brand = {
  name: 'Felloh 3.1',
  person: 'Felix Odhiambo',
  handle: 'Fellow3-1',
  role: 'Software Engineer',
  city: 'Nairobi, Kenya',
  tz: 'Africa/Nairobi',
  tzLabel: 'UTC+3',
  email: 'felixodhiambo31@live.com',
  repo: 'github.com/Fellow3-1',
  repoUrl: 'https://github.com/Fellow3-1',
  socials: [
    { label: 'GitHub · Fellow3-1', href: 'https://github.com/Fellow3-1' },
    { label: 'X · @Fellow3_1', href: 'https://x.com/Fellow3_1' },
  ],
}

export const nav = {
  links: [
    { label: 'Highlights', href: '#highlights' },
    { label: 'Work', href: '#work' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Start a project', href: '#contact' },
}

/* product-style hero: the GitHub name carries the page */
export const hero = {
  kicker: 'Felix Odhiambo is Fellow3-1 on GitHub',
  title: 'Felloh 3.1',
  tagline: 'A simplified, focused and open one-person software studio.',
  note: 'Free to talk. Runs on Nairobi time, UTC+3.',
  ctas: [
    { label: 'Start a project', href: '#contact', primary: true },
    { label: 'See the work', href: '#work', primary: false },
  ],
  shots: {
    laptop: {
      src: 'assets/work-foundations.jpg',
      alt: 'The Foundations KE website, dark and light themes side by side',
      label: 'Foundations KE — live site',
    },
    phone: {
      src: 'assets/work-tovuti.jpg',
      alt: 'The Tovuti morning app on a phone in hand',
      label: 'Tovuti — React Native',
    },
    muse: {
      src: 'assets/HD-Joker-Wallpapers-scaled.jpg',
      alt: "Low-poly Joker artwork — the site's returned muse",
      label: 'The muse, returned',
    },
  },
  footnote: '*Every frame above is real. Screenshots from shipped projects, art from the archive.',
}

/* highlight tiles, ZimaOS-style feature cards */
export const highlights = {
  heading: 'A one-person software studio_',
  footnote: '*Supports real deadlines, real budgets and real users.',
  tiles: [
    {
      key: 'payments',
      tone: 'blue',
      title: 'Payments that just work_',
      text: 'M-PESA integrated into any system in five minutes. Forked by 34 teams and counting.',
      img: { src: 'assets/work-mpesa.jpg', alt: 'A laptop beside a phone showing an M-PESA payment confirmation' },
    },
    {
      key: 'apps',
      tone: 'green',
      title: 'Apps people open daily_',
      text: 'Tovuti puts news, weather and a to-do in one hand before the day starts.',
      img: { src: 'assets/work-tovuti.jpg', alt: 'The Tovuti morning app on a phone' },
    },
    {
      key: 'agents',
      tone: 'lavender',
      title: 'Honest AI agents_',
      text: 'Nairobi AI Agents, wired for local data, local phones, local work. No theatre.',
      img: { src: 'assets/work-ai.jpg', alt: 'An agent dashboard drafting a reply in Sheng' },
    },
    {
      key: 'muse',
      tone: 'plum',
      title: 'The muse_',
      text: 'Joker protocol. The low-poly grin this site was first built around, back by popular demand (n=1).',
      img: { src: 'assets/HD-Joker-Wallpapers-scaled.jpg', alt: 'Low-poly Joker bust in green and purple on black' },
    },
  ],
}

/* the 800+-style number strip */
export const numbers = {
  heading: 'The honest numbers_',
  facts: [
    { figure: '90+', cap: 'public projects on GitHub' },
    { figure: '34', cap: 'teams forked my M-PESA tool' },
    { figure: '12', cap: 'years shipping, since 2014' },
    { figure: 'UTC+3', cap: 'Nairobi, weekdays and weekends' },
  ],
}

/* card-grid work */
export const projects = [
  {
    slug: 'mpesa',
    name: 'Fello Daraja API',
    kicker: 'Integrate M-PESA into any system in five minutes.',
    tags: 'Python · Payments · Django',
    href: 'https://github.com/Fellow3-1/Fello_Daraja_API',
    img: { src: 'assets/work-mpesa.jpg', alt: 'A phone showing an M-PESA payment confirmation beside a laptop' },
  },
  {
    slug: 'fond',
    name: 'Foundations KE',
    kicker: 'A website that moves real donations to real causes.',
    tags: 'JavaScript · Web',
    href: 'https://github.com/Fellow3-1/FoundationsWebsiteKE',
    img: { src: 'assets/work-foundations.jpg', alt: 'The Foundations website in dark and light themes' },
  },
  {
    slug: 'sms',
    name: 'SMS Gateway',
    kicker: 'One flask of glue between Africa’s Talking and Telegram.',
    tags: 'Flask · Messaging · Python',
    href: 'https://github.com/Fellow3-1/africastalkingTelegramSMS',
    img: { src: 'assets/work-sms.jpg', alt: 'A laptop and phone relaying customer messages' },
  },
  {
    slug: 'tovuti',
    name: 'Tovuti App',
    kicker: 'A first-thing app — news, weather and a to-do.',
    tags: 'React Native · Mobile',
    href: 'https://github.com/Fellow3-1/Tovuti',
    img: { src: 'assets/work-tovuti.jpg', alt: 'The Tovuti morning app on a phone' },
  },
  {
    slug: 'nai',
    name: 'Nairobi AI Agents',
    kicker: 'Agents wired for local data, local phones, local work.',
    tags: 'AI · Agents · Python',
    href: 'https://github.com/Fellow3-1/nairobi-ai-agents',
    img: { src: 'assets/work-ai.jpg', alt: 'An agent dashboard drafting a reply in Sheng' },
  },
  {
    slug: 'vr',
    name: 'VR Nairobi',
    kicker: 'WebVR walks through the city, no headset required.',
    tags: 'A-Frame · WebVR · JavaScript',
    href: 'https://github.com/Fellow3-1/VR',
    img: { src: 'assets/work-vr.jpg', alt: 'A laptop rendering a simple 3D Nairobi street' },
  },
]

/* timeline */
export const timeline = {
  heading: 'The timeline_',
  rows: [
    { year: '2012', what: 'Flashing custom Android ROMs and breaking things on purpose', org: 'Self-taught' },
    { year: '2014', what: 'Built the first thing people actually used, and never stopped', org: 'First builds' },
    { year: '2023', what: 'The eleven-month software engineering deep end', org: 'ALX Africa' },
    {
      year: '2024–25',
      what: 'AI Agents & Automation. New machine, old habit: ship it',
      org: 'ALX Africa',
      certificate: { label: 'View certificate', href: 'https://intranet.alxswe.com/certificates/sG7YpyrSCM' },
    },
    { year: 'Now', what: 'Engineer-at-large from Nairobi, open to full-time and freelance', org: 'Freelance & open' },
  ],
}

/* contact: the receipt stays, re-papered for the light page */
export const contact = {
  heading: 'Bring Felloh 3.1 onto your project_',
  intro:
    'Write on the slip and it prints itself into a ready-made email, addressed and stamped. No managers, no queue — I reply myself, usually within a day.',
  fields: [
    { key: 'name', label: 'name', placeholder: 'Wanjiku Mwangi' },
    { key: 'work', label: 'the work', placeholder: 'a shop site with M-PESA checkout' },
    { key: 'reach', label: 'reach me at', placeholder: 'you@company.co.ke' },
  ],
  idleshow: ['Nothing printed yet.', 'Fill the three lines and this slip prints itself.'],
  confirmed: ['CONFIRMED', 'Ready to post — one tap opens your email app.'],
  ctaLabel: 'Build the receipt',
  ctaDone: 'Printed — edit & rebuild',
  mailLabel: 'Open in your email app',
  rows: [
    { label: 'Email', value: 'felixodhiambo31@live.com', href: 'mailto:felixodhiambo31@live.com' },
    { label: 'Place', value: 'Nairobi, Kenya — UTC+3' },
    { label: 'Code', value: 'github.com/Fellow3-1', href: 'https://github.com/Fellow3-1' },
  ],
}

export const footer = {
  sections: [
    { label: 'Top', href: '#top' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Work', href: '#work' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ],
  recognition: ['GitHub Developer Program Member', 'Pull Shark ×2', 'Pair Extraordinaire', 'YOLO'],
  colophon: ['Set in Inter', 'Imagery made for this site', 'The muse is the low-poly Joker, returned from the archive'],
  line: '© 2026 Felloh 3.1 · Felix Odhiambo · Nairobi, Kenya',
}
