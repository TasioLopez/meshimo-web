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
      "High-craft interfaces and marketing surfaces engineered for conversion, brand fidelity, and long-term maintainability.",
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
      "Practical AI and automation that remove repetition, accelerate decisions, and keep humans in control where it matters.",
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
      "Bespoke software for operators: portals, dashboards, and line-of-business systems sized to how you actually work.",
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
      "Reliable connections between platforms, clear data movement, and backend logic that holds up as volume grows.",
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
      "The implementation layer for discoverability, answer engines, and speed, with acceptance criteria like any other engineering work.",
    items: [
      "Technical SEO: structure, internal linking, and indexation hygiene.",
      "AEO-oriented markup and content patterns machines can cite reliably.",
      "Performance optimization: budgets, profiling, and regression control.",
      "Analytics and event instrumentation with privacy-aware defaults.",
      "Technical audits covering codebase, stack, and operational risk, with actionable outputs.",
    ],
  },
];
