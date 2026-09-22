export const person = {
  name: "Anuj Gautam",
  role: "Data Engineer II",
  direction: "Data Engineering → AI/Data Engineering → Agentic AI",
} as const;

export interface CapabilityGroup {
  label: string;
  items: string[];
}

/** Verbatim from source material — no employers, dates, or invented specifics. */
export const capabilityGroups: CapabilityGroup[] = [
  {
    label: "Data",
    items: [
      "Python",
      "SQL",
      "Spark",
      "Pandas",
      "NumPy",
      "ETL",
      "Event-driven pipelines",
      "Data modeling",
      "Reverse ETL",
    ],
  },
  {
    label: "Cloud",
    items: [
      "AWS Lambda",
      "AWS SQS",
      "AWS S3",
      "GCP BigQuery",
      "GCP Cloud Run",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    label: "AI / LLM",
    items: [
      "LangGraph",
      "LangChain",
      "RAG",
      "Prompt engineering",
      "Tool integration",
      "Stateful agents",
      "Multi-agent systems",
    ],
  },
  {
    label: "ML",
    items: ["PyTorch", "Computer Vision", "YOLO", "LoRA", "Optuna", "Segmentation"],
  },
];

export interface NavLink {
  href: string;
  label: string;
}

export const primaryNav: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/labs", label: "Labs" },
  { href: "/contact", label: "Contact" },
];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anujgautam.dev";
