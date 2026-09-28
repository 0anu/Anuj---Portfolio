export type ProjectDomain =
  "Data Engineering" | "Agentic AI" | "Computer Vision · Agentic AI" | "Data Integration";

export type ProjectStatus = "Case study in progress" | "Shipped" | "Experiment";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "github" | "demo" | "article";
}

export interface Project {
  slug: string;
  title: string;
  domain: ProjectDomain;
  /** One sentence: what was broken or missing before this existed. */
  problem: string;
  summary: string;
  stack: string[];
  /** Ordered pipeline/architecture steps, rendered as a DOM diagram. */
  architecture: string[];
  /** Multiple flows for projects with more than one direction (e.g. bidirectional sync). */
  architectureFlows?: { label: string; steps: string[] }[];
  /** Engineering considerations implied by the architecture — not outcomes or metrics. */
  concerns: string[];
  status: ProjectStatus;
  /** Repo/demo/write-up links. Empty until they're public. */
  links: ProjectLink[];
  featured?: boolean;
}

/**
 * Source of truth for project data. This is the seam the future MDX content
 * loader replaces — pages only ever call the getters below.
 */
const projects: Project[] = [
  {
    slug: "freshdesk-realtime-data-pipeline",
    title: "Freshdesk Real-Time Data Pipeline",
    domain: "Data Engineering",
    problem:
      "Support-ticket activity lived inside Freshdesk, out of reach of the warehouse and the reporting built on it.",
    summary:
      "An event-driven ingestion pipeline that captures Freshdesk ticket activity via webhook, enriches it against the Freshdesk API, and lands it in a MySQL warehouse for reporting.",
    stack: ["Python", "AWS Lambda", "SQS", "MySQL", "REST APIs"],
    architecture: [
      "Freshdesk",
      "Webhook",
      "API endpoint (Lambda)",
      "SQS",
      "Lambda worker",
      "Freshdesk API enrichment",
      "Transformation",
      "MySQL warehouse",
      "BI / reporting",
    ],
    concerns: [
      "Webhook delivery is at-least-once, so the worker step has to be idempotent against replayed events.",
      "SQS decouples ingestion from enrichment, so a slow Freshdesk API doesn't back-pressure the webhook endpoint.",
      "Enrichment calls the Freshdesk API a second time per event — rate limits shape how the worker batches and retries.",
    ],
    status: "Case study in progress",
    links: [],
    featured: true,
  },
  {
    slug: "pricing-genie",
    title: "Pricing Genie",
    domain: "Agentic AI",
    problem:
      "Pricing decisions need competitor research that is slow to gather by hand and hard to trace back to its sources.",
    summary:
      "A LangGraph agent that researches competitor pricing, reasons over the findings across multiple steps, and produces an explainable pricing recommendation.",
    stack: ["LangGraph", "LLMs", "Tavily", "Python"],
    architecture: [
      "Query",
      "Competitor research",
      "Tool calling",
      "Pricing analysis",
      "Multi-step reasoning",
      "Explainable recommendation",
    ],
    concerns: [
      "Tool-calling brings external research latency into the reasoning loop, so the graph has to tolerate slow or failed tool calls.",
      "A recommendation is only as trustworthy as its trace — each reasoning step needs to stay attributable back to a source.",
      "Competitor data is unstructured and inconsistent, so the research step has to normalize before analysis runs on it.",
    ],
    status: "Case study in progress",
    links: [],
    featured: true,
  },
  {
    slug: "vehide",
    title: "VehiDE",
    domain: "Computer Vision · Agentic AI",
    problem:
      "Assessing vehicle damage from a photo means localizing it, judging severity, checking policy, and writing it up — four separate jobs.",
    summary:
      "A multi-agent vehicle damage assessment system: a segmentation model localizes damage, and a chain of agents scores severity, checks policy, and drafts the report.",
    stack: ["YOLO11m-seg", "PyTorch", "LoRA", "Optuna"],
    architecture: [
      "Vehicle image",
      "Damage Agent",
      "Severity Agent",
      "Policy Agent",
      "Report Agent",
    ],
    concerns: [
      "Severity, policy, and report agents each depend on the upstream agent's output, so an error in damage segmentation propagates through the whole chain.",
      "LoRA fine-tuning and Optuna sweeps target the segmentation step specifically — the agents downstream are only as reliable as that mask.",
      "A report drafted by an agent chain still needs a clear boundary around what's model output versus what's been reviewed.",
    ],
    status: "Case study in progress",
    links: [],
    featured: true,
  },
  {
    slug: "hubspot-crm-data-integration",
    title: "HubSpot CRM Data Integration",
    domain: "Data Integration",
    problem:
      "CRM and internal systems drifted apart: warehouse data never reached HubSpot, and HubSpot activity never reached analytics.",
    summary:
      "Two reverse-ETL flows keeping HubSpot and internal systems in sync: warehouse data flows out to HubSpot, and HubSpot activity flows back into analytical systems.",
    stack: ["Python", "REST APIs", "ETL", "Reverse ETL"],
    architecture: ["Database", "Transform", "HubSpot"],
    architectureFlows: [
      { label: "Outbound sync", steps: ["Database", "Transform", "HubSpot"] },
      { label: "Inbound sync", steps: ["HubSpot", "Transform", "Analytical systems"] },
    ],
    concerns: [
      "Two independent flows writing toward the same records raises the question of which system owns a given field.",
      "Reverse ETL back into HubSpot has to respect its API rate limits and object model, not just push a warehouse table at it.",
      "Inbound sync from HubSpot needs the same transformation discipline as any other ETL source — CRM data is entered by humans.",
    ],
    status: "Case study in progress",
    links: [],
    featured: true,
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** A domain like "Computer Vision · Agentic AI" belongs to both categories. */
export function getProjectCategories(project: Project): string[] {
  return project.domain.split(" · ");
}

export function getAllCategories(): string[] {
  return [...new Set(projects.flatMap(getProjectCategories))];
}

/**
 * Per-category hue for the project's decorative accent (glows, category
 * label). Consumed as `--tone-h` by the .tone utility in globals.css.
 */
const categoryHues: Record<string, number> = {
  "Data Engineering": 195,
  "Data Integration": 165,
  "Agentic AI": 290,
  "Computer Vision": 75,
};

export function getProjectHue(project: Project): number {
  return categoryHues[getProjectCategories(project)[0]!] ?? 195;
}
