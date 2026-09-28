import type { Metadata } from "next";
import { Container, PageHeader, SectionHeader } from "@/components/ui/section";
import { Trajectory } from "@/components/sections/trajectory";
import { TechEcosystem } from "@/components/sections/tech-ecosystem";
import { FocusGrid } from "@/components/sections/focus-grid";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "The through-line from data engineering into agentic AI, and the tools that mark each stage.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="A trajectory, not a résumé"
        description="The through-line from data engineering into agentic AI, and the tools and projects that mark each stage."
      />

      <Container className="py-16 md:py-24">
        <Trajectory />
      </Container>

      <section
        aria-labelledby="focus-title"
        className="border-t border-border bg-bg py-16 md:py-24"
      >
        <Container>
          <SectionHeader
            id="focus-title"
            eyebrow="Expertise"
            title="Areas of focus"
            description="Where that trajectory has landed so far."
          />
          <FocusGrid />
        </Container>
      </section>

      <section aria-labelledby="capabilities-title" className="py-16 md:py-24">
        <Container>
          <SectionHeader
            id="capabilities-title"
            eyebrow="Capabilities"
            title="Tools & concepts"
            description="Grouped by domain, as used across the project work."
          />
          <TechEcosystem />
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
