/* ------------------------------------------------------------------
   ISMAIL HOSSAIN — portfolio content
   ------------------------------------------------------------------
   ADDING A PROJECT: one object below. The grid, previews and links all
   read from here.

   no / title / tagline / summary / stack / highlight
   url       GitHub repo
   live      deployed URL — also makes the card read "Live"
   preview   { embed } live iframe in the plate (host must allow framing)
             { image } screenshot or high-res preview URL
             { video } mp4/webm played on hover
   span      bento span of the 12-column grid, e.g. "md:col-span-7"
   ------------------------------------------------------------------ */

export type Project = {
  no: string;
  title: string;
  tagline: string;
  summary: string;
  stack: string[];
  highlight: string;
  url: string;
  live?: string;
  span: string;
  /** Visual preview — optional, see ProjectPreview. */
  preview?: {
    image?: string; // screenshot or high-res preview URL
    embed?: string; // live iframe — only where that host allows framing
    video?: string; // mp4/webm, played on hover
    alt?: string;
  };
};

export const projects: Project[] = [
  {
    no: "01",
    title: "AERIS One",
    tagline: "Hear everything. Feel nothing else.",
    summary:
      "AERIS One — flagship wireless headphones at $349: Adaptive ANC II, 40-hour battery, spatial audio, 218 grams. The product site is a dark, atmospheric React 19 build on Vite and Tailwind v4, smooth-scrolled on Lenis. Repository: Arise.",
    stack: ["React 19", "Vite", "Tailwind v4", "Lenis", "TypeScript"],
    highlight:
      "A storefront that behaves like the hardware: the entire spec — Adaptive ANC II · 40 h · spatial audio — resolved in a single line, a hand-built custom cursor and glow states over Lenis-smooth scrolling, with showroom, specs, story and support on one rail and a one-click $349 checkout.",
    url: "https://github.com/mdismailhossain9222-spec/Arise",
    live: "https://arise-eight-khaki.vercel.app/",
    preview: { image: "/images/aeris-one.png" },
    span: "md:col-span-7",
  },
  {
    no: "02",
    title: "Lia",
    tagline: "The newest of the set.",
    summary:
      "A TypeScript web application and the most actively worked project of the five — a 62 MB repository, deployed live on Vercel and last pushed on 23 September 2026.",
    stack: ["TypeScript", "Vercel"],
    highlight:
      "The one still moving: updated a full day after the rest of the set was finished, and carrying the largest asset payload outside Prism.",
    url: "https://github.com/mdismailhossain9222-spec/Lia",
    live: "https://lia-alpha-seven.vercel.app/",
    preview: { image: "/images/lia.png" },
    span: "md:col-span-5",
  },
  {
    no: "03",
    title: "Flowline",
    tagline: "Strict where it counts.",
    summary:
      "A production-ready TypeScript web application with the most pragmatic mix of the set: 84% TypeScript, 14% JavaScript — now deployed and live on Vercel.",
    stack: ["TypeScript", "JavaScript", "CSS", "Vercel"],
    highlight:
      "128,932 bytes — the smallest of the siblings, with the highest JavaScript ratio in the set.",
    url: "https://github.com/mdismailhossain9222-spec/Flowline",
    live: "https://flowline-indol.vercel.app/",
    preview: { image: "/images/flowline.png" },
    span: "md:col-span-7",
  },
  {
    no: "04",
    title: "Arkhe",
    tagline: "Built in one sitting.",
    summary:
      "A production-ready TypeScript web application — 175,666 bytes of source, 88% TypeScript, pushed to main on 22 September 2026 and deployed live on Vercel.",
    stack: ["TypeScript", "JavaScript", "CSS", "Vercel"],
    highlight:
      "Created 19:34:14 and pushed at 19:36:59 — a complete typed project in under three minutes of commit time.",
    url: "https://github.com/mdismailhossain9222-spec/Arkhe",
    live: "https://arkhe-chi.vercel.app/",
    preview: { image: "/images/arkhe.png" },
    span: "md:col-span-5",
  },
  {
    no: "05",
    title: "Prism",
    tagline: "The heavyweight.",
    summary:
      "A production-ready TypeScript web project — by a distance the largest repository in the set at 66 MB — now deployed and live on Vercel.",
    stack: ["TypeScript", "JavaScript", "CSS", "Vercel"],
    highlight:
      "66 MB — roughly forty times the size of its siblings, and still 91% TypeScript by source weight.",
    url: "https://github.com/mdismailhossain9222-spec/Prism",
    live: "https://prism-blush-two.vercel.app/",
    preview: { image: "/images/prism.png" },
    span: "md:col-span-12",
  },
];

export const statement: { words: string[] } = {
  words: [
    "I",
    "build",
    "the",
    "whole",
    "path",
    "—",
    "from",
    "the",
    "data",
    "model",
    "to",
    "the",
    "API,",
    "the",
    "interface,",
    "and",
    "the",
    "deploy",
    "that",
    "carries",
    "it.",
    "Six",
    "years",
    "of",
    "shipping",
    "products",
    "end",
    "to",
    "end:",
    "measured,",
    "versioned,",
    "and",
    "impossible",
    "to",
    "fake",
    "under",
    "load.",
  ],
};

export const specs: [string, string][] = [
  ["Focus", "Full-stack product engineering"],
  ["Core stack", "TypeScript · Go · PostgreSQL · React · AWS"],
  ["Tooling", "Docker, GitHub Actions, Terraform, Grafana"],
  ["Experience", "6 years — agency, startup, independent"],
  ["Availability", "Contract & project work, from March 2026"],
  ["Timezone", "UTC+1 — overlaps US East and APAC"],
];

export const process: { no: string; title: string; body: string }[] = [
  {
    no: "01",
    title: "Scope",
    body: "Two days, one page, no slides. What ships, what does not, and what it costs to change later.",
  },
  {
    no: "02",
    title: "Model",
    body: "Schema and contracts before a single component. The database is the design.",
  },
  {
    no: "03",
    title: "Build",
    body: "Vertical slices, merged daily, on staging by Thursday — never a big-bang integration.",
  },
  {
    no: "04",
    title: "Harden",
    body: "Tests, types, rate limits, retries, and alerts that mean something at three in the morning.",
  },
  {
    no: "05",
    title: "Ship",
    body: "Blue-green deploys behind one flag, with a rollback you have actually rehearsed.",
  },
  {
    no: "06",
    title: "Own",
    body: "Thirty days watching the graphs after launch, at no extra charge. Then I hand you the keys.",
  },
];

export const caseStats: [string, string][] = [
  ["Uptime", "99.98"],
  ["p99 latency", "84 ms"],
  ["Endpoints", "062"],
  ["Services", "014"],
  ["Months", "11"],
];