import type { Metadata } from "next";

export const metadata: Metadata = { title: "Labs" };

interface ManifestEntry {
  version: string;
  feature: string;
  detail: string;
}

const manifest: ManifestEntry[] = [
  {
    version: "V4",
    feature: "AI Labs backend",
    detail: "FastAPI service + a standalone agents/ package, no web-framework imports inside it.",
  },
  {
    version: "V5",
    feature: "RAG over this site",
    detail: "Retrieval-augmented generation indexed against the site's own MDX content.",
  },
  {
    version: "V6",
    feature: "Multi-agent workflows",
    detail: "Interactive, stateful multi-agent demos built on the same agents package.",
  },
  {
    version: "V7",
    feature: "Auth / admin",
    detail: "Authenticated surface for managing labs and content.",
  },
];

export default function LabsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-16 max-w-2xl">
        <p className="font-mono text-label uppercase tracking-[0.1em] text-accent-text">Labs</p>
        <h1 className="mt-4 text-h1 text-fg-strong">Manifest</h1>
        <p className="mt-4 text-body-lg text-fg-muted">
          Interactive AI labs are added beside the static site as API calls — the site itself stays
          static. Nothing here is live yet.
        </p>
      </header>

      <div className="overflow-x-auto rounded-md border border-border font-mono">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-bg-subtle text-label uppercase tracking-[0.08em] text-fg-subtle">
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Feature</th>
              <th className="px-4 py-3">Detail</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {manifest.map((entry, i) => (
              <tr
                key={entry.version}
                className={`border-t border-border ${i % 2 === 1 ? "bg-bg-subtle/40" : ""}`}
              >
                <td className="px-4 py-3 text-caption text-fg-strong">{entry.version}</td>
                <td className="whitespace-nowrap px-4 py-3 text-caption text-fg">
                  {entry.feature}
                </td>
                <td className="px-4 py-3 text-caption text-fg-muted">{entry.detail}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-block rounded border border-border-strong px-2 py-0.5 text-label uppercase tracking-[0.08em] text-fg-subtle">
                    Planned
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
