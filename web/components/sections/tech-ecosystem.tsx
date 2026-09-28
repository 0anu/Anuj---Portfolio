import type { CSSProperties } from "react";
import { capabilityGroups } from "@/lib/site";

const groupHues: Record<string, number> = {
  Data: 200,
  Cloud: 240,
  "AI / LLM": 292,
  ML: 75,
};

/** Capability groups as labelled panels of chips. */
export function TechEcosystem() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {capabilityGroups.map((group) => (
        <div
          key={group.label}
          className="reveal card p-6"
          style={{ "--tone-h": groupHues[group.label] ?? 200 } as CSSProperties}
        >
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.12em] text-fg-strong">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "oklch(83% 0.13 var(--tone-h))" }}
                aria-hidden="true"
              />
              {group.label}
            </h3>
            <span className="font-mono text-label text-fg-subtle tabular-nums">
              {String(group.items.length).padStart(2, "0")}
            </span>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border bg-bg-subtle px-3 py-1.5 text-caption text-fg transition-colors hover:border-border-strong hover:text-fg-strong"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
