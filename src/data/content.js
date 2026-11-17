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
    /* one quiet availability line under the hero note, no location prefix or clock */
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
      chrome: 'mpesa-api-go',
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
      chrome: 'tovuti',
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
      chrome: 'android-sms-verifier',
      img: { src: 'assets/work-sms.jpg', alt: 'Illustrative mobile verification interface', note: 'illustrative image · public source linked', w: 1408, h: 768 },
    },
  ],
  footnote: 'Only public repositories are shown here. No employer names, client identities, private screenshots, employment dates or confidential project records are published.',
}

export const infrastructure = {
  heading: 'Systems, networks and infrastructure_',
  intro: 'A capability overview rather than a client or employment history. It reflects the technical areas represented in my professional background and CV; it does not imply that every product listed has been used in a production environment.',
  groups: [
    { code: 'sys', title: 'Systems administration', items: ['Windows desktop and server environments', 'Linux and Ubuntu administration', 'Hardware, operating system and application troubleshooting', 'User support, endpoint configuration and maintenance', 'Backup practices and operational documentation'] },
    { code: 'net', title: 'Networking', items: ['LAN/WAN and TCP/IP fundamentals', 'DNS, DHCP, VPN and firewall concepts', 'Router, switch and wireless network troubleshooting', 'Network availability, connectivity and performance diagnosis'] },
    { code: 'cloud', title: 'Cloud and DevOps', items: ['AWS fundamentals and cloud-hosted workloads', 'Docker and containerised development', 'Git-based workflows and CI/CD pipelines', 'Linux web-server environments and deployment support'] },
    { code: 'data', title: 'Automation and data', items: ['Python, Bash and scripting for operational tasks', 'SQL, relational databases and backup/restore concepts', 'REST API integration and service troubleshooting', 'Monitoring, incident documentation and root-cause analysis'] },
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
    { label: 'Approach', href: '#approach' },
    { label: 'Writing', href: '#writing' },
    { label: 'Skills', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  hygienic: ['No public employment or client records', 'No private project screenshots or infrastructure diagrams', 'Public code links are provided for independent review', 'Location: Nairobi, Kenya'],
  colophon: ['Engineering portfolio', 'Public work, private employment details'],
  line: '© 2026 Felloh 3.1 · Felix Odhiambo · Nairobi, Kenya',
  muse: 'the muse keeps the favicon warm',
}

/* The one piece of work that can be described in full, because it is this
   site: the rule, what was cut for it, the system, the failures, what the
   smoke tests check and what is still unfinished. `lead` is the opening
   paragraph that appears above the first heading; `**bold**` in a body
   string renders as a strong lead-in on the generated page. */
export const caseStudy = {
  slug: 'a-portfolio-that-refuses-to-invent-numbers',
  kicker: 'case study · this site',
  title: 'A Portfolio That Refuses to Invent Numbers',
  summary:
    'A portfolio built on a harder rule: publish the code and the method, publish nothing about employers, clients or outcomes a stranger cannot check.',
  lead: 'Most developer portfolios are built to show off results. Mine is built around a rule that made the work harder: I publish the code and the method, and I publish nothing about employers, clients or outcomes that a stranger cannot check for themselves. This is the story of what that rule cost me and what it taught me.',
  date: '2026-11-11',
  dateLabel: '11 November 2026',
  updated: '2026-11-17',
  minutes: '7 min read',
  sections: [
    {
      heading: 'The rule I set',
      body: [
        'The usual portfolio is easy to picture. A timeline of jobs, a row of client logos, three impressive metrics under every project. I wasn’t willing to build that. Employer names, dates, client identities and internal records belong to other people, and it isn’t my place to hand them out to every visitor who lands on the page.',
        'That left me with a real design problem. The site still had to make a case for me, just without the usual props. So every claim on it had to be one of three things: public code anyone can open, a skill stated plainly as a skill, or a decision explained in my own voice. If proving something would have needed a private document, I cut it.',
      ],
    },
    {
      heading: 'What I threw out',
      body: [
        'I dropped the timeline with logos and dates. A portfolio that leaks my work history to everyone who visits is not one I want to host. I dropped the downloadable CV for the same reason, and I share those details in conversation instead.',
        'I also deleted my own testimonials. My first draft had a section with quotes attributed to “a systems support colleague.” Nobody had actually said those words. They looked like endorsements, nobody could verify them, and they were exactly the kind of thing the whole site exists to avoid. They are now commitments I make in the first person, with references available if you ask.',
        'And there are no invented impact numbers. You will not find “40% faster checkout” here, because I have no public proof of it. In its place you get the stack, an honest status, and the reasoning behind the choices you can see.',
      ],
    },
    {
      heading: 'How it is built',
      body: [
        'It is a single React page with hand-written CSS and no utility framework. The look is a paper log with a little terminal flavour, and writing that by hand was cheaper than bending a framework into shape. All the copy lives in one content file, so when I want to check that I haven’t leaked anything, I only have to read one place.',
        'Each note also gets built into its own static page by a small Node script, with its own canonical URL, Open Graph tags and JSON-LD. Search engines get real documents and readers get a fast page with no bundle to wait for. The site also ships an llms.txt, a sitemap, an RSS feed and a robots file that openly welcomes crawlers.',
        'The contact form writes to a table the browser can only add rows to. Row-level security gives the public key no permission to read, change or delete anything, so even though that key ships in the bundle, nobody can use it to see what visitors have sent me. If the database is ever unreachable, the form falls back to opening an email draft.',
      ],
    },
    {
      heading: 'What went wrong',
      body: [
        '**Two deploy paths.** GitHub Pages was serving a build I had committed into the docs folder, while a workflow uploaded a different build as an artifact. The two drifted apart, and for weeks the live site showed a seven section version of a nine section page. The fix had nothing to do with code. I picked one path and let a script, not a person, refresh the output.',
        '**A hero image nobody could see.** My portrait was sending 223 KB of pixels that no screen ever displayed, because CSS cropped it to a thin band after the full image had already downloaded. Now it is cropped at build time to the part that actually shows, and phones get their own 3:2 crop instead of a squashed slice.',
        '**A blank page waiting to happen.** The page started fully transparent and waited for the JavaScript bundle to fade it in. That is fine until the bundle fails to load, and then visitors get an empty white sheet. I added a watchdog that reveals the content after two and a half seconds no matter what.',
      ],
    },
    {
      heading: 'How I know the promises hold',
      body: [
        'I wrote a smoke test that builds the real app, renders it in jsdom and checks the things that matter. It confirms the privacy rules still hold, with no employment timeline, no education or certification claims and no CV download. It checks the structure, the schema, the feed and the sitemap. And it checks the contact form closely: the exact request it sends, the key going in the right header, the fallback working when sending fails, and a submit button that can never get stuck disabled.',
        'The tests are blunt on purpose. They don’t compare pixels. They check that every promise the page makes in words still has something real behind it. There are 77 of them, and they all have to pass before a deploy is allowed to begin.',
      ],
    },
    {
      heading: 'What is still unfinished',
      body: [
        'The deploy path is guarded but not fully fixed. GitHub Pages still serves the committed docs folder. The workflow now rebuilds it and fails if the committed copy is out of date, but removing the folder entirely needs a one time change in the repository settings that automation cannot do for me.',
        'Messages from the contact form sit in the database until I read them. Email alerts would need a mail provider key and a trigger, and that is a decision about credentials, not a coding problem.',
        'Finally, the commitments section is an honest placeholder. It stays in my own voice until two people agree to be quoted, and when they do, the layout will not need to change at all.',
      ],
    },
  ],
}
