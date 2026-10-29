// ---------------------------------------------------------------------------
// Single source of truth for the portfolio content.
// Facts (repo counts, forks, dates, handles) reflect Felloh's public GitHub
// profile: https://github.com/Fellow3-1
// ---------------------------------------------------------------------------

export const profile = {
  firstName: "Felix",
  lastName: "Odhiambo",
  handle: "Felloh",
  realName: "Felix Odhiambo",
  location: "Nairobi, Kenya",
  timeZone: "Africa/Nairobi",
  utc: "UTC+3",
  email: "felixodhiambo31@live.com",
  tagline: "Software engineer in Nairobi, building websites, apps and the systems behind them. Building since 2014.",
  facts: ["M-PESA tool reused by 34 teams", "90 public projects"],
  availability: "Available for full-time roles and freelance work. I reply within one working day.",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

// The staircase statement: five lines, ≥12 words, alternating two inks.
export const introLines = [
  { text: "Websites, apps,", ink: "full" },
  { text: "payments, AI:", ink: "soft" },
  { text: "whatever you need,", ink: "full" },
  { text: "built fast and", ink: "soft" },
  { text: "kept simple.", ink: "full" },
];

export const introNote = ["Felix Odhiambo, software engineer", "Nairobi, Kenya · UTC+3"];

// Selected work. Every entry is a real public repository.
export const projects = [
  {
    name: "mpesa-api-go",
    title: "M-PESA payments, one import away",
    description:
      "A free Go library that lets developers accept M-PESA mobile payments inside their own apps, without wrestling with the paperwork.",
    detail: "Forked by 34 teams",
    lang: "Go",
    tags: ["Payments", "M-PESA", "Open source"],
    link: "https://github.com/Fellow3-1/mpesa-api-go",
    image: "assets/work-mpesa.jpg",
    w: 1376,
    h: 768,
  },
  {
    name: "tovuti",
    title: "Know when the internet drops",
    description:
      "A small add-on for Android apps that reports, in real time, whether the user is online and how fast the connection is.",
    detail: "Forked by 12 teams",
    lang: "Java",
    tags: ["Android", "Reliability"],
    link: "https://github.com/Fellow3-1/tovuti",
    image: "assets/work-tovuti.jpg",
    w: 928,
    h: 1152,
  },
  {
    name: "android-sms-verifier",
    title: "Sign-in codes without the typing",
    description:
      "Fills the security code from a text message automatically, so signing in takes one tap instead of five.",
    lang: "Java",
    tags: ["Android", "Ease of use"],
    link: "https://github.com/Fellow3-1/android-sms-verifier",
    image: "assets/work-sms.jpg",
    w: 1408,
    h: 768,
  },
  {
    name: "printf & simple_shell",
    title: "How computers really work",
    description:
      "Two from-scratch builds of the parts most programmers take for granted: the deep end, and the best teacher I have had.",
    lang: "C",
    tags: ["Fundamentals", "ALX"],
    link: "https://github.com/Fellow3-1/printf",
    image: "assets/work-foundations.jpg",
    w: 1376,
    h: 768,
  },
  {
    name: "llm-chat-app-template",
    title: "An assistant for your product",
    description:
      "A ready-made starting point for adding a chat assistant to a website or app, with replies that stream in as they are written.",
    lang: "JavaScript",
    tags: ["AI", "Chat"],
    link: "https://github.com/Fellow3-1/llm-chat-app-template",
    image: "assets/work-ai.jpg",
    w: 928,
    h: 1152,
  },
  {
    name: "VR_Navigation",
    title: "Wayfinding inside virtual reality",
    description:
      "An experiment in finding your way around a space in VR, using light and depth instead of arrows.",
    lang: "CSS",
    tags: ["VR", "Experiment"],
    link: "https://github.com/Fellow3-1/VR_Navigation",
    image: "assets/work-vr.jpg",
    w: 1376,
    h: 768,
  },
];

// twelve years, six rows; years are right-aligned with tabular figures.
export const story = [
  {
    title: "Taking phones apart",
    org: "Self-taught",
    body: "Android software rebuilt from the inside out",
    years: "2014",
  },
  {
    title: "Android, done properly",
    org: "Google × Andela",
    body: "Backed training; first real apps shipped",
    years: "2018–19",
  },
  {
    title: "Built for the UN goals",
    org: "BuildForSDG",
    body: "A COVID-19 forecasting tool, on a pan-African team",
    years: "2020",
  },
  {
    title: "Mobile money for everyone",
    org: "Open source",
    body: "The M-PESA helper other teams still fork",
    years: "2020–21",
  },
  {
    title: "The deep end",
    org: "ALX Africa",
    body: "Formal engineering training, twenty hands-on projects",
    years: "2023–24",
  },
  {
    title: "Fast sites with AI inside",
    org: "Freelance",
    body: "Websites, apps and assistants, launched",
    years: "2024–now",
  },
];

// One-size name columns: name + one honest sentence that names real tools.
export const services = [
  {
    name: "Websites & web apps",
    body: "Landing pages to customer portals in React, Next.js or Astro, quick on any connection.",
  },
  {
    name: "Mobile apps",
    body: "Android and cross-platform apps, taken from a rough idea to a store listing.",
  },
  {
    name: "Payments & M-PESA",
    body: "Mobile-money checkout wired into your product, with the library 34 teams already reuse.",
  },
  {
    name: "AI features",
    body: "Assistants and smart search with OpenAI and LangChain. Useful and dependable, never a gimmick.",
  },
  {
    name: "Hosting that stays up",
    body: "AWS, Docker and automated deploys that keep the lights on while you sleep.",
  },
  {
    name: "Advice & code review",
    body: "A second opinion on your plan, your code or your team, before you spend the budget.",
  },
];

// The figures-inside-a-sentence statement. Figures roll up once on entry.
export const statsSentence = {
  before: "Since",
  parts: [
    { figure: "2014", text: "I’ve shipped" },
    { figure: "90", text: "public projects, and the M-PESA helper I wrote in Go is now forked by" },
    { figure: "34", text: "teams." },
  ],
};

// The live thing: an M-PESA-style confirmation the visitor actually sends.
export const receiptNeeds = ["A website", "A mobile app", "Payments / M-PESA", "An AI feature"];

export const socials = [
  { label: "GitHub", value: "github.com/Fellow3-1", href: "https://github.com/Fellow3-1" },
  { label: "X / Twitter", value: "@Fellow3_1", href: "https://twitter.com/Fellow3_1" },
  { label: "CV", value: "Plain text, one page", href: "assets/cv-felix-odhiambo.txt" },
  { label: "Community", value: "@BuildForSDG", href: "https://github.com/BuildForSDG" },
];

export const credits = ["Set in Inter", "Imagery made for this site"];
