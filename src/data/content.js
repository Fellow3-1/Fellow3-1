// ---------------------------------------------------------------------------
// Single source of truth for the portfolio content.
// Facts (repo counts, forks, dates, handles) reflect Felloh's public GitHub
// profile: https://github.com/Fellow3-1
// ---------------------------------------------------------------------------

export const profile = {
  handle: "Felloh 3.1",
  realName: "Felix Odhiambo",
  house: "House Android",
  epithet: "The Unboxed",
  location: "Nairobi, Kenya",
  timeZone: "Africa/Nairobi",
  utc: "UTC+3",
  role: "Senior Full-Stack & Cloud Engineer",
  tagline: "I build websites, apps and the systems behind them — and I make them fast, clear and easy to use.",
  about: [
    "I build things people actually use: websites, mobile apps, and the invisible plumbing that keeps them running. I take a project from the first sketch all the way to launch day.",
    "For over ten years I've worked across phones, browsers and the cloud — including mobile payments in Kenya and, more recently, adding AI features to everyday products.",
    "My promise is simple: something that loads fast, works on any device, and is easy for the next person to look after.",
  ],
  availability: "Available for full-time roles, freelance projects and friendly collaborations.",
};

export const roles = [
  "I build websites",
  "I build mobile apps",
  "I connect apps to payments",
  "I add AI to products",
  "I keep it all running",
];

export const stats = [
  { label: "Years building software", value: 12, suffix: "+", note: "writing code since 2014" },
  { label: "Projects shared publicly", value: 90, suffix: "", note: "apps, tools and experiments" },
  { label: "Developers following along", value: 39, suffix: "", note: "on GitHub" },
  { label: "Teams reusing my payment tool", value: 34, suffix: "", note: "my M-PESA helper, copied and reused" },
];

export const marquee = [
  "Websites",
  "Mobile apps",
  "Online payments",
  "AI features",
  "Fast & accessible",
  "Clean design",
  "Reliable hosting",
  "Nairobi, Kenya",
  "12+ years",
  "Free & open source",
];

export const timeline = [
  {
    era: "2014 — Where it started",
    hash: "a3f9c1d",
    title: "Taking phones apart to learn how they work",
    org: "Self-taught",
    body: "I started by customising Android phones — rebuilding the software that runs on them. It taught me how software really works, from the inside out.",
    tags: ["Android", "Phones", "Self-taught"],
  },
  {
    era: "2018 — 2019 · Training with Google",
    hash: "7b2e0f4",
    title: "Learning app development properly",
    org: "Google & Andela learning programme",
    body: "I turned a hobby into a profession through a Google-backed training programme, building and shipping my first real Android apps.",
    tags: ["Android apps", "Training"],
  },
  {
    era: "2020 · Building for good",
    hash: "c91d4a8",
    title: "Software for the UN development goals",
    org: "@BuildForSDG",
    body: "I helped build a COVID-19 forecasting tool as part of a programme creating software for the UN Sustainable Development Goals — real deadlines, real users.",
    tags: ["Teamwork", "Public good"],
  },
  {
    era: "2020 — 2021 · Mobile money",
    hash: "e45f7b2",
    title: "Making M-PESA payments easy to plug in",
    org: "Open source project",
    body: "I wrote a free tool that lets other developers accept M-PESA mobile payments in their apps. Dozens of teams have reused it since.",
    tags: ["Payments", "M-PESA", "Open source"],
  },
  {
    era: "2023 — 2024 · Going deeper",
    hash: "08ac3e9",
    title: "Formal software engineering training",
    org: "ALX Africa",
    body: "A full engineering programme covering the foundations — how computers, servers and teams really work — across more than twenty hands-on projects.",
    tags: ["Fundamentals", "Servers"],
  },
  {
    era: "2024 — Today",
    hash: "f1d60c5",
    title: "Modern web apps with a bit of AI",
    org: "Freelance & open source",
    body: "Today I build fast, modern websites and apps — often with AI assistants built in — and share reusable starter kits with other developers.",
    tags: ["Websites", "AI", "Cloud"],
  },
];

export const services = [
  {
    icon: "Globe",
    title: "Websites & web apps",
    body: "From a simple landing page to a full customer portal — designed, built and launched, and quick on every connection.",
  },
  {
    icon: "Smartphone",
    title: "Mobile apps",
    body: "Android and cross-platform apps, taken all the way from idea to a listing on the app store.",
  },
  {
    icon: "Cloud",
    title: "Hosting that stays up",
    body: "I set up the servers and automatic updates behind your product, so it keeps running while you sleep.",
  },
  {
    icon: "Sparkles",
    title: "AI features",
    body: "Chat assistants and smart search added to your product — useful and dependable, not a gimmick.",
  },
  {
    icon: "Wrench",
    title: "Tools for other developers",
    body: "Free, well-documented tools and templates that other teams can pick up and use straight away.",
  },
  {
    icon: "Compass",
    title: "Advice & mentoring",
    body: "A second opinion on your plan, your code or your team — turning a rough idea into something ready to build.",
  },
];

