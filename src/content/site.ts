/** Repeating strip between major sections (hero band). */
export const marqueeLine =
  "Websites · Product UI · Integrations · Automation · Applied AI · Performance · ";

export const siteMeta = {
  title: "Meshimo | Digital experiences and intelligent systems",
  description:
    "Meshimo designs and builds premium digital experiences, custom software, integrations, and AI-enabled workflows for teams that care about craft and reliability.",
};

export const hero = {
  eyebrow: "Technical and creative studio",
  headlineLine1: "DIGITAL EXPERIENCES",
  headlineLine2: "INTELLIGENT SYSTEMS",
  headlineLead: "&",
  subhead:
    "Meshimo ships the interface your customers see and the systems behind it: custom tools, workflows, applied AI, integrations, data, and performance work, delivered as one coherent build.",
  primaryCta: { label: "Discuss a build", href: "#contact" },
  secondaryCta: { label: "Our services", href: "#capabilities" },
};

/** Hero verb carousel — order matches `HeroSlideVisual` slide ids. */
export const heroRotatingSlides = [
  { id: "build", word: "BUILD" },
  { id: "integrate", word: "INTEGRATE" },
  { id: "ship", word: "SHIP" },
  { id: "connect", word: "CONNECT" },
  { id: "optimize", word: "OPTIMIZE" },
  { id: "automate", word: "AUTOMATE" },
] as const;

/** Horizontal shuttle duration (must be less than `heroRotateIntervalMs`). */
export const heroShuttleMs = 920;

/** Idle time after shuttle completes before next advance. */
export const heroRotateIntervalMs = 5600;

export const whatMeshimoIs = {
  title: "What Meshimo is",
  intro:
    "Meshimo is the technical partner behind the build. We design and ship the customer-facing experience, the internal systems behind it, and the logic that makes everything work together.",
  columns: [
    {
      title: "Built to be used",
      body: "We take projects from first scope to live delivery: websites, internal tools, automations, integrations, and AI-supported workflows that need to work in the real world, not just look good in a deck.",
    },
    {
      title: "Frontends with real systems behind them",
      body: "A good interface is only half the job. We build the workflows, integrations, and internal logic behind it too, so the experience holds up once people start using it.",
    },
    {
      title: "Made to last past launch",
      body: "The goal is not a one-off build. It is a clean foundation your team can keep using, extending, and operating with confidence.",
    },
  ],
};

export const technicalDepth = {
  title: "Why teams work with Meshimo",
  thesis:
    "The value is not just in shipping something that works today. It is in building something your business can actually rely on, improve, and grow with.",
  points: [
    {
      title: "Systems thinking",
      text: "We do not treat websites, tools, and workflows as isolated pieces. They are designed around the roles, data, and processes they need to support.",
    },
    {
      title: "Applied AI",
      text: "AI belongs where it saves time, improves routing, or supports decision-making, not where it simply makes a project sound more modern.",
    },
    {
      title: "Flexible scope, serious execution",
      text: "Some projects start with one workflow. Others become a broader platform. The delivery model is built to handle both without losing focus.",
    },
    {
      title: "Pragmatic stacks",
      text: "Technology decisions are made for reliability, maintainability, and speed to value, not to impress other developers.",
    },
    {
      title: "Design tied to operations",
      text: "We care about how things look, but also how permissions, edge cases, handoffs, and internal usage affect the build once it goes live.",
    },
    {
      title: "Measured performance",
      text: "Speed, structure, and discoverability are built in from the start, not left as cleanup work after launch.",
    },
  ],
};

export const outcomes = {
  title: "What clients get",
  subtitle:
    "Clean delivery, fewer workarounds, and systems that stay useful after the first release.",
  items: [
    "Faster delivery across design, development, and systems work without unnecessary handoffs.",
    "Less repetitive manual work through automation and carefully scoped AI support.",
    "Better alignment between websites, internal tools, data, and customer-facing workflows.",
    "Technical foundations that make future changes easier, not harder.",
    "Faster, clearer digital experiences that hold up in production.",
    "More time spent on the work that matters, and less time fighting the setup behind it.",
  ],
};

export const finalCta = {
  title: "When the work needs to be built properly, Meshimo is the partner.",
  body: "Meshimo is a fit for teams that need more than a nice interface: custom software, connected systems, serious integrations, operational automation, or AI applied in a way that is actually useful.",
  fit: [
    "You want the frontend and the system behind it handled as one build.",
    "You care about quality, maintainability, and technical decisions that will still make sense a year from now.",
    "You are looking for a partner that can think with you and execute at production level.",
  ],
  formNote:
    "This form opens your email client with a prefilled message. Replace with an API route when ready.",
};
