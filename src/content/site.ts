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
    "Meshimo is the development and systems partner: the team that turns demanding product and operations work into shipped software and digital infrastructure you can run.",
  columns: [
    {
      title: "Execution, not abstraction",
      body: "When deliverables are code, integrations, data flows, or AI-enabled processes, Meshimo owns the build from discovery through launch and iteration.",
    },
    {
      title: "Surface and substrate",
      body: "The same practice designs and ships polished frontends and the backends, automations, and internal platforms that make day-to-day work faster and less fragile.",
    },
    {
      title: "Long-term fit",
      body: "Engagements are structured for clarity and ownership: architecture you can extend, handover you can trust, and a build that keeps working after launch.",
    },
  ],
};

export const technicalDepth = {
  title: "Depth beyond deliverables",
  thesis:
    "Strong technical work shows up in maintainability, clarity, and how well it serves the business, not in novelty for its own sake.",
  points: [
    {
      title: "Systems thinking",
      text: "Interfaces are designed with the workflows, roles, and data they connect to so the product holds up under real use.",
    },
    {
      title: "Applied AI",
      text: "Models and agents land where they remove repetition, speed decisions, or orchestrate steps, not as decoration.",
    },
    {
      title: "Scale of engagement",
      text: "The same engagement model can move from a focused workflow to a multi-surface platform when the problem requires it.",
    },
    {
      title: "Pragmatic stacks",
      text: "Technology choices favor operability: observability, versioning, and handover a serious organization can live with.",
    },
    {
      title: "Design and operations",
      text: "Creative frontend execution stays tied to operational reality: permissions, edge cases, and how teams actually work.",
    },
    {
      title: "Measured performance",
      text: "Technical SEO, structured content for answer engines, and performance budgets are implemented as engineering, not afterthoughts.",
    },
  ],
};

export const outcomes = {
  title: "What clients get",
  subtitle:
    "Clear ownership, shipped software, and systems you can extend with every release.",
  items: [
    "Faster delivery of complex UI and system work with fewer handoffs.",
    "Fewer manual steps through automation and well-scoped AI assistance.",
    "Tools that connect: CRMs, data stores, dashboards, and customer-facing surfaces aligned.",
    "Technical foundations that support change: APIs, logging, and structure built for the next release.",
    "Pages and experiences that load quickly, read clearly to people and machines, and hold up in production.",
    "Teams that spend less time fighting tools and more time on the work that matters.",
  ],
};

export const finalCta = {
  title: "When the work is technical, Meshimo builds it.",
  body: "Engagements are scoped for ownership and clarity. If your roadmap includes custom software, serious integrations, or AI-enabled operations, this is a fit.",
  fit: [
    "You want premium digital surfaces and the systems behind them in one coherent build.",
    "You are ready to collaborate on architecture, tradeoffs, and delivery milestones.",
    "You value maintainable execution over one-off campaigns or generic templates.",
  ],
  formNote:
    "This form opens your email client with a prefilled message. Replace with an API route when ready.",
};
