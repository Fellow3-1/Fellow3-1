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
  tagline: "First of his name. The Unboxed. Creator of crispy stuff. Breaker of mediocre products.",
  about: [
    "I design and ship modern full-stack web and mobile systems end-to-end — from the first wireframe to the last container in the cluster. Interfaces, APIs, data, and infrastructure should feel like one organism: fast, legible, and a little dangerous.",
    "For over a decade I have moved between the browser, the device, and the cloud — Android internals, payments rails, low-level C, and now AI/LLM integration and cloud-native architecture.",
    "I lead with clean architecture, automated pipelines, and readable code. Coffee goes in; crisp, production-grade systems come out.",
  ],
  availability: "Open to senior roles, consulting, and open-source collaboration.",
};

export const roles = [
  "Senior Full-Stack Software Engineer",
  "Cloud-Native Architect",
  "Mobile & Web Application Developer",
  "AI / LLM Integration Engineer",
  "Open Source Maintainer",
];

export const stats = [
  { label: "Years on the network", value: 12, suffix: "+", note: "committing since October 2014" },
  { label: "Public repositories", value: 90, suffix: "", note: "systems, forks & experiments" },
  { label: "Operators following", value: 39, suffix: "", note: "watching the node" },
  { label: "Forks on mpesa-api-go", value: 34, suffix: "", note: "unofficial Go wrapper still circulating" },
];

export const marquee = [
  "Senior Full-Stack",
  "React · TypeScript",
  "Cloud-Native",
  "Docker · Kubernetes",
  "AI / LLM",
  "Android · Kotlin",
  "Go · MPESA",
  "Open Source",
  "Neovim",
  "Nairobi · UTC+3",
  "Crispy Systems",
  "House Android",
];

export const timeline = [
  {
    era: "2014 — House Android",
    hash: "a3f9c1d",
    title: "Android internals & the modding scene",
    org: "Independent · XDA era",
    body: "The origin story. Root, custom ROMs, Magisk tooling and device trees — learning how software really works by tearing it apart at the kernel level.",
    tags: ["Android", "Magisk", "Linux", "Java"],
  },
  {
    era: "2018 — 2019 · ALC / Google",
    hash: "7b2e0f4",
    title: "Android Engineering, Andela Learning Community",
    org: "ALC · Udacity / Google Android",
    body: "Formalised the craft through the Google/Udacity Android for Beginners track and Andela Learning Community challenges — shipping Tic-Tac-Toe, Just Java, and Court Counter apps.",
    tags: ["Java", "Android Studio", "XML", "Firebase"],
  },
  {
    era: "2020 · BuildForSDG",
    hash: "c91d4a8",
    title: "Software Engineer — Cohort 1",
    org: "@BuildForSDG",
    body: "Built COVID-19 estimator tooling for the Sustainable Development Goals initiative, shipping JS systems against tight, real-world product constraints.",
    tags: ["JavaScript", "Node.js", "APIs"],
  },
  {
    era: "2020 — 2021 · Fintech",
    hash: "e45f7b2",
    title: "Payments rails — MPESA / Daraja",
    org: "Open Source · Safaricom APIs",
    body: "Authored mpesa-api-go, the unofficial Safaricom MPESA (Daraja) API wrapper for Golang — 34 forks and counting — alongside Node and Android SDK work in the payments space.",
    tags: ["Go", "REST", "Safaricom", "OAuth"],
  },
  {
    era: "2023 — 2024 · ALX",
    hash: "08ac3e9",
    title: "Software Engineering — systems & full-stack",
    org: "ALX Africa",
    body: "Went close to the metal: a custom printf, a bytecode interpreter (monty), low-level C, Python, and system engineering / DevOps curriculum across 20+ repositories.",
    tags: ["C", "Python", "Shell", "DevOps"],
  },
  {
    era: "2024 — Now",
    hash: "f1d60c5",
    title: "AI, cloud-native & developer tooling",
    org: "Independent · Open Source",
    body: "Building LLM-powered interfaces, React Router and Astro starter templates, and cloud-native architecture — while looking to collaborate on OSS and developer tools.",
    tags: ["React", "TypeScript", "LLM", "Kubernetes"],
  },
];

