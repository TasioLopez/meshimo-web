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
      "A branded website system built for speed, consistency, and easier publishing without design drift.",
    span: "wide",
  },
  {
    slug: "ops-portal",
    title: "Operations portal replacing three spreadsheets",
    category: "Custom platform",
    types: ["Internal tool", "Roles", "Audit trail"],
    outcome:
      "A cleaner internal workflow with one source of truth, fewer manual handoffs, and better visibility across the process.",
    span: "tall",
  },
  {
    slug: "ai-triage",
    title: "AI-assisted intake and routing",
    category: "Intelligent workflow",
    types: ["AI workflow", "Automation", "Integrations"],
    outcome:
      "Smarter intake flows that reduce triage time, route work faster, and keep human review where it matters.",
    span: "normal",
  },
  {
    slug: "integration-fabric",
    title: "CRM, billing, and data warehouse sync",
    category: "Infrastructure",
    types: ["APIs", "Data", "Monitoring"],
    outcome:
      "Cross-system data flows built to stay consistent, with monitoring in place when something breaks.",
    span: "normal",
  },
  {
    slug: "aeo-technical",
    title: "Technical SEO & AEO hardening",
    category: "Technical growth",
    types: ["AEO", "Structured data", "CWV"],
    outcome:
      "A stronger technical foundation for crawlability, answer engines, and site performance without unnecessary content clutter.",
    span: "normal",
  },
];
