export interface Stage {
  step: string;
  label: string;
  description: string;
  tools: string[];
  projectSlugs: string[];
}

/** The trajectory from data engineering into agentic AI — no employers or dates. */
export const stages: Stage[] = [
  {
    step: "01",
    label: "Data Engineering",
    description:
      "Event-driven pipelines, ETL, and reverse ETL — moving data reliably between systems and modeling it for downstream use.",
    tools: ["Python", "SQL", "Spark", "Pandas", "NumPy", "AWS Lambda", "SQS", "MySQL"],
    projectSlugs: ["freshdesk-realtime-data-pipeline", "hubspot-crm-data-integration"],
  },
  {
    step: "02",
    label: "AI / Data Engineering",
    description:
      "Bringing LLM tooling into the data layer — retrieval, tool integration, and prompt engineering on top of existing pipelines.",
    tools: ["LangChain", "RAG", "Prompt engineering", "Tool integration", "GCP BigQuery"],
    projectSlugs: [],
  },
  {
    step: "03",
    label: "Agentic AI",
    description:
      "Stateful, multi-agent systems that reason across steps — LangGraph workflows and multi-agent computer-vision pipelines.",
    tools: ["LangGraph", "Stateful agents", "Multi-agent systems", "PyTorch", "YOLO", "LoRA"],
    projectSlugs: ["pricing-genie", "vehide"],
  },
];
