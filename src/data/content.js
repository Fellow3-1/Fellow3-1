export const profile = {
  name: 'Felix Odhiambo',
  alias: 'Felloh 3.1',
  brand: 'FELLOH',
  first: 'Felix',
  last: 'Odhiambo',
  role: 'Software Engineer',
  city: 'Nairobi, Kenya',
  tz: 'Africa/Nairobi',
  tzLabel: 'UTC+3',
  repo: 'github.com/Fellow3-1',
  repoUrl: 'https://github.com/Fellow3-1',
  email: 'felixodhiambo31@live.com',
  socials: [
    { label: 'X · @Fellow3_1', href: 'https://x.com/Fellow3_1' },
    { label: 'GitHub · Fellow3-1', href: 'https://github.com/Fellow3-1' },
  ],
  since: 2014,
}

/* — opening stage: three trailer panels passing under the pinned name — */
export const stage = {
  sentence: 'Websites, apps, payments and AI — built fast, kept simple.',
  action: { label: 'Start a project', href: '#contact' },
  mailNote: 'or email me directly',
  links: [
    { label: 'Work', href: '#work' },
    { label: 'Story', href: '#story' },
    { label: 'Contact', href: '#contact' },
  ],
  photoA: {
    src: 'assets/hero-skyline-day.jpg',
    alt: 'The Nairobi skyline on a clear day',
    caption: 'Nairobi, UTC+3 — where I build.',
  },
  photoB: {
    src: 'assets/hero-2.jpg',
    alt: 'A wall of phones each running a different screen of the same app',
    caption: 'A grid of real screens — every build ships as swappable modules.',
  },
  lines: [
    'Apps people open every day,',
    'sites that load before you blink,',
    'and AI that earns its keep.',
  ],
  note: 'Open for new work now.',
}

/* — intro chapter — */
export const intro = {
  heading: 'Twelve years of shipped work.',
  note: 'Self-taught on Android ROMs, trained by Google and ALX, still happiest when something I made is in someone else’s hands.',
  photo: {
    src: 'assets/intro-desk.jpg',
    alt: 'Felix’s desk in Nairobi: laptop, two phones and paper notebooks under warm light',
    caption: 'The desk where most of it happens.',
  },
  facts: [
    { figure: '2014', cap: 'the year I started, flashing ROMs' },
    { figure: '90+', cap: 'public projects on GitHub' },
    { figure: '34', cap: 'teams forked my M-PESA tool' },
    { figure: 'UTC+3', cap: 'Nairobi time, weekdays and weekends' },
  ],
}

/* — work — held picture, passing captions — */
export const projects = [
  {
    slug: 'mpesa',
    name: 'Fello Daraja API',
    kicker: 'Integrate M-PESA into any system in five minutes.',
    detail: 'The most practical thing I have published — 34 forks and counting.',
    tags: ['Python', 'Payments', 'Django'],
    href: 'https://github.com/Fellow3-1/Fello_Daraja_API',
    picture: {
      src: 'assets/work-mpesa.jpg',
      alt: 'A laptop beside a phone showing an M-PESA payment confirmation',
    },
  },
  {
    slug: 'fond',
    name: 'Foundations KE',
    kicker: 'A website that moves real donations to real causes.',
    detail: 'Clean pages, clear causes, giving kept simple.',
    tags: ['JavaScript', 'Web'],
    href: 'https://github.com/Fellow3-1/FoundationsWebsiteKE',
    picture: {
      src: 'assets/work-foundations.jpg',
      alt: 'The Foundations website in dark and light themes on a laptop',
    },
  },
  {
    slug: 'sms',
    name: 'SMS Gateway',
    kicker: 'One flask of glue between Africa’s Talking and Telegram.',
    detail: 'Customer texts keep flowing even when the internet does not.',
    tags: ['Flask', 'Messaging', 'Python'],
    href: 'https://github.com/Fellow3-1/africastalkingTelegramSMS',
    picture: {
      src: 'assets/work-sms.jpg',
      alt: 'A laptop and a phone relaying customer messages into a chat window',
    },
  },
  {
    slug: 'tovuti',
    name: 'Tovuti App',
    kicker: 'A first-thing app — news, weather and a to-do.',
    detail: 'React Native; in one hand before the day starts.',
    tags: ['React Native', 'Mobile'],
    href: 'https://github.com/Fellow3-1/Tovuti',
    picture: {
      src: 'assets/work-tovuti.jpg',
      alt: 'A phone in one hand showing the Tovuti morning app',
    },
  },
  {
    slug: 'nai',
    name: 'Nairobi AI Agents',
    kicker: 'Agents wired for local data, local phones, local work.',
    detail: 'Built for the machine I am newer to — and learning fast.',
    tags: ['AI', 'Agents', 'Python'],
    href: 'https://github.com/Fellow3-1/nairobi-ai-agents',
    picture: {
      src: 'assets/work-ai.jpg',
      alt: 'An agent dashboard drafting a reply in Sheng on a laptop',
    },
  },
  {
    slug: 'vr',
    name: 'VR Nairobi',
    kicker: 'WebVR walks through the city, no headset required.',
    detail: 'A-Frame and a browser; made for the machines people already own.',
    tags: ['A-Frame', 'WebVR', 'JavaScript'],
    href: 'https://github.com/Fellow3-1/VR',
    picture: {
      src: 'assets/work-vr.jpg',
      alt: 'A laptop rendering a simple 3D Nairobi street scene',
    },
  },
]

