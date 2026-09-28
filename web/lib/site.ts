export const person = {
  name: "Anuj Gautam",
  initials: "AG",
  role: "Data Engineer II",
  direction: "Data Engineering → AI/Data Engineering → Agentic AI",
  tagline: "Data pipelines that hold up. Agents that reason through them.",
  summary:
    "Data engineer building event-driven pipelines, reverse ETL, and cloud data systems — and moving that craft toward agentic AI.",
} as const;

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin";
}

/**
 * Profile links. An entry with an empty href is left out everywhere it would
 * render, so a missing profile never becomes a dead link — fill in the
 * LinkedIn URL here to switch its CTAs on.
 */
const allSocialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/0anu", icon: "github" },
  { label: "LinkedIn", href: "", icon: "linkedin" },
];

export const socialLinks = allSocialLinks.filter((link) => link.href !== "");

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

export type FocusIcon = "pipeline" | "cloud" | "sparkles" | "agent" | "server" | "eye";

export interface FocusArea {
  title: string;
  description: string;
  icon: FocusIcon;
  tools: string[];
  /** OKLCH hue for the card's icon tile and hover border. */
  hue: number;
}

/** Areas of expertise, grounded in the capability groups and project work above. */
export const focusAreas: FocusArea[] = [
  {
    title: "Data Engineering",
    description:
      "Event-driven ingestion, ETL and reverse ETL, and data models built for the systems downstream of them.",
    icon: "pipeline",
    hue: 200,
    tools: ["Python", "SQL", "Spark", "Pandas"],
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Serverless and managed services on AWS and GCP — queues to decouple, functions to scale, warehouses to land in.",
    icon: "cloud",
    hue: 240,
    tools: ["Lambda", "SQS", "S3", "BigQuery", "Cloud Run"],
  },
  {
    title: "Agentic AI",
    description:
      "Stateful LangGraph agents with tool calling and multi-step reasoning that stays attributable to its sources.",
    icon: "agent",
    hue: 292,
    tools: ["LangGraph", "Tool calling", "Multi-agent"],
  },
  {
    title: "LLM Applications",
    description:
      "Retrieval, prompt engineering, and tool integration layered on top of the data that already exists.",
    icon: "sparkles",
    hue: 330,
    tools: ["LangChain", "RAG", "Prompting"],
  },
  {
    title: "Backend & Integration",
    description:
      "REST integrations and sync services between SaaS platforms and internal systems, idempotent by design.",
    icon: "server",
    hue: 160,
    tools: ["REST APIs", "MySQL", "PostgreSQL"],
  },
  {
    title: "Computer Vision",
    description:
      "Segmentation models fine-tuned with LoRA and tuned with Optuna, feeding downstream agent chains.",
    icon: "eye",
    hue: 70,
    tools: ["PyTorch", "YOLO", "LoRA", "Optuna"],
  },
];

export interface NavLink {
  href: string;
  label: string;
}

export const primaryNav: NavLink[] = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Writing" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/labs", label: "Labs" },
  { href: "/about", label: "About" },
];

export const contactLink: NavLink = { href: "/contact", label: "Contact" };

export const footerNav: { label: string; links: NavLink[] }[] = [
  {
    label: "Work",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/experience", label: "Experience" },
      { href: "/about", label: "About" },
    ],
  },
  {
    label: "Platform",
    links: [
      { href: "/blog", label: "Writing" },
      { href: "/tutorials", label: "Tutorials" },
      { href: "/labs", label: "Labs" },
    ],
  },
];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anujgautam.dev";
