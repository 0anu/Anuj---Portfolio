import type { Metadata } from "next";
import { tutorials } from "@/lib/platform";
import { Container, PageHeader } from "@/components/ui/section";
import { ChipList, StatusBadge } from "@/components/ui/badge";
import { Play } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Video walkthroughs of the architectures behind the projects: webhook pipelines, LangGraph agents, and LoRA fine-tuning.",
  alternates: { canonical: "/tutorials" },
};

export default function TutorialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tutorials"
        title="Walkthroughs, planned"
        description="Step-by-step builds of the systems behind the projects. Frames are reserved so future video embeds won't shift the layout — no recordings exist yet."
      />

      <Container className="py-14 md:py-20">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial, i) => (
            <li key={tutorial.title} className="reveal flex">
              <div className="card card-interactive group flex w-full flex-col overflow-hidden">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden border-b border-border bg-bg-subtle">
                  <div className="backdrop-grid absolute inset-0" aria-hidden="true" />
                  <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(70%_0.17_292/16%),transparent_65%)]"
                    aria-hidden="true"
                  />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-[oklch(100%_0_0/6%)] text-[1.25rem] text-fg-strong backdrop-blur transition-transform duration-300 group-hover:scale-110">
                    <Play className="translate-x-px" />
                  </span>
                  <span className="absolute top-3 left-3 font-mono text-label text-fg-subtle tabular-nums">
                    EP {String(i + 1).padStart(2, "0")}
                  </span>
                  <StatusBadge
                    status={tutorial.status}
                    className="absolute top-3 right-3 bg-bg-deep/70"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-h4 text-fg-strong">{tutorial.title}</h2>
                  <p className="mt-2 text-caption text-fg-muted">{tutorial.description}</p>
                  <ChipList items={tutorial.topics} className="mt-auto pt-5" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
