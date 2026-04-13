export type CapabilityCluster = {
  id: string;
  title: string;
  overview: string;
  items: string[];
};

export const capabilityClusters: CapabilityCluster[] = [
  {
    id: "digital-experiences",
    title: "Digital experiences & frontend builds",
    overview:
      "Websites, landing pages, and product interfaces built to feel sharp, load fast, and stay easy to maintain.",
    items: [
      "Marketing and product websites, including CMS-backed builds.",
      "Landing pages and campaign surfaces with rigorous frontend discipline.",
      "UX- and UI-heavy implementations with component systems and content models.",
      "Branded digital interfaces that behave like products, not templates.",
      "Conversion-focused execution: structure, performance, and clarity under test.",
    ],
  },
  {
    id: "ai-workflows",
    title: "AI workflows & intelligent automation",
    overview:
      "Practical AI and automation that reduce manual work, speed up repetitive decisions, and fit cleanly into your operations.",
    items: [
      "AI-assisted workflows for research, drafting, triage, and routing.",
      "Task automation across tools with explicit failure handling and auditability.",
      "Internal copilots grounded in your data and processes, not generic chat windows.",
      "Process simplification: fewer handoffs, clearer ownership, measurable time saved.",
      "Guardrails: permissions, evaluation hooks, and rollback paths for production use.",
    ],
  },
  {
    id: "custom-tools",
    title: "Custom tools, platforms & software",
    overview:
      "Internal tools, portals, dashboards, and custom software shaped around how your team actually works.",
    items: [
      "Internal tools that replace spreadsheets and ad-hoc scripts.",
      "Client-facing portals with authentication, roles, and audit trails.",
      "Dashboards that connect to live data and reflect operational truth.",
      "Business software tailored to workflows instead of the other way around.",
      "Full custom builds when off-the-shelf products force the wrong shape.",
    ],
  },
  {
    id: "integrations-data",
    title: "Integrations, data & technical infrastructure",
    overview:
      "Reliable connections between systems, with clean data flows and backend logic that can handle growth without becoming fragile.",
    items: [
      "API integrations, webhooks, and event-driven orchestration.",
      "Data pipelines and transformations with monitoring and error surfaces.",
      "Backend logic for business rules, entitlements, and cross-system consistency.",
      "Operational architecture: environments, secrets, deployment paths.",
      "Technical system design that anticipates change and ownership.",
    ],
  },
  {
    id: "technical-growth",
    title: "Technical growth infrastructure",
    overview:
      "The technical work behind discoverability, performance, structured data, and answer-engine readiness, implemented properly from the start.",
    items: [
      "Technical SEO: structure, internal linking, and indexation hygiene.",
      "AEO-oriented markup and content patterns machines can cite reliably.",
      "Performance optimization: budgets, profiling, and regression control.",
      "Analytics and event instrumentation with privacy-aware defaults.",
      "Technical audits covering codebase, stack, and operational risk, with actionable outputs.",
    ],
  },
];
