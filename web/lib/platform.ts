/**
 * Content for the platform side of the site — writing, tutorials, labs.
 * Nothing here is published yet; each list is the plan, and the pages render
 * an honest empty/planned state until real entries replace it. When MDX
 * lands in /content, these arrays are the seam that gets repointed.
 */

export type PlatformStatus = "Planned" | "In progress" | "Live";

export interface WritingCategory {
  label: string;
  description: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

export const writingCategories: WritingCategory[] = [
  {
    label: "Data Engineering",
    description:
      "Event-driven pipelines, reverse ETL, and the data-modeling decisions behind projects like the Freshdesk pipeline and the HubSpot integration.",
  },
  {
    label: "Cloud & Infrastructure",
    description:
      "Notes on running data and AI workloads on AWS and GCP — Lambda, SQS, S3, BigQuery, Cloud Run — and the cost/architecture trade-offs behind them.",
  },
  {
    label: "Agentic AI",
    description:
      "LangGraph and LangChain in practice: tool calling, stateful multi-agent design, RAG, and prompt engineering, grounded in projects like Pricing Genie.",
  },
  {
    label: "Computer Vision",
    description:
      "Segmentation, fine-tuning, and hyperparameter search — YOLO, LoRA, and Optuna — as used in the VehiDE damage-assessment pipeline.",
  },
];

/** Published posts, newest first. Empty until the first one ships. */
export const posts: Post[] = [];

export interface Tutorial {
  title: string;
  description: string;
  topics: string[];
  status: PlatformStatus;
  /** Video embed URL once recorded. */
  videoUrl?: string;
}

export const tutorials: Tutorial[] = [
  {
    title: "Building a webhook-to-warehouse pipeline",
    description:
      "Lambda, SQS, and idempotent enrichment — the shape behind the Freshdesk pipeline.",
    topics: ["AWS Lambda", "SQS", "MySQL"],
    status: "Planned",
  },
  {
    title: "A LangGraph agent from scratch",
    description:
      "Tool calling, multi-step reasoning, and an explainable output — the shape behind Pricing Genie.",
    topics: ["LangGraph", "Tool calling"],
    status: "Planned",
  },
  {
    title: "Fine-tuning a segmentation model with LoRA",
    description: "YOLO segmentation, LoRA adapters, and Optuna sweeps — the shape behind VehiDE.",
    topics: ["YOLO", "LoRA", "Optuna"],
    status: "Planned",
  },
];

export interface LabEntry {
  version: string;
  feature: string;
  detail: string;
  status: PlatformStatus;
}

export const labsManifest: LabEntry[] = [
  {
    version: "V4",
    feature: "AI Labs backend",
    detail: "FastAPI service + a standalone agents/ package, no web-framework imports inside it.",
    status: "Planned",
  },
  {
    version: "V5",
    feature: "RAG over this site",
    detail: "Retrieval-augmented generation indexed against the site's own MDX content.",
    status: "Planned",
  },
  {
    version: "V6",
    feature: "Multi-agent workflows",
    detail: "Interactive, stateful multi-agent demos built on the same agents package.",
    status: "Planned",
  },
  {
    version: "V7",
    feature: "Auth / admin",
    detail: "Authenticated surface for managing labs and content.",
    status: "Planned",
  },
];

export interface PlatformSection {
  href: string;
  label: string;
  title: string;
  description: string;
  icon: "pen" | "play" | "flask";
  status: PlatformStatus;
}

/** The three platform surfaces, as summarized on the homepage. */
export const platformSections: PlatformSection[] = [
  {
    href: "/blog",
    label: "Writing",
    title: "Technical writing",
    description:
      "Long-form notes on pipelines, cloud trade-offs, and agentic systems — written up from real project work.",
    icon: "pen",
    status: "Planned",
  },
  {
    href: "/tutorials",
    label: "Tutorials",
    title: "Video walkthroughs",
    description:
      "Step-by-step builds of the architectures behind the projects: webhook pipelines, LangGraph agents, LoRA fine-tuning.",
    icon: "play",
    status: "Planned",
  },
  {
    href: "/labs",
    label: "Labs",
    title: "AI experiments",
    description:
      "Interactive agents and RAG over this site's own content, served beside the static site as API calls.",
    icon: "flask",
    status: "Planned",
  },
];