/* — story chapter — */
export const story = {
  headingA: 'From phone tinkerer',
  headingB: 'to the deep end.',
  rows: [
    { year: '2012', what: 'Flashing custom Android ROMs and breaking things on purpose', org: 'Self-taught' },
    { year: '2014', what: 'Built the first thing people actually used, and never stopped', org: 'First builds' },
    { year: '2023', what: 'ALX — the eleven-month software engineering deep end', org: 'ALX Africa' },
    {
      year: '2024–25',
      what: 'AI Agents & Automation — new machine, old habit: ship it',
      org: 'AI Agents & Automation',
      certificate: { label: 'View certificate', href: 'https://intranet.alxswe.com/certificates/sG7YpyrSCM' },
    },
    { year: 'Now', what: 'Engineer-at-large from Nairobi, open to full-time and freelance', org: 'Freelance & open' },
  ],
}

/* — services — one poster-scale list — */
export const services = {
  lead: 'What I do,',
  rows: [
    { name: 'Websites & web apps', tail: 'quick on any connection' },
    { name: 'Mobile apps', tail: 'React Native, one hand, no manual' },
    { name: 'Payments & integrations', tail: 'M-PESA, SMS, email, APIs' },
    { name: 'AI agents & automation', tail: 'that earn their keep' },
    { name: 'E-commerce & dashboards', tail: 'real numbers, not vanity' },
    { name: 'Design & maintenance', tail: 'kept simple, kept running' },
  ],
  photo: {
    src: 'assets/window-nairobi.jpg',
    alt: 'Traffic light trails through a Nairobi junction at night from above',
    caption: 'Rush hour, from above — the city never really stops.',
  },
}

/* — contact chapter — display rows + the receipt — */
export const contact = {
  hello: 'Say hello.',
  rows: [
    { label: 'Email', value: 'felixodhiambo31@live.com', href: 'mailto:felixodhiambo31@live.com' },
    { label: 'Place', value: 'Nairobi, Kenya — UTC+3' },
    { label: 'Work', value: 'Open to full-time & freelance' },
    { label: 'Code', value: 'github.com/Fellow3-1', href: 'https://github.com/Fellow3-1' },
  ],
  receiptIntro:
    'Prefer paper? Write on this slip — it prints itself into the email, addressed and stamped, ready to send.',
  fields: [
    { key: 'name', label: 'name', placeholder: 'Wanjiku Mwangi' },
    { key: 'work', label: 'the work', placeholder: 'a shop site with M-PESA checkout' },
    { key: 'reach', label: 'reach me at', placeholder: 'you@company.co.ke' },
  ],
  note: 'No managers, no queue — I reply myself, from Nairobi. Usually within a day.',
}

/* — footer — small columns, then the wordmark at full width — */
export const footer = {
  sections: [
    { label: 'Top', href: '#top' },
    { label: 'Work', href: '#work' },
    { label: 'Story', href: '#story' },
    { label: 'Contact', href: '#contact' },
  ],
  recognition: ['GitHub Developer Program Member', 'Pull Shark ×2', 'Pair Extraordinaire', 'YOLO'],
  colophon: ['Set in Inter', 'Imagery made for this site'],
  line: '© 2026 Felix Odhiambo · Nairobi, Kenya',
}
