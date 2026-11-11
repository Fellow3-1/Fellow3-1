/* Public portfolio content. No employer/client records or private project details. */
export const brand = {
  name: 'Felloh 3.1',
  person: 'Felix Odhiambo',
  handle: 'Fellow3-1',
  role: 'Software & IT Systems Engineer',
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
    { label: 'Projects', href: '#work' },
    { label: 'Infrastructure', href: '#infrastructure' },
    { label: 'Approach', href: '#approach' },
    { label: 'Skills', href: '#about' },
    { label: 'Writing', href: '#writing' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: { label: 'Contact', href: '#contact' },
}

export const hero = {
  tagline: 'Software engineer working across web and mobile applications, payment integrations, systems administration and network infrastructure.',
  note: 'Based in Nairobi, Kenya · public work and technical capabilities, with private employment details omitted',
  now: {
    /* one live line under the hero links: local EAT clock is computed by the
       component; this is the standing status it reports alongside it */
    status: 'open to software engineering, systems, infrastructure and networking opportunities',
  },
  links: [
    { label: 'GitHub', href: 'https://github.com/Fellow3-1' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/felloh31' },
  ],
}

export const log = {
  heading: 'Public projects, with the source attached_',
  intro: 'A small selection of public repositories. Descriptions are kept close to what the repositories document; private client and employment work is intentionally not listed.',
  entries: [
    {
      num: '#01',
      label: 'M-PESA Daraja Go wrapper',
      sector: 'open source · payments',
      client: 'Public repository',
      when: 'Go',
      problem: 'A Go library wrapping Safaricom M-PESA Daraja API operations. The repository describes the project as a work in progress, so it is presented as an open-source implementation rather than a production-readiness claim.',
      stack: ['Go', 'M-PESA Daraja', 'REST API'],
      numbers: [['Go', 'implementation language'], ['WIP', 'repository status'], ['Daraja', 'API domain']],
      decisions: ['The repository is public and can be reviewed directly.', 'Status and supported operations should be checked against the current README before adopting it.'],
      diagram: [['Go application', 'calling code'], ['Library wrapper', 'API client'], ['Daraja API', 'Safaricom endpoints'], ['M-PESA', 'payment flow']],
      link: { label: 'View repository', href: 'https://github.com/AndroidStudyOpenSource/mpesa-api-go' },
      img: { src: 'assets/work-mpesa.jpg', alt: 'Illustrative M-PESA integration visual', note: 'illustrative image · public source linked', w: 1376, h: 768 },
    },
    {
      num: '#02',
      label: 'Tovuti Android connectivity library',
      sector: 'open source · Android',
      client: 'Public repository',
      when: 'Java',
      problem: 'An Android library for checking network connection types and internet connectivity before an application makes HTTP requests. The README identifies it as a work in progress.',
      stack: ['Java', 'Android', 'Connectivity APIs'],
      numbers: [['Java', 'implementation language'], ['Android', 'platform'], ['WIP', 'repository status']],
      decisions: ['The library focuses on connectivity status checks rather than presenting a full application.', 'The repository README is the source of truth for its current API and limitations.'],
      diagram: [['Android app', 'consumer'], ['Tovuti library', 'connectivity checks'], ['Android APIs', 'network state'], ['HTTP client', 'request decision']],
      link: { label: 'View repository', href: 'https://github.com/Fellow3-1/tovuti' },
      img: { src: 'assets/work-tovuti.jpg', alt: 'Illustrative Android development visual', note: 'illustrative image · public source linked', w: 928, h: 1152 },
    },
    {
      num: '#03',
      label: 'Android SMS verifier',
      sector: 'open source · mobile tooling',
      client: 'Public repository',
      when: 'Java',
      problem: 'An Android utility for detecting and handling verification messages. The current repository documentation describes SMS permissions including READ_SMS and RECEIVE_SMS; it is not represented here as a permission-free SMS Retriever implementation.',
      stack: ['Java', 'Android', 'SMS permissions'],
      numbers: [['Java', 'implementation language'], ['READ_SMS', 'documented permission'], ['Android', 'platform']],
      decisions: ['Permission requirements are stated explicitly so developers can assess the privacy and Play policy implications.', 'The repository should be reviewed before reuse, particularly for modern Android versions and current Google Play policy.'],
      diagram: [['Android app', 'verification flow'], ['SMS verifier', 'message handling'], ['SMS permissions', 'documented access'], ['Verification UI', 'code entry']],
      link: { label: 'View repository', href: 'https://github.com/Fellow3-1/android-sms-verifier' },
      img: { src: 'assets/work-sms.jpg', alt: 'Illustrative mobile verification interface', note: 'illustrative image · public source linked', w: 1408, h: 768 },
    },
  ],
  footnote: 'Only public repositories are shown here. No employer names, client identities, private screenshots, employment dates or confidential project records are published.',
}

export const infrastructure = {
  heading: 'Systems, networks and infrastructure_',
  intro: 'A capability overview rather than a client or employment history. It reflects the technical areas represented in my professional background and CV; it does not imply that every product listed has been used in a production environment.',
  groups: [
    { title: 'Systems administration', items: ['Windows desktop and server environments', 'Linux and Ubuntu administration', 'Hardware, operating system and application troubleshooting', 'User support, endpoint configuration and maintenance', 'Backup practices and operational documentation'] },
    { title: 'Networking', items: ['LAN/WAN and TCP/IP fundamentals', 'DNS, DHCP, VPN and firewall concepts', 'Router, switch and wireless network troubleshooting', 'Network availability, connectivity and performance diagnosis'] },
    { title: 'Cloud and DevOps', items: ['AWS fundamentals and cloud-hosted workloads', 'Docker and containerised development', 'Git-based workflows and CI/CD pipelines', 'Linux web-server environments and deployment support'] },
    { title: 'Automation and data', items: ['Python, Bash and scripting for operational tasks', 'SQL, relational databases and backup/restore concepts', 'REST API integration and service troubleshooting', 'Monitoring, incident documentation and root-cause analysis'] },
  ],
  note: 'Specific vendor platforms, enterprise configurations and production environments can be discussed in a technical interview. No client topology, IP address, credential, diagram or internal record is published.',
}

export const approach = {
  heading: 'How I approach technical work_',
  blocks: [
    { title: 'Diagnose before changing', body: 'Establish scope and user impact, gather logs and measurements, isolate the failing layer, then test the smallest safe corrective change. Verify service restoration before closing the incident.' },
    { title: 'Build for maintainability', body: 'Prefer clear interfaces, documented configuration, version control, repeatable deployments and tests around critical workflows. Keep secrets out of source control and make rollback paths explicit.' },
    { title: 'Communicate and document', body: 'Translate technical symptoms into operational impact, keep stakeholders updated, record the root cause and resolution, and capture preventive actions so recurring incidents become less likely.' },
  ],
}

export const writing = {
  heading: 'Technical notes_',
  note: 'Short explainers and implementation notes. Public articles should reflect reproducible technical guidance, not confidential project details.',
  posts: [
    {
      date: 'Guide',
      published: '2025-11-03',
      title: 'Designing safer M-PESA callback handling',
      slug: 'safer-mpesa-callbacks',
      blurb: 'Idempotent payment callbacks, raw event storage for audit, and why a timeout means unknown, not failed.',
      minutes: 'Payments',
      body: ['Treat payment callbacks as untrusted, retryable input. Validate the request, persist the raw event for audit, make processing idempotent, and reconcile uncertain outcomes against the provider rather than assuming a timeout means failure.', 'Keep credentials in environment-backed secret storage, use HTTPS, log correlation identifiers instead of sensitive customer data, and test duplicate and out-of-order callback scenarios.'],
    },
    {
      date: 'Guide',
      published: '2025-11-03',
      title: 'A practical network troubleshooting sequence',
      slug: 'network-troubleshooting-sequence',
      blurb: 'Scope first, then link state, addressing, gateway, DNS and routing — one variable at a time.',
      minutes: 'Networking',
      body: ['Start by confirming the scope: one device, one VLAN, one site or a wider outage. Check link state and addressing, then gateway reachability, DNS resolution, route selection and the destination service.', 'Record the exact tests and timestamps. Avoid changing several network variables at once; isolate the fault and verify the fix from an affected endpoint.'],
    },
    {
      date: 'Guide',
      published: '2025-11-03',
      title: 'Linux service diagnostics',
      slug: 'linux-service-diagnostics',
      blurb: 'systemctl, journalctl, ss and resource pressure — evidence before the restart button.',
      minutes: 'Systems',
      body: ['Check service state with systemctl, inspect recent events with journalctl, confirm listening sockets with ss, and verify disk, memory and CPU pressure before restarting a production service.', 'A restart can restore service, but it is not a root-cause analysis. Capture the failure evidence and investigate why the service stopped or became unhealthy.'],
    },
  ],
}

/* Commitments, in the first person, instead of other people's words.
   The site's rule is that nothing is published on someone else's behalf
   without their consent — so this section states the working habits those
   references would describe, and offers the references privately. */
export const commitments = {
  heading: 'How working together feels_',
  note: 'No quotes appear here until the people behind them agree to be named. What follows is my side of that bargain; references are available on request.',
  items: [
    {
      label: 'communication',
      line: 'Plain language first — what broke, who is affected, what I am doing about it — then the detail and the evidence.',
    },
    {
      label: 'handover',
      line: 'Written configs, rollback steps and the reason the decision was made. Nothing important left inside one person’s head.',
    },
    {
      label: 'change',
      line: 'Nothing gets restarted, deleted or migrated before the failure has been read. Every fix ends with a short written record.',
    },
  ],
}

export const about = {
  heading: 'About and technical profile_',
  bio: 'I work across software engineering and IT operations, combining application development with practical systems, networking and troubleshooting experience. My public profile focuses on verifiable code and technical capabilities; private employment and client details are deliberately excluded.',
  skills: [
    { depth: 'Software engineering', items: 'JavaScript, TypeScript, React, Node.js, PHP, Python, Java, REST APIs, SQL and M-PESA Daraja integrations' },
    { depth: 'Systems and networks', items: 'Windows, Linux/Ubuntu, LAN/WAN, TCP/IP, DNS, DHCP, VPN, firewalls, hardware and end-user support' },
    { depth: 'Cloud and delivery', items: 'AWS, Docker, Git, CI/CD, Linux web servers and deployment workflows' },
  ],
  availability: {
    heading: 'Availability',
    lines: ['Open to full-time, contract and consulting opportunities.', 'Based in Nairobi, Kenya (EAT, UTC+3).', 'For detailed employment history and references, please request them privately.'],
  },
}

export const faq = {
  heading: 'Questions people ask_',
  note: 'A concise overview of the public portfolio and privacy approach.',
  items: [
    { q: 'Why is there no employment timeline?', a: 'To protect personal and client privacy, this site does not publish employer names, job titles tied to employers, employment dates or internal project records. Detailed employment information can be shared privately during a recruitment process.' },
    { q: 'What can I review publicly?', a: 'The linked GitHub repositories, their README files and source code are the primary evidence presented here. The site avoids unsupported client metrics and confidential screenshots.' },
    { q: 'Does the infrastructure section represent every vendor as production experience?', a: 'No. It is a high-level capability overview. Specific vendor platforms and production environments should be assessed through a direct technical discussion.' },
    { q: 'What opportunities are of interest?', a: 'Software engineering, systems administration, IT operations, infrastructure support and network-focused roles, as well as relevant consulting engagements.' },
    { q: 'What happens to a message sent through this site?', a: 'It is stored in a database only I can read, used only to reply, and deleted when the conversation ends. No analytics, cookies or third-party scripts receive it. The email draft the form prepares stays on your device.' },
  ],
}

export const contact = {
  heading: 'Start a conversation_',
  intro: 'Use the channels below to discuss a role, project or technical opportunity.',
  fields: [
    { key: 'name', label: 'name', placeholder: 'Your name' },
    { key: 'work', label: 'the opportunity', placeholder: 'Role, project or technical requirement' },
    { key: 'reach', label: 'your email', placeholder: 'you@company.com' },
  ],
  idleshow: ['Nothing drafted yet.', 'Complete the fields to send a message.'],
  confirmed: ['READY', 'Message on its way — with a draft you can send yourself.'],
  ctaLabel: 'Send message',
  ctaDone: 'Send again',
  mailLabel: 'Open email draft',
  copyLabel: 'Copy draft',
  directLabel: 'Prefer a plain email? Write straight to',
  hint: 'Your name, the brief and your email are sent to a database only I can read — and to nothing else. The email draft stays on your device.',
  delivery: {
    sending: 'sending to the inbox…',
    sent: 'delivered — the message is in my inbox.',
    failed: 'the inbox did not answer. Open the email draft instead — it is already prepared.',
    offline: 'this browser cannot reach the inbox. Open the email draft instead.',
    delivered: 'delivered',
    draft: 'email draft',
  },
  pills: [
    { label: 'GitHub', dot: 'red', glyph: '×', href: 'https://github.com/Fellow3-1' },
    { label: 'LinkedIn', dot: 'amber', glyph: '−', href: 'https://linkedin.com/in/felloh31' },
    { label: 'Email', dot: 'green', glyph: '+', href: 'mailto:felixodhiambo31@live.com' },
  ],
  disclaimer: 'No analytics, no cookies, no third parties. Messages are used only to reply, and deleted when the conversation ends.',
}

export const footer = {
  sections: [
    { label: 'Top', href: '#top' },
    { label: 'Projects', href: '#work' },
    { label: 'Infrastructure', href: '#infrastructure' },
    { label: 'Skills', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  hygienic: ['No public employment or client records', 'No private project screenshots or infrastructure diagrams', 'Public code links are provided for independent review', 'Location: Nairobi, Kenya'],
  colophon: ['Engineering portfolio', 'Public work, private employment details'],
  line: '© 2026 Felloh 3.1 · Felix Odhiambo · Nairobi, Kenya',
  muse: 'the muse keeps the favicon warm',
}

/* The one piece of work that can be described in full, because it is this
   site: constraints, rejected options, system, failures, what is checked. */
export const caseStudy = {
  slug: 'a-portfolio-that-refuses-to-invent-numbers',
  kicker: 'case study · this site',
  title: 'A portfolio that refuses to invent numbers',
  summary:
    'Most developer portfolios are built to show outcomes. This one is built around a harder constraint — publish the code and the method, publish nothing about employers, clients or results that cannot be verified — and the engineering that constraint forced.',
  date: '2026-11-11',
  dateLabel: '11 November 2026',
  minutes: '7 min read',
  sections: [
    {
      heading: 'The constraint',
      body: [
        'The obvious version of a portfolio is a list of jobs with a timeline, some client logos, and three metrics per project. I am not willing to publish employer names, employment dates, client identities or internal project records. That is not modesty; those things belong to other people.',
        'So the site had to make an argument without them. Everything on it is either public code the reader can open, a capability stated as a capability, or a decision explained in the first person. Anything that would have needed a private document to verify was cut.',
      ],
    },
    {
      heading: 'What I rejected',
      body: [
        'A timeline with logos and dates, because a portfolio that leaks an employment history to every visitor is not a portfolio I want to host. A downloadable CV, for the same reason — the details are offered in conversation instead.',
        'Anonymous testimonials presented as quotations. The first draft of this section did exactly that, with lines attributed to "a systems support colleague". Nobody had said them. They read as endorsements and could not be checked, which is the failure mode the rest of the site exists to avoid. They are now first-person commitments, with references offered on request.',
        'Invented impact numbers. There is no "40 % faster checkout" here because there is no public artifact that proves one. What replaces it is a stack, a stated status, and the reasoning behind the visible decisions.',
      ],
    },
    {
      heading: 'The system',
      body: [
        'One React page, hand-written CSS, no utility framework — the design is a paper log with terminal chrome, and it is cheaper to write that directly than to fight a framework into it. All copy lives in a single content module, so privacy rules can be checked in one file instead of hunted across components.',
        'Each note is also generated as a standalone static page by a small Node script at build time, with its own canonical URL, Open Graph tags and JSON-LD. Search engines and answer engines get real documents; the reader gets a page with no bundle.',
        'Structured data covers the person, the profile page, the notes, the FAQ and the three public repositories. There is an llms.txt, a sitemap, an RSS feed and a robots file that explicitly welcomes crawlers.',
      ],
    },
    {
      heading: 'What broke',
      body: [
        'Two deploy paths. GitHub Pages was serving a build committed into docs/ while a workflow uploaded a different build as an artifact. They diverged, and the live site spent weeks showing a seven-section version of a nine-section page. The fix was not code: pick one deploy path, and let a script, not a human, refresh the output.',
        'The hero shipped 223 KB of pixels that no viewport displayed — a portrait photograph cropped to a 260-pixel band by CSS object-fit, with the rest downloaded for nothing. It is now cropped at build time to the band that is actually rendered, and phones get a separate 3:2 crop instead of a letterboxed slice.',
        'The page started at opacity zero and waited for the bundle to reveal it. Correct for a fade-in, catastrophic if the bundle 404s: a blank sheet of paper. There is now a 2.5-second watchdog that reveals the content regardless.',
      ],
    },
    {
      heading: 'What is checked, and how',
      body: [
        'A smoke test builds the real app with esbuild, renders it in jsdom and asserts the things that matter: the privacy rules (no employment timeline, no education or certification claims, no CV download), the structure (three repositories, four infrastructure groups, four FAQ answers), the schema, the feed and sitemap, and the contact form — including that it can never be mounted with a silently disabled button, and that a draft can be both opened and copied.',
        'The suite is deliberately blunt. It does not check pixels; it checks that a promise the page makes in prose still has something behind it. There are 46 of those checks, and they run on every push before the deploy job is allowed to start.',
      ],
    },
    {
      heading: 'What I would do differently',
      body: [
        'Generate the feed and sitemap from the content module instead of maintaining them by hand, so a new note cannot exist in one place and not the other. Self-host the typeface rather than route the critical path through a third-party font host. And decide the deployment story before the first deploy, not after the second one silently wins.',
      ],
    },
  ],
}