export const services = [
  {
    icon: "Globe",
    title: "Full-Stack Web Engineering",
    body: "Production React / TypeScript frontends and Node, Go or Python backends — designed, tested, and shipped together as one system.",
  },
  {
    icon: "Smartphone",
    title: "Mobile & Cross-Platform",
    body: "Native Android (Kotlin/Java) and cross-platform React Native / Flutter apps, from the device layer up to the store.",
  },
  {
    icon: "Cloud",
    title: "Cloud-Native Architecture",
    body: "Docker, Kubernetes, AWS and edge platforms — containerised, observable, and deployable with clean CI/CD pipelines.",
  },
  {
    icon: "Sparkles",
    title: "AI / LLM Integration",
    body: "Conversational interfaces, retrieval pipelines and agentic tooling wired into real products with a focus on reliability.",
  },
  {
    icon: "Wrench",
    title: "Open Source & Tooling",
    body: "Maintainer-minded: SDKs, templates and developer tools that respect the people who have to read them later.",
  },
  {
    icon: "Compass",
    title: "Engineering Leadership",
    body: "Architecture reviews, code reviews, and mentoring — turning vague ideas into crisp, ship-ready systems.",
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
    kicker: "Unofficial Safaricom Daraja SDK",
    description:
      "Unofficial Safaricom MPESA (Daraja) API wrapper for Golang — bringing Kenyan payments rails into a language that likes speed.",
    lang: "Go",
    stars: 8,
    forks: 34,
    tags: ["Go", "REST", "OAuth", "Fintech"],
    link: "https://github.com/Fellow3-1/mpesa-api-go",
    image: "assets/proj-mpesa.jpg",
    featured: true,
  },
  {
    name: "tovuti",
    kicker: "Connectivity & speed utility",
    description:
      "Library for live internet connection status and speed on Wi-Fi and mobile data — a small utility thousands of Android apps have reused.",
    lang: "Java",
    stars: 15,
    forks: 12,
    tags: ["Java", "Android", "Library"],
    link: "https://github.com/Fellow3-1/tovuti",
    image: "assets/proj-tovuti.jpg",
  },
  {
    name: "android-sms-verifier",
    kicker: "OTP autofill library",
    description: "Auto-copies verification codes from SMS straight into the app — no more tab-switching during login.",
    lang: "Java",
    stars: 6,
    forks: 3,
    tags: ["Java", "Android", "UX"],
    link: "https://github.com/Fellow3-1/android-sms-verifier",
    image: "assets/proj-mobile.jpg",
  },
  {
    name: "printf + monty",
    kicker: "Systems programming",
    description: "A custom printf implementation and a stack-based bytecode interpreter — close to the metal, taught me how machines think.",
    lang: "C",
    stars: 4,
    forks: 5,
    tags: ["C", "Systems", "ALX"],
    link: "https://github.com/Fellow3-1/printf",
    image: "assets/proj-systems.jpg",
  },
  {
    name: "llm-chat-app",
    kicker: "Conversational AI template",
    description: "A template for conversational interfaces sitting on modern LLM rails — streaming, history, and clean separation of concerns.",
    lang: "JavaScript",
    stars: 5,
    forks: 2,
    tags: ["AI", "LLM", "JavaScript"],
    link: "https://github.com/Fellow3-1/llm-chat-app-template",
    image: "assets/proj-ai.jpg",
  },
  {
    name: "VR_Navigation",
    kicker: "Experimental · in development",
    description: "A virtual-reality wayfinding experiment — navigation reimagined as light and depth.",
    lang: "CSS",
    stars: 2,
    forks: 1,
    tags: ["VR", "CSS", "Experiment"],
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
    body: "Systems, full-stack and DevOps curriculum — low-level C, Python, Shell, and collaborative group builds.",
  },
  {
    type: "Program",
    title: "Andela Learning Community",
    org: "ALC / Google · 2018 — 2019",
    body: "Android engineering track with Google & Udacity — app architecture, Firebase, and shipping challenges.",
  },
  {
    type: "Certification",
    title: "Android Development for Beginners",
    org: "Google · Udacity",
    body: "Foundational Android track — XML layouts, activities, intents, and the Android lifecycle.",
  },
  {
    type: "Cohort",
    title: "BuildForSDG — Cohort 1",
    org: "@BuildForSDG · 2020",
    body: "Software for the Sustainable Development Goals — estimator tooling shipped under real deadlines.",
  },
];

export const socials = [
  { label: "GitHub", value: "github.com/Fellow3-1", href: "https://github.com/Fellow3-1" },
  { label: "X / Twitter", value: "@Fellow3_1", href: "https://twitter.com/Fellow3_1" },
  { label: "Email", value: "felixodhiambo31@live.com", href: "mailto:felixodhiambo31@live.com" },
  { label: "Org", value: "@BuildForSDG", href: "https://github.com/BuildForSDG" },
  { label: "Coordinates", value: "Nairobi, Kenya · UTC+3" },
];

// --- Nexus OS data ----------------------------------------------------------

