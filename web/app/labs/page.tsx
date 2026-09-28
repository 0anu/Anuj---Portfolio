import type { Metadata } from "next";
import { labsManifest } from "@/lib/platform";
import { Container, PageHeader } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Interactive AI labs — RAG over this site, multi-agent workflows — built beside the static site as API calls.",
  alternates: { canonical: "/labs" },
};

export default function LabsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Labs"
        title="AI experiments, in the open"
        description="Interactive AI labs are added beside the static site as API calls — the site itself stays static. This manifest tracks what's planned. Nothing here is live yet."
      />

      <Container className="py-14 md:py-20">
        <ol className="relative space-y-4 md:space-y-5">
          <span
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-[1.6rem] w-px bg-[linear-gradient(var(--accent),var(--accent-2),transparent)] opacity-40 md:left-[2.1rem]"
          />
          {labsManifest.map((entry) => (
            <li key={entry.version} className="reveal relative flex gap-4 md:gap-6">
              <span className="relative z-10 flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-2xl border border-border-strong bg-bg-deep font-mono text-caption text-accent-text md:h-[4.25rem] md:w-[4.25rem] md:text-body">
                {entry.version}
              </span>
              <div className="card flex flex-1 flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
                <div>
                  <h2 className="text-h4 text-fg-strong">{entry.feature}</h2>
                  <p className="mt-1.5 text-caption text-fg-muted">{entry.detail}</p>
                </div>
                <StatusBadge status={entry.status} className="self-start sm:self-center" />
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 max-w-2xl font-mono text-caption text-fg-subtle">
          Architecture: a standalone <span className="text-fg">agents/</span> Python package with no
          web-framework imports, served by a small FastAPI backend. The public site never becomes
          dynamic — labs are API calls from static pages.
        </p>
      </Container>
    </>
  );
}
