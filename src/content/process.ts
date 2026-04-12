export type ProcessDetailGroup = {
  title: string;
  items: string[];
};

export type ProcessStage = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  meshimoAngle: string;
  /** Optional grouped deep-dive shown in collapsible blocks */
  details?: ProcessDetailGroup[];
};

export const processStages: ProcessStage[] = [
  {
    id: "discovery",
    title: "Discovery and technical opportunity mapping",
    summary:
      "Clarify outcomes, constraints, and the real surface area of the problem before choosing tools.",
    bullets: [
      "Stakeholder interviews focused on workflows, failure modes, and ownership.",
      "Inventory of systems, data sources, and integration points.",
      "Risk scan: compliance, latency, operational maturity, and support expectations.",
      "Definition of success metrics that engineering can test against.",
    ],
    meshimoAngle:
      "Frontend and systems are scoped together so UX promises match operational reality.",
    details: [
      {
        title: "Outputs you can hold the team to",
        items: [
          "Problem statement and in-scope / out-of-scope boundaries.",
          "System inventory with owners and change windows.",
          "Success metrics with measurement hooks (events, queries, or reviews).",
        ],
      },
      {
        title: "Where Meshimo looks first",
        items: [
          "Data residency, PII, and retention constraints.",
          "Latency-sensitive paths and offline or degraded modes.",
          "Who maintains the system after launch.",
        ],
      },
    ],
  },
  {
    id: "scoping",
    title: "System scoping and solution design",
    summary:
      "Translate goals into an architecture that can ship in phases without painting you into a corner.",
    bullets: [
      "Bounded contexts: what belongs in v1 versus later, with explicit tradeoffs.",
      "Data model sketch and API contracts between services and interfaces.",
      "Automation and AI boundaries: human-in-the-loop versus autonomous steps.",
      "Delivery milestones aligned to business checkpoints.",
    ],
    meshimoAngle:
      "Design decisions are documented for the team that will run the system next quarter.",
    details: [
      {
        title: "Architecture artifacts",
        items: [
          "Context diagram: actors, systems, and trust boundaries.",
          "Contract sketch for APIs and events between surfaces.",
          "Phasing plan with explicit cut lines between releases.",
        ],
      },
    ],
  },
  {
    id: "ux-flow",
    title: "UX, interface, and flow planning",
    summary:
      "Shape journeys, states, and component behavior before pixels compete with logic.",
    bullets: [
      "Critical user paths with empty, loading, and error states.",
      "Information architecture across marketing and application surfaces.",
      "Component inventory tied to content and permissions.",
      "Accessibility and keyboard flows as part of the baseline.",
    ],
    meshimoAngle:
      "Marketing-grade presentation and application-grade behavior share one coherent system.",
    details: [
      {
        title: "UX deliverables",
        items: [
          "Flows for primary jobs-to-be-done with edge cases named.",
          "Component states and content requirements per surface.",
          "Handoff-ready structure for implementation and testing.",
        ],
      },
    ],
  },
  {
    id: "build",
    title: "Build, integration, and logic",
    summary:
      "Implement features with reviewable increments, integration tests, and operational hooks.",
    bullets: [
      "Feature slices that can demo end-to-end early and often.",
      "Integration work with sandboxed credentials and replayable fixtures.",
      "Background jobs, queues, and retries where reliability matters.",
      "Observability: logs, traces, and alerts appropriate to the risk level.",
    ],
    meshimoAngle:
      "The same rigor applies to public pages and internal tools: production is the standard.",
    details: [
      {
        title: "Engineering practice",
        items: [
          "Incremental releases behind flags when risk warrants it.",
          "Automated checks on critical paths before merge.",
          "Runbooks for integrations that fail in production.",
        ],
      },
    ],
  },
  {
    id: "ai-enablement",
    title: "AI enablement, automation, and optimization",
    summary:
      "Introduce models and automation where they reduce cost or latency, with evaluation and governance.",
    bullets: [
      "Prompt and tool contracts versioned alongside application code.",
      "Evaluation sets for quality regression on changes.",
      "Human review queues where stakes require it.",
      "Cost and latency monitoring for inference-heavy paths.",
    ],
    meshimoAngle:
      "AI is treated as infrastructure: measurable, reversible, and owned.",
    details: [
      {
        title: "Governance",
        items: [
          "Explicit allowlists for tools and data sources.",
          "Rollback path for model or prompt changes.",
          "Logging that supports audit without exposing sensitive payloads.",
        ],
      },
    ],
  },
  {
    id: "launch",
    title: "Launch, support, and iteration",
    summary:
      "Ship with runbooks, ownership, and a plan for the first weeks of real traffic.",
    bullets: [
      "Launch checklist: DNS, caching, backups, and rollback.",
      "Handover materials for internal operators.",
      "Post-launch review with prioritized improvements.",
      "Roadmap for hardening, scale, and new surfaces.",
    ],
    meshimoAngle:
      "Delivery ends with something your organization can operate, not a black box.",
    details: [
      {
        title: "Handover",
        items: [
          "Owner map for incidents, changes, and data issues.",
          "Documentation aligned to how your team actually works.",
          "Iteration backlog grounded in usage and error signals.",
        ],
      },
    ],
  },
];