/** neofetch-style panel on the hero. */
export const sysinfo = {
  host: "felloh@nexus",
  os: "Nexus OS 3.1 LTS",
  kernel: "house-android 6.1.0-nbo",
  uptime: "12+ years in production",
  shell: "zsh 5.9 + Neovim",
  editor: "Neovim (btw)",
  stack: "React · TypeScript · Go · K8s",
  location: "Nairobi, Kenya · UTC+3",
  status: "OPEN FOR WORK",
};

/** Boot screen kernel messages (fast, skippable). */
export const bootLines = [
  "nexus-kernel: loading House Android image ......... [ OK ]",
  "mounting /dev/nairobi ............................. [ OK ]",
  "starting authd · credentials: senior engineer ..... [ OK ]",
  "attaching units: web.service mobile.service k8s ... [ OK ]",
  "ai-daemon: warming LLM context .................... [ OK ]",
  "welcome to nexus os 3.1 — session: guest",
];

/** Registry for the ⌘K command palette. */
export const commands = [
  { id: "top", label: "Go to Hero", hint: "Jump to the top of the page", kbd: "G H", run: () => "#top" },
  { id: "about", label: "About · whoami", hint: "Identity dossier", kbd: "G A", run: () => "#about" },
  { id: "experience", label: "Experience · git log", hint: "12 years of shipping", kbd: "G E", run: () => "#experience" },
  { id: "skills", label: "Skills · stack", hint: "The full arsenal, filterable", kbd: "G S", run: () => "#skills" },
  { id: "projects", label: "Projects · ls ~/work", hint: "Selected repositories", kbd: "G P", run: () => "#projects" },
  { id: "contact", label: "Contact · open channel", hint: "Email, GitHub, X", kbd: "G C", run: () => "#contact" },
  { id: "github", label: "Open GitHub profile", hint: "github.com/Fellow3-1", kbd: "", run: () => "https://github.com/Fellow3-1" },
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
  { id: "download", label: "Download résumé", hint: "Grab the CV", kbd: "", run: () => "assets/cv-felix-odhiambo.txt" },
];

/**
 * Interactive terminal registry. Each command returns lines of output.
 * Keep it honest — these are real facts and real links.
 */
export const termCommands = {
  help: () => [
    "nexus-shell — available commands:",
    "  whoami     uptime      stack      neofetch",
    "  projects   contact     socials    motto",
    "  clear      exit",
    "  (tip: <cmd> --help is decorative, like most CLIs)",
  ],
  whoami: () => ["felix odhiambo — felloh 3.1 · House Android · The Unboxed", "senior full-stack & cloud engineer, Nairobi (UTC+3)"],
  uptime: () => ["up 12+ years, 0 critical incidents on the mantle", "12+ years shipping · 90 public repos · 34 forks on mpesa-api-go"],
  stack: () => ["primary   typescript · react · node", "systems   go · c · python", "mobile    android (java/kotlin) · react native", "infra     docker · kubernetes · aws · github actions"],
  neofetch: () => [
    "felloh@nexus",
    "-----------",
    "OS....... Nexus OS 3.1 LTS",
    "Kernel... house-android 6.1.0-nbo",
    "Shell.... zsh + neovim (btw)",
    "Uptime... 12+ years in production",
    "Stack.... React · TypeScript · Go · K8s",
  ],
  projects: () => [
    "mpesa-api-go ....... Go SDK for Safaricom Daraja (34 forks)",
    "tovuti ............. Android connectivity library",
    "android-sms-verifier  OTP autofill for Android",
    "printf + monty ..... C systems builds (ALX)",
    "llm-chat-app ....... LLM chat template",
    "→ full list: github.com/Fellow3-1?tab=repositories",
  ],
  contact: () => ["email.... felixodhiambo31@live.com", "github... github.com/Fellow3-1", "x........ @Fellow3_1", "run `open mailto` in your head — or use the form beside this terminal."],
  socials: () => ["github.com/Fellow3-1 · @Fellow3_1 · felixodhiambo31@live.com"],
  motto: () => ["coffee in. crispy systems out."],
  exit: () => ["there is no exit. only deploy. (just kidding — scroll on)"],
};

export const terminalScript = [
  { cmd: "whoami", out: "felloh@nexus — Senior Full-Stack & Cloud Engineer · House Android" },
  { cmd: "status --live", out: "shipping full-stack web + mobile · open to senior roles" },
  { cmd: "stack --top", out: "React · TypeScript · Go · Docker · Kubernetes" },
  { cmd: "open --channel", out: "felixodhiambo31@live.com · github.com/Fellow3-1 · @Fellow3_1" },
  { cmd: "echo motto", out: "coffee in. crispy systems out." },
];
