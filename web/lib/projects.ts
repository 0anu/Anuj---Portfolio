export type ProjectDomain =
  "Data Engineering" | "Agentic AI" | "Computer Vision · Agentic AI" | "Data Integration";

export interface Project {
  slug: string;
  title: string;
  domain: ProjectDomain;
  summary: string;
  stack: string[];
  /** Ordered pipeline/architecture steps, rendered as a build-time SVG diagram. */
  architecture: string[];
  /** Multiple flows for projects with more than one direction (e.g. bidirectional sync). */
  architectureFlows?: { label: string; steps: string[] }[];
  /** Engineering considerations implied by the architecture — not outcomes or metrics. */
  concerns: string[];
}

/**
 * Source of truth for project data. This is the seam the future MDX content
 * loader replaces — pages only ever call getAllProjects()/getProjectBySlug().
 */
const projects: Project[] = [
  {
    slug: "freshdesk-realtime-data-pipeline",
    title: "Freshdesk Real-Time Data Pipeline",
    domain: "Data Engineering",
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
  },
  {
    slug: "pricing-genie",
    title: "Pricing Genie",
    domain: "Agentic AI",
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
  },
  {
    slug: "vehide",
    title: "VehiDE",
    domain: "Computer Vision · Agentic AI",
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
  },
  {
    slug: "hubspot-crm-data-integration",
    title: "HubSpot CRM Data Integration",
    domain: "Data Integration",
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
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