export const skillCategories = [
  {
    id: "lang",
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "C++", "C", "C#", "Java", "Kotlin", "Swift", "PHP", "HTML5", "CSS3", "SQL", "Bash"],
  },
  {
    id: "front",
    label: "Frontend",
    items: ["React", "Next.js", "Vue", "Nuxt", "Svelte", "Astro", "Tailwind", "SASS", "Vite", "Vuetify", "Bootstrap"],
  },
  {
    id: "back",
    label: "Backend",
    items: ["Node.js", "Express", "NestJS", "Fastify", "Flask", "FastAPI", "Django", "Spring Boot", "GraphQL", "REST"],
  },
  {
    id: "data",
    label: "Data & ORMs",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Prisma", "Firebase", "SQLite"],
  },
  {
    id: "ai",
    label: "AI / ML",
    items: ["OpenAI", "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "Pandas", "NumPy"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "Cloudflare", "Vercel", "Netlify", "GitHub Actions", "Nginx", "Linux", "Heroku"],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: ["React Native", "Flutter", "Expo", "Android Studio", "Kotlin"],
  },
  {
    id: "design",
    label: "Design & Tools",
    items: ["Figma", "Illustrator", "Photoshop", "Adobe XD", "Canva", "Neovim", "Git", "Postman"],
  },
];

// Selected work. `lang` drives the real GitHub language dot color.
export const projects = [
  {
    name: "mpesa-api-go",
    kicker: "Accept M-PESA payments",
    description:
      "A free tool that lets developers take M-PESA mobile payments inside their own apps, without wrestling with the paperwork.",
    lang: "Go",
    stars: 8,
    forks: 34,
    tags: ["Payments", "M-PESA"],
    link: "https://github.com/Fellow3-1/mpesa-api-go",
    image: "assets/proj-mpesa.jpg",
    featured: true,
  },
  {
    name: "tovuti",
    kicker: "Know when the internet drops",
    description:
      "A small add-on for Android apps that tells them, in real time, whether the user is online and how fast their connection is.",
    lang: "Java",
    stars: 15,
    forks: 12,
    tags: ["Android", "Reliability"],
    link: "https://github.com/Fellow3-1/tovuti",
    image: "assets/proj-tovuti.jpg",
  },
  {
    name: "android-sms-verifier",
    kicker: "No more typing codes",
    description: "Fills in the security code from a text message automatically, so signing in takes one tap instead of five.",
    lang: "Java",
    stars: 6,
    forks: 3,
    tags: ["Android", "Ease of use"],
    link: "https://github.com/Fellow3-1/android-sms-verifier",
    image: "assets/proj-mobile.jpg",
  },
  {
    name: "Foundations",
    kicker: "How computers really work",
    description: "Two from-scratch builds of the parts most programmers take for granted — the deep end, and the best teacher I have had.",
    lang: "C",
    stars: 4,
    forks: 5,
    tags: ["Fundamentals"],
    link: "https://github.com/Fellow3-1/printf",
    image: "assets/proj-systems.jpg",
  },
  {
    name: "AI chat starter",
    kicker: "Add an assistant to your product",
    description: "A ready-made starting point for adding a chat assistant to a website or app, with replies that stream in as they are written.",
    lang: "JavaScript",
    stars: 5,
    forks: 2,
    tags: ["AI", "Chat"],
    link: "https://github.com/Fellow3-1/llm-chat-app-template",
    image: "assets/proj-ai.jpg",
  },
  {
    name: "VR wayfinding",
    kicker: "A work in progress",
    description: "An experiment in finding your way around a space in virtual reality, using light and depth instead of arrows.",
    lang: "CSS",
    stars: 2,
    forks: 1,
    tags: ["VR", "Experiment"],
    link: "https://github.com/Fellow3-1/VR_Navigation",
    image: "assets/proj-vr.jpg",
  },
];

export const achievements = ["Pull Shark ×2", "Pair Extraordinaire", "YOLO", "GitHub Developer Program Member"];

export const education = [
  {
    type: "Program",
    title: "ALX Software Engineering",
    org: "ALX Africa · 2023 — 2024",
    body: "A full engineering programme: the fundamentals of software, servers, and building in a team.",
  },
  {
    type: "Program",
    title: "Andela Learning Community",
    org: "ALC / Google · 2018 — 2019",
    body: "A Google-backed mobile development track, with real apps to build and deadlines to meet.",
  },
  {
    type: "Certification",
    title: "Android Development for Beginners",
    org: "Google · Udacity",
    body: "The Google course that turned phone tinkering into proper app development.",
  },
  {
    type: "Cohort",
    title: "BuildForSDG — Cohort 1",
    org: "@BuildForSDG · 2020",
    body: "Building software for the UN development goals, alongside engineers from across Africa.",
  },
];

