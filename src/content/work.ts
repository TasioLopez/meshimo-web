export type WorkItem = {
  slug: string;
  title: string;
  category: string;
  types: string[];
  outcome: string;
  span: "wide" | "tall" | "normal";
};

export const workItems: WorkItem[] = [
  {
    slug: "brand-site-cms",
    title: "Brand system site with structured CMS",
    category: "Digital experience",
    types: ["Website", "CMS", "Performance"],
    outcome:
      "Editorial velocity without layout drift; component library enforced in production.",
    span: "wide",
  },
  {
    slug: "ops-portal",
    title: "Operations portal replacing three spreadsheets",
    category: "Custom platform",
    types: ["Internal tool", "Roles", "Audit trail"],
    outcome:
      "Single source of truth for approvals with traceability and fewer handoffs.",
    span: "tall",
  },
  {
    slug: "ai-triage",
    title: "AI-assisted intake and routing",
    category: "Intelligent workflow",
    types: ["AI workflow", "Automation", "Integrations"],
    outcome:
      "Faster triage with explicit escalation paths and measurable review rates.",
    span: "normal",
  },
  {
    slug: "integration-fabric",
    title: "CRM, billing, and data warehouse sync",
    category: "Infrastructure",
    types: ["APIs", "Data", "Monitoring"],
    outcome:
      "Reliable cross-system consistency with alerting on failure domains.",
    span: "normal",
  },
  {
    slug: "aeo-technical",
    title: "Technical SEO & AEO hardening",
    category: "Technical growth",
    types: ["AEO", "Structured data", "CWV"],
    outcome:
      "Cleaner information architecture for crawlers and answer engines without content bloat.",
    span: "normal",
  },
];
