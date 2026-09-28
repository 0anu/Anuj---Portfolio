import type { Metadata } from "next";
import { getAllCategories, getAllProjects } from "@/lib/projects";
import { Container, PageHeader } from "@/components/ui/section";
import { ProjectGrid } from "@/components/project-grid";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Data engineering pipelines, CRM integrations, and agentic AI systems — each with its architecture and engineering concerns.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Data and agentic AI systems"
        description="Event-driven pipelines, reverse-ETL integrations, and multi-agent systems. Each case study breaks down the architecture and the engineering concerns that shaped it."
      />
      <Container className="py-14 md:py-20">
        <ProjectGrid projects={projects} categories={getAllCategories()} />
      </Container>
      <ContactCta
        title="Have a pipeline or agent problem?"
        description="If one of these looks like something you're building, let's compare notes."
      />
    </>
  );
}