export const socials = [
  { label: "GitHub", value: "github.com/Fellow3-1", href: "https://github.com/Fellow3-1" },
  { label: "X / Twitter", value: "@Fellow3_1", href: "https://twitter.com/Fellow3_1" },
  { label: "Email", value: "felixodhiambo31@live.com", href: "mailto:felixodhiambo31@live.com" },
  { label: "Community", value: "@BuildForSDG", href: "https://github.com/BuildForSDG" },
  { label: "Based in", value: "Nairobi, Kenya" },
];

// --- Extras ----------------------------------------------------------

/** neofetch-style panel on the hero. */
export const sysinfo = {
  name: "Felix Odhiambo",
  role: "Software engineer",
  experience: "12+ years",
  focus: "Websites, apps & AI features",
  worksWith: "Startups, agencies & founders",
  favouriteTools: "React, Go, Android, cloud",
  location: "Nairobi, Kenya",
  status: "AVAILABLE FOR WORK",
};

/** Boot screen kernel messages (fast, skippable). */
export const bootLines = [
  "Warming things up…",
  "Pouring the coffee…",
  "Loading twelve years of work…",
  "Almost there…",
  "Welcome — glad you stopped by.",
];

/** Registry for the ⌘K command palette. */
export const commands = [
  { id: "top", label: "Back to the top", hint: "The start of the page", kbd: "G H", run: () => "#top" },
  { id: "about", label: "About me", hint: "Who I am, in plain English", kbd: "G A", run: () => "#about" },
  { id: "experience", label: "My story", hint: "Twelve years, step by step", kbd: "G E", run: () => "#experience" },
  { id: "skills", label: "What I work with", hint: "Tools and technologies", kbd: "G S", run: () => "#skills" },
  { id: "projects", label: "Things I've built", hint: "Selected work", kbd: "G P", run: () => "#projects" },
  { id: "contact", label: "Get in touch", hint: "Email, GitHub, X", kbd: "G C", run: () => "#contact" },
  { id: "github", label: "See my GitHub", hint: "github.com/Fellow3-1", kbd: "", run: () => "https://github.com/Fellow3-1" },
  {
    id: "email",
    label: "Copy email address",
    hint: "felixodhiambo31@live.com",
    kbd: "",
    run: () => {
      navigator.clipboard?.writeText("felixodhiambo31@live.com").catch(() => {});
      return null;
    },
  },
  { id: "download", label: "Download my CV", hint: "A one-page summary", kbd: "", run: () => "assets/cv-felix-odhiambo.txt" },
];

/**
 * Interactive terminal registry. Each command returns lines of output.
 * Keep it honest — these are real facts and real links.
 */
export const termCommands = {
  help: () => [
    "Try one of these:",
    "  whoami     experience   tools      card",
    "  projects   contact      socials    motto",
    "  clear      exit",
  ],
  whoami: () => ["Felix Odhiambo — software engineer in Nairobi, Kenya", "I build websites, mobile apps and the systems behind them."],
  experience: () => ["Building software for 12+ years and still enjoying it.", "90 public projects · a payments tool reused by 34 teams"],
  tools: () => ["Websites.. React, TypeScript, Node", "Apps...... Android, React Native", "Behind it. Go, Python, databases", "Hosting... AWS, Docker, automated deploys"],
  card: () => [
    "Felix Odhiambo — “Felloh”",
    "---------------------------",
    "Software engineer · Nairobi, Kenya",
    "Websites, mobile apps and AI features",
    "12+ years of experience",
    "felixodhiambo31@live.com",
  ],
  projects: () => [
    "M-PESA tool ........ lets apps accept mobile payments",
    "Tovuti ............. tells apps when the internet drops",
    "SMS verifier ....... fills in login codes automatically",
    "AI chat starter .... adds an assistant to a product",
    "→ all 90: github.com/Fellow3-1?tab=repositories",
  ],
  contact: () => ["Email.... felixodhiambo31@live.com", "GitHub... github.com/Fellow3-1", "X........ @Fellow3_1", "Or just use the form next to this box."],
  socials: () => ["github.com/Fellow3-1 · @Fellow3_1 · felixodhiambo31@live.com"],
  motto: () => ["Coffee in. Software that just works, out."],
  exit: () => ["No exit button here — just keep scrolling."],
};

export const terminalScript = [
  { cmd: "whoami", out: "Felix Odhiambo — software engineer, Nairobi" },
  { cmd: "status", out: "Building websites and apps · available for work" },
  { cmd: "tools", out: "React · TypeScript · Go · Android · Cloud" },
  { cmd: "contact", out: "felixodhiambo31@live.com · github.com/Fellow3-1" },
  { cmd: "motto", out: "Coffee in. Software that just works, out." },
];
