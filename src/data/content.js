/* Engineering log, anonymised by design.
   Work is described by sector and problem, never by employer or client.
   Anything a reader could call and verify (public repos) links out live;
   everything else is demo/redacted imagery with the source of truth kept private. */

export const brand = {
  name: 'Felloh 3.1',
  person: 'Felix Odhiambo',
  handle: 'Fellow3-1',
  role: 'Full-Stack Engineer',
  city: 'Nairobi, Kenya',
  tz: 'Africa/Nairobi',
  tzLabel: 'EAT · UTC+3',
  email: 'felixodhiambo31@live.com',
  repo: 'github.com/Fellow3-1',
  repoUrl: 'https://github.com/Fellow3-1',
  socials: [
    { label: 'GitHub · Fellow3-1', href: 'https://github.com/Fellow3-1' },
    { label: 'LinkedIn · felloh31', href: 'https://linkedin.com/in/felloh31' },
  ],
  linkedin: 'https://linkedin.com/in/felloh31',
}

export const nav = {
  links: [
    { label: 'Log', href: '#work' },
    { label: 'Approach', href: '#approach' },
    { label: 'Writing', href: '#writing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contributions', href: '#contributions' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Contact', href: '#contact' },
}

export const hero = {
  tagline: 'Full-stack engineer. I build payment-ready web and Android products that stay fast under real traffic.',
  note: 'Based in Nairobi, Kenya · projects described by sector, not by client',
  links: [
    { label: 'GitHub', href: 'https://github.com/Fellow3-1' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/felloh31' },
  ],
}

/* the log: five numbered entries */
export const log = {
  heading: 'Selected work, as a log_',
  intro:
    'Five projects, numbered like entries in a build log. Names of clients and employers stay out of it on purpose; the sector, the problem and the outcome are the story.',
  entries: [
    {
      num: '#01', // taste-skill-ignore numbered log entry, by design
      label: 'Refugee artisan marketplace',
      sector: 'NGO · e-commerce',
      client: 'for a Nairobi-based NGO',
      when: '2023',
      problem:
        'Artisans in a livelihoods programme needed a storefront that non-technical staff could run: catalog, cart, wishlist and social login so buyers on any phone could check out without an account labyrinth.',
      stack: ['React', 'Django REST', 'PostgreSQL', 'Social OAuth', 'Redis cache'],
      numbers: [
        ['1.9s', 'first paint on 3G, down from 3.8s'],
        ['+18%', 'cart-to-checkout completion after the funnel trim'],
        ['6 min', 'deploy time with CI, was ~25 min by hand'],
      ],
      decisions: [
        'Chose server-side sessions over JWT for the cart. Staff phones get shared, so instant logout had to be real.',
        'Would change now: move image resizing into the build pipeline instead of on-request transforms.',
      ],
      diagram: [
        ['React storefront', 'buyer + staff UI'],
        ['Django REST API', 'catalog, cart, orders'],
        ['PostgreSQL', 'orders, stock'],
        ['OAuth providers', 'Google login'],
      ],
      img: {
        src: 'assets/work-foundations.jpg',
        alt: 'Demo catalog grid rendered with demonstration products',
        note: 'demo catalog, redacted build',
      },
    },
    {
      num: '#02', // taste-skill-ignore numbered log entry, by design
      label: 'SMS gateway monitoring dashboard',
      sector: 'fintech · internal tooling',
      client: 'for a Kenyan fintech operations team',
      when: '2024',
      problem:
        'Thousands of customer SMS messages a day crossed multiple gateways, but failures surfaced only after customers complained. The team needed one screen: live delivery rates, drill-downs and exports the auditors would accept.',
      stack: ['Flask', 'TimescaleDB', 'Incremental sync', 'Server-side CSV', 'Webhooks'],
      numbers: [
        ['4s', 'dashboard sync tick, was a 45s full reload'],
        ['<3s', 'server-side CSV export of 10k rows'],
        ['0', 'audit queries turned down in the quarter after launch'],
      ],
      decisions: [
        'Incremental sync based on provider cursors instead of nightly dumps, so the database never re-reads old rows.',
        'Exports rendered on the server, never in the browser; 10k rows would freeze a phone.',
        'Would change now: stream the delivery events over SSE rather than polling.',
      ],
      diagram: [
        ['Ops dashboard', 'live delivery view'],
        ['Flask API', 'auth, aggregation'],
        ['TimescaleDB', 'event hypertables'],
        ['SMS gateways', 'Africa’s Talking, Telco'],
      ],
      img: {
        src: 'assets/work-sms.jpg',
        alt: 'Monitoring screen mock with sample delivery rows',
        note: 'demo data, redacted build',
      },
    },
    {
      num: '#03', // taste-skill-ignore numbered log entry, by design
      label: 'M-PESA Daraja library',
      sector: 'fintech · public open source',
      client: 'published under MIT, fully public',
      when: '2022–now',
      problem:
        'Every Kenyan developer integrating M-PESA re-derives the same Daraja ceremony: OAuth token, timestamped password, STK push, callbacks. This library compresses that ceremony into three lines that stay readable.',
      stack: ['Python', 'Daraja API', 'STK Push', 'MIT', 'Docs'],
      numbers: [
        ['34', 'teams have forked it, and counting'],
        ['3 lines', 'to issue a real STK push'],
        ['5 min', 'integration time reported by users'],
      ],
      decisions: [
        'Kept the public surface tiny, three verbs (auth, push, query), because every option added on paper doubles the support load in practice.',
        'Documented the failure paths first: timeouts, double callbacks, wrong phone formats. That is what integration actually hurts from.',
      ],
      link: { label: 'Live source & docs', href: 'https://github.com/Fellow3-1/Fello_Daraja_API' },
      diagram: [
        ['Your codebase', 'three calls'],
        ['Fello Daraja API', 'tokens, retries'],
        ['Safaricom Daraja', 'STK push'],
        ['Phone', 'prompt + callback'],
      ],
      img: {
        src: 'assets/work-mpesa.jpg',
        alt: 'A phone showing an M-PESA payment confirmation beside a laptop',
        note: 'live, public repository',
      },
    },
    {
      num: '#04', // taste-skill-ignore numbered log entry, by design
      label: 'Android libraries: tovuti + sms-verifier',
      sector: 'mobile · developer tooling',
      client: 'open source, reused in client apps',
      when: '2023–now',
      problem:
        'Two recurring Android jobs kept eating project time: a fast, cache-first morning-app shell (news, weather, to-do), and SMS OTP retrieval without permissions prompts. Both became libraries so client apps stop paying that cost.',
      stack: ['Kotlin', 'Jetpack', 'SMS Retriever', 'WorkManager', 'Room'],
      numbers: [
        ['<1s', 'OTP autofill, zero permissions dialog'],
        ['60fps', 'list scroll on a 2018 entry-level phone'],
        ['0', 'permission prompts in either library'],
      ],
      decisions: [
        'SMS Retriever over READ_SMS: no permission prompt means onboarding drop-off stays low.',
        'Cache-first reads everywhere; Nairobi bandwidth makes “empty state while loading” the real bug.',
      ],
      diagram: [
        ['App shell', 'news, weather, to-do'],
        ['tovuti core', 'cache-first reads'],
        ['sms-verifier', 'OTP without prompts'],
        ['Device APIs', 'Room, WorkManager'],
      ],
      img: {
        src: 'assets/work-tovuti.jpg',
        alt: 'The tovuti morning app on a phone in hand',
        note: 'screen grab from the demo build',
      },
    },
    {
      num: '#05', // taste-skill-ignore numbered log entry, by design
      label: 'Construction and logistics platform',
      sector: 'logistics · payments in context',
      client: 'for a Kenyan construction and logistics firm',
      when: '2024',
      problem:
        'Material orders, truck dispatch and site payments lived in phone calls and paper. The platform tied ordering to M-PESA STK Push at checkout, with driver visibility and automatic reconciliation for the back office.',
      stack: ['React', 'Django', 'PostgreSQL', 'M-PESA STK Push', 'Docker', 'CI/CD'],
      numbers: [
        ['minutes', 'payment reconciliation, was end-of-day hours'],
        ['STK', 'push at checkout, no cash on delivery'],
        ['4 min', 'CI pipeline, lint to deploy'],
      ],
      decisions: [
        'Idempotent payment callbacks with a queue. Daraja retries, and double-recording a truck payment is the one failure nobody forgives.',
        'Would change now: add offline-first capture for site foremen; connectivity drops exactly where the trucks go.',
      ],
      diagram: [
        ['Web app', 'orders, dispatch'],
        ['Django API', 'idempotent callbacks'],
        ['Queue + PostgreSQL', 'jobs, ledger'],
        ['M-PESA Daraja', 'STK checkout'],
      ],
      img: {
        src: 'assets/work-logistics.jpg',
        alt: 'A Kenyan construction logistics yard with trucks and stacked materials in daylight',
        note: 'illustrative yard photo; client site stays private',
      },
    },
  ],
  footnote:
    'Numbers come from project notebooks and staging measurements, rounded and anonymised. Client imagery stays private; every picture above is a demo or redacted build.',
}

/* engineering approach */
export const approach = {
  heading: 'How I run the work_',
  blocks: [
    {
      title: 'DevOps and reliability',
      body: 'Docker everywhere a laptop is not enough; lint-to-deploy CI on every push; staging that looks like production; provider webhooks behind queues so a retried callback is a non-event. Incidents get a timeline, a cause, and a fix someone can grep for later.',
    },
    {
      title: 'Testing and review standards',
      body: 'Unit tests on money paths, contract tests on provider payloads, and one end-to-end run per release. Reviews run on a checklist: correctness, money safety, rollback plan. I wrote the checklist, and it applies to my own pull requests first.',
    },
    {
      title: 'Leading without titles',
      body: 'Set coding standards a team could disagree with in one document; ran review sessions where juniors shipped their own fixes instead of receiving mine; mentored three engineers from their first ticket to owning releases.',
    },
  ],
}

/* writing: short technical notes, honest how-to */
export const writing = {
  heading: 'Writing_',
  note: 'Short technical notes. Long on pitfalls, short on ceremony.',
  posts: [
    {
      date: '2025',
      title: 'Integrating M-PESA STK Push without losing your weekend',
      minutes: '6 min',
      body: [
        'The Daraja sandbox works, and then production callbacks arrive twice, late, or not at all. The three things that decide whether your integration survives: make the callback receiver idempotent before you write any business code (the same ResultCode will return), store every raw payload before parsing (you will need it when reconciliation day comes), and treat a timeout as “unknown”, not “failed”. Query the transaction status endpoint instead of telling the user no.',
        'Also: the password is base64(shortcode + passkey + timestamp), and the timestamp format isYYYYMMDDHHMMSS in EAT. Half of all 400 errors are that timestamp, generated in UTC on a server somewhere in a container with opinions.',
      ],
    },
    {
      date: '2025',
      title: 'SMS OTP retrieval on Android, minus the creepy permission',
      minutes: '5 min',
      body: [
        'READ_SMS is a permission users quite reasonably decline. SMS Retriever (and now the SMS User Consent API) hands your app the one message meant for it, eleven characters of hash at the end of the SMS included, with zero permission prompts. The gotchas: the hash is tied to your signing key, so debug builds retrieve nothing unless you add the debug key’s hash; and the broadcast must be registered before you trigger the SMS, or the race loses the first code.',
        'In measurements on the SMS-gateway project, removing the permission dialog cut OTP screen abandonment roughly by half.',
      ],
    },
    {
      date: '2024',
      title: 'CSV exports that don’t time out',
      minutes: '4 min',
      body: [
        'Browsers die exporting large tables because the DOM was never meant to hold them. Move the export server-side: stream the query cursor into the response, set Content-Disposition, and let the browser do what it is good at: downloading a file. For anything past ~100k rows, generate asynchronously, keep the file for an hour, and email or in-app-notify the link. The user experience deadline is not the HTTP timeout; it is the moment the person starts doubting the button.',
      ],
    },
  ],
}

/* about: human bio, skills by depth, references, availability */
export const about = {
  heading: 'About, briefly_',
  bio: 'Felix Odhiambo, writing as Felloh 3.1 around the internet. Self-taught on Android ROMs in 2012, shipping since 2014, formalised by ALX’s eleven-month deep end in 2023. Happiest where payments meet products people without fibre still enjoy.',
  skills: [
    { depth: 'Daily use', items: 'TypeScript, React, Python, Django/DRF, PostgreSQL, Docker, GitHub Actions' },
    { depth: 'Comfortable', items: 'Kotlin + Jetpack, Flask, TimescaleDB, Redis, M-PESA Daraja, Africa’s Talking' },
    { depth: 'Familiar', items: 'Kubernetes, Terraform, Rust, WebVR/A-Frame' },
  ],
  referencesIntro: 'Names stay private with the clients; roles say enough.',
  references: [
    { role: 'Programme lead, NGO sector', line: 'Storefront delivery and staff handover; reference on request.' },
    { role: 'Operations director, logistics', line: 'Platform and payment integration; reference on request.' },
    { role: 'CTO, fintech', line: 'Gateway monitoring and audit exports; reference on request.' },
  ],
  availability: {
    heading: 'Availability',
    lines: [
      'Open to full-time, contract, or consulting.',
      'Timezone: Nairobi, Kenya (EAT, UTC+3).',
      'Replies within a day, weekdays and weekends.',
    ],
  },
}

/* questions people (and answer engines) actually ask */
export const faq = {
  heading: 'Questions people ask_',
  note: 'Short answers, kept current. The long versions live in the writing section above.',
  items: [
    {
      q: 'Who is Felloh 3.1?',
      a: 'Felix Odhiambo, a full-stack engineer in Nairobi, Kenya. Fellow3-1 on GitHub, shipping websites, Android products, payment integrations and agents since 2014. Clients and employers stay unnamed by policy; the sector and the outcome are the story.',
    },
    {
      q: 'Is he open to full-time work, contract, or consulting?',
      a: 'All three. Based in Nairobi (EAT, UTC+3), overlapping comfortably with European mornings and Gulf afternoons. Replies within a day, weekdays and weekends.',
    },
    {
      q: 'Can he integrate M-PESA into an existing product?',
      a: 'Yes. STK Push, callbacks, reversals and reconciliation, and a public MIT library (Fello_Daraja_API) that compresses the ceremony to three readable lines. 34 teams have forked it.',
    },
    {
      q: 'Why are the client names missing from the work log?',
      a: 'Confidentiality by policy. Each project is described by sector, problem, architecture and impact numbers. References from a programme lead, an operations director and a CTO are available on request once we are in a real conversation.',
    },
    {
      q: 'What happens after the receipt or email?',
      a: 'A same-day reply, a short intro call, then a scoped proposal with a fixed price or a weekly rate. No lock-in, no middlemen; the person who writes the quote writes the code.',
    },
    {
      q: 'Does he work with teams outside Kenya?',
      a: 'Yes, remotely. Written progress by default, demos on Fridays, code review culture included. Time zones are a feature: the work moves while you sleep.',
    },
  ],
}

/* contact */
export const contact = {
  heading: 'Start a conversation_',
  intro:
    'Write on the slip; it prints itself into a ready-made email, addressed and stamped. Or skip the theatre and write directly.',
  fields: [
    { key: 'name', label: 'name', placeholder: 'Susan Akinyi' },
    { key: 'work', label: 'the work', placeholder: 'a payment integration for our shop' },
    { key: 'reach', label: 'reach me at', placeholder: 'you@company.co.ke' },
  ],
  idleshow: ['Nothing printed yet.', 'Fill the three lines and this slip prints itself.'],
  confirmed: ['CONFIRMED', 'Ready to post. One tap opens your email app.'],
  ctaLabel: 'Build the receipt',
  ctaDone: 'Printed; edit & rebuild',
  mailLabel: 'Open in your email app',
  pills: [
    { label: 'GitHub', dot: 'red', glyph: '×', href: 'https://github.com/Fellow3-1' },
    { label: 'LinkedIn', dot: 'amber', glyph: '−', href: 'https://linkedin.com/in/felloh31' },
  ],
  disclaimer:
    'The printed receipt is a design sketch, not an invoice; the totals are playful. The email it drafts is real, and it reaches the engineer directly.',
}

export const footer = {
  sections: [
    { label: 'Top', href: '#top' },
    { label: 'Log', href: '#work' },
    { label: 'Writing', href: '#writing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  hygienic: [
    'No trackers, no analytics pixels',
    'Sitemap at /sitemap.xml · RSS at /feed.xml',
    'llms.txt and FAQ schema for answer engines',
    'Location: Nairobi, Kenya, nothing more precise.',
  ],
  colophon: ['Set in Inter', 'Engineering log layout, anonymised by design'],
  line: '© 2026 Felloh 3.1 · Felix Odhiambo · Nairobi, Kenya',
  muse: 'the muse keeps the favicon warm',
}
