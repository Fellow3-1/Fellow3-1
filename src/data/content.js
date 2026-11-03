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
      img: { src: 'assets/work-mpesa.jpg', alt: 'Illustrative M-PESA integration visual', note: 'illustrative image · public source linked' },
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
      img: { src: 'assets/work-tovuti.jpg', alt: 'Illustrative Android development visual', note: 'illustrative image · public source linked' },
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
      img: { src: 'assets/work-sms.jpg', alt: 'Illustrative mobile verification interface', note: 'illustrative image · public source linked' },
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
    { date: 'Guide', title: 'Designing safer M-PESA callback handling', minutes: 'Payments', body: ['Treat payment callbacks as untrusted, retryable input. Validate the request, persist the raw event for audit, make processing idempotent, and reconcile uncertain outcomes against the provider rather than assuming a timeout means failure.', 'Keep credentials in environment-backed secret storage, use HTTPS, log correlation identifiers instead of sensitive customer data, and test duplicate and out-of-order callback scenarios.'] },
    { date: 'Guide', title: 'A practical network troubleshooting sequence', minutes: 'Networking', body: ['Start by confirming the scope: one device, one VLAN, one site or a wider outage. Check link state and addressing, then gateway reachability, DNS resolution, route selection and the destination service.', 'Record the exact tests and timestamps. Avoid changing several network variables at once; isolate the fault and verify the fix from an affected endpoint.'] },
    { date: 'Guide', title: 'Linux service diagnostics', minutes: 'Systems', body: ['Check service state with systemctl, inspect recent events with journalctl, confirm listening sockets with ss, and verify disk, memory and CPU pressure before restarting a production service.', 'A restart can restore service, but it is not a root-cause analysis. Capture the failure evidence and investigate why the service stopped or became unhealthy.'] },
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
  education: ['Degree in Business Information Technology'],
  certifications: ['Associate Android Developer Certification (Java) · Andela Learning Community with Google'],
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
  idleshow: ['Nothing drafted yet.', 'Complete the fields to prepare an email.'],
  confirmed: ['READY', 'Your email draft is ready to open.'],
  ctaLabel: 'Prepare email',
  ctaDone: 'Rebuild email',
  mailLabel: 'Open email draft',
  pills: [
    { label: 'GitHub', dot: 'red', glyph: '×', href: 'https://github.com/Fellow3-1' },
    { label: 'LinkedIn', dot: 'amber', glyph: '−', href: 'https://linkedin.com/in/felloh31' },
    { label: 'Email', dot: 'green', glyph: '+', href: 'mailto:felixodhiambo31@live.com' },
  ],
  disclaimer: 'The form prepares an email on your device. It does not submit your information to this website.',
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
