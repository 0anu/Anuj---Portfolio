import { capabilityGroups } from "@/lib/site";

const hues: Record<string, number> = { Data: 200, Cloud: 240, "AI / LLM": 292, ML: 70 };

/**
 * Scrolling strip of every capability, coloured by group. The list renders
 * twice so the -50% translate loops seamlessly; the copy is aria-hidden and
 * the strip stops entirely under prefers-reduced-motion.
 */
export function TechMarquee() {
  const items = capabilityGroups.flatMap((group) =>
    group.items.map((item) => ({ item, hue: hues[group.label] ?? 200 })),
  );

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map(({ item, hue }) => (
        <li
          key={item}
          className="flex items-center gap-2 rounded-full border border-border bg-tint px-4 py-2 text-caption whitespace-nowrap text-fg"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: `oklch(80% 0.14 ${hue})` }}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee-mask overflow-hidden border-y border-border bg-bg py-5">
      <p className="sr-only">Technologies: {items.map((i) => i.item).join(", ")}</p>
      <div className="marquee" aria-hidden="true">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
