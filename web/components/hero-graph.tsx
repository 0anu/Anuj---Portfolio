/**
 * Hero illustration: a data pipeline feeding an agent, as a static SVG.
 * Motion is CSS only (.flow-packet dashes travelling each edge), so it costs
 * no JS and stops entirely under prefers-reduced-motion.
 */

interface GraphNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  kind?: "source" | "core" | "agent" | "tool" | "output";
}

const nodes: GraphNode[] = [
  { id: "webhook", x: 16, y: 40, w: 112, h: 38, label: "webhooks", kind: "source" },
  { id: "api", x: 16, y: 100, w: 112, h: 38, label: "rest apis", kind: "source" },
  { id: "events", x: 16, y: 160, w: 112, h: 38, label: "events", kind: "source" },
  { id: "queue", x: 180, y: 70, w: 118, h: 38, label: "sqs queue", kind: "core" },
  { id: "transform", x: 180, y: 140, w: 118, h: 38, label: "transform", kind: "core" },
  {
    id: "warehouse",
    x: 348,
    y: 96,
    w: 156,
    h: 50,
    label: "warehouse",
    sub: "mysql · bigquery",
    kind: "core",
  },
  { id: "rag", x: 16, y: 262, w: 112, h: 34, label: "rag", kind: "tool" },
  { id: "sql", x: 16, y: 310, w: 112, h: 34, label: "sql tool", kind: "tool" },
  { id: "search", x: 16, y: 358, w: 112, h: 34, label: "web search", kind: "tool" },
  {
    id: "agent",
    x: 180,
    y: 284,
    w: 170,
    h: 70,
    label: "agent",
    sub: "plan → act → reflect",
    kind: "agent",
  },
  { id: "insight", x: 390, y: 356, w: 114, h: 40, label: "insight", kind: "output" },
];

/** Cubic edge between two points, bowed horizontally. */
function curve(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(24, Math.abs(x2 - x1) * 0.5);
  return `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

const edges: { d: string; delay: number; tone?: "ai" }[] = [
  { d: curve(128, 59, 180, 89), delay: 0 },
  { d: curve(128, 119, 180, 89), delay: 0.6 },
  { d: curve(128, 179, 180, 159), delay: 1.1 },
  { d: "M239 108 L239 140", delay: 0.3 },
  { d: curve(298, 159, 348, 121), delay: 1.6 },
  { d: curve(298, 89, 348, 121), delay: 0.9 },
  // warehouse → agent (drops down, then left)
  { d: "M426 146 C426 230, 380 250, 350 300", delay: 2.1, tone: "ai" },
  // tools ↔ agent
  { d: curve(128, 279, 180, 306), delay: 0.4, tone: "ai" },
  { d: curve(128, 327, 180, 319), delay: 1.4, tone: "ai" },
  { d: curve(128, 375, 180, 332), delay: 2.4, tone: "ai" },
  // agent → insight
  { d: curve(350, 332, 390, 376), delay: 1.8, tone: "ai" },
];

const nodeStyles: Record<NonNullable<GraphNode["kind"]>, { fill: string; stroke: string }> = {
  source: { fill: "var(--bg-subtle)", stroke: "var(--border-strong)" },
  core: { fill: "var(--surface)", stroke: "oklch(83% 0.13 200 / 40%)" },
  tool: { fill: "var(--bg-subtle)", stroke: "oklch(70% 0.17 292 / 35%)" },
  agent: { fill: "var(--surface-raised)", stroke: "url(#agent-stroke)" },
  output: { fill: "var(--surface)", stroke: "oklch(78% 0.15 152 / 50%)" },
};

export function HeroGraph() {
  return (
    <figure className="card relative overflow-hidden !rounded-2xl p-0">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(100%_0_0/12%)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(100%_0_0/12%)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(100%_0_0/12%)]" />
        </div>
        <span className="font-mono text-label text-fg-subtle">system.graph</span>
        <span className="flex items-center gap-1.5 font-mono text-label text-success">
          <span className="pulse h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          live
        </span>
      </div>
      <svg
        viewBox="0 0 520 420"
        className="block h-auto w-full"
        role="img"
        aria-labelledby="hero-graph-title"
      >
        <title id="hero-graph-title">
          Diagram: webhooks, APIs and events flow through a queue and transform step into a
          warehouse, which feeds an AI agent that uses RAG, SQL and search tools to produce insight.
        </title>
        <defs>
          <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.9" fill="oklch(100% 0 0 / 7%)" />
          </pattern>
          <linearGradient id="agent-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
          <radialGradient id="agent-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(70% 0.17 292 / 35%)" />
            <stop offset="100%" stopColor="oklch(70% 0.17 292 / 0%)" />
          </radialGradient>
        </defs>

        <rect width="520" height="420" fill="url(#dots)" />

        {/* Tier labels */}
        <text x="16" y="24" className="fill-fg-subtle font-mono text-[10px] tracking-[0.12em]">
          INGEST
        </text>
        <text x="180" y="24" className="fill-fg-subtle font-mono text-[10px] tracking-[0.12em]">
          PROCESS
        </text>
        <text x="348" y="24" className="fill-fg-subtle font-mono text-[10px] tracking-[0.12em]">
          STORE
        </text>
        <text x="16" y="248" className="fill-fg-subtle font-mono text-[10px] tracking-[0.12em]">
          TOOLS
        </text>
        <text x="180" y="270" className="fill-fg-subtle font-mono text-[10px] tracking-[0.12em]">
          REASON
        </text>

        <ellipse cx="265" cy="319" rx="130" ry="70" fill="url(#agent-glow)" className="pulse" />

        {/* Edge rails + travelling packets */}
        <g fill="none" strokeLinecap="round">
          {edges.map((edge, i) => (
            <path key={`rail-${i}`} d={edge.d} stroke="oklch(100% 0 0 / 11%)" strokeWidth="1.25" />
          ))}
          {edges.map((edge, i) => (
            <path
              key={`packet-${i}`}
              d={edge.d}
              className="flow-packet"
              stroke={edge.tone === "ai" ? "var(--accent-2)" : "var(--accent)"}
              strokeWidth="2"
              style={{ animationDelay: `${edge.delay}s` }}
            />
          ))}
        </g>

        {/* Nodes */}
        {nodes.map((node) => {
          const style = nodeStyles[node.kind ?? "core"];
          const cy = node.y + node.h / 2;
          return (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={node.kind === "agent" ? 14 : 9}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={node.kind === "agent" ? 1.5 : 1}
              />
              <circle
                cx={node.x + 14}
                cy={node.sub ? node.y + 18 : cy}
                r="3"
                fill={
                  node.kind === "tool" || node.kind === "agent"
                    ? "var(--accent-2)"
                    : node.kind === "output"
                      ? "var(--success)"
                      : "var(--accent)"
                }
              />
              <text
                x={node.x + 26}
                y={node.sub ? node.y + 22 : cy + 4}
                className={`font-mono ${node.kind === "agent" ? "fill-fg-strong text-[13px] font-semibold" : "fill-fg text-[11.5px]"}`}
              >
                {node.label}
              </text>
              {node.sub ? (
                <text
                  x={node.x + 14}
                  y={node.y + node.h - 14}
                  className="fill-fg-subtle font-mono text-[10.5px]"
                >
                  {node.sub}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
