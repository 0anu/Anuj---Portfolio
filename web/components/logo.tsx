import { person } from "@/lib/site";

/** Monogram mark: initials on a gradient-bordered tile. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--accent),var(--accent-2))] p-px transition-transform duration-300 group-hover:rotate-[-4deg] ${className}`}
    >
      <span className="flex h-full w-full items-center justify-center rounded-[7px] bg-bg-deep font-mono text-[0.6875rem] font-semibold tracking-tight text-fg-strong">
        {person.initials}
      </span>
    </span>
  );
}
