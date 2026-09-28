import type { ReactNode } from "react";

export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`chip ${className}`}>{children}</span>;
}

export function ChipList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <Chip>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}

type Tone = "planned" | "progress" | "live";

const toneClasses: Record<Tone, string> = {
  planned: "text-fg-muted border-border-strong",
  progress: "text-warning border-[oklch(82%_0.14_82/35%)]",
  live: "text-success border-[oklch(78%_0.15_152/35%)]",
};

const dotClasses: Record<Tone, string> = {
  planned: "bg-fg-subtle",
  progress: "bg-warning pulse",
  live: "bg-success pulse",
};

export function statusTone(status: string): Tone {
  if (status === "Live" || status === "Shipped") return "live";
  if (status === "In progress" || status.includes("progress")) return "progress";
  return "planned";
}

/** Small status pill with a colored dot — Planned / In progress / Live. */
export function StatusBadge({ status, className = "" }: { status: string; className?: string }) {
  const tone = statusTone(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-label uppercase tracking-[0.08em] ${toneClasses[tone]} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[tone]}`} aria-hidden="true" />
      {status}
    </span>
  );
}
