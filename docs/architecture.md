# Architecture

| Decision | Choice | Why |
|---|---|---|
| Rendering | Static export (`output: 'export'`) → S3 + CloudFront | Nothing varies per request; SSR/OpenNext buys ISR + middleware this site never uses |
| Backend V1 | One Python Lambda (contact form), not FastAPI | One endpoint doesn't justify a second deployable; swap to Mangum + FastAPI if a second one shows up |
| API gateway | Lambda Function URL, not API Gateway | No per-request charge; API Gateway's free tier is 12 months only |
| Content | Typed array in `web/lib/projects.ts` now, MDX at repo root later | `getAllProjects()`/`getProjectBySlug()` are the seam — pages never touch the source directly |
| Agents (V4+) | Standalone `agents/` Python package, no web framework imports | `backend/` depends on `agents/`, never the reverse |
| Diagrams | Real DOM (`components/pipeline-diagram.tsx`), not Mermaid | Mermaid is ~500KB of runtime JS for something that's static content |

See [`infrastructure/README.md`](../infrastructure/README.md) for deploy
steps and cost, and the design tokens in
[`web/app/globals.css`](../web/app/globals.css) for the visual system.

## Design system

| Layer | Where | Notes |
|---|---|---|
| Tokens | `web/app/globals.css` `:root` | OKLCH, dark blue-black base (hue 262). Cyan `--accent` carries text and buttons; violet `--accent-2` is decorative only (gradients, glows, AI tone). Token names are read by `scripts/check-contrast.mjs` — rename with care |
| Type | Geist / Geist Mono / Instrument Serif (italic) | Named scale (`text-display`, `text-h1`…`text-label`). The serif is reserved for one accent phrase per heading |
| Surfaces | `.card`, `.card-interactive`, `.glass`, `.chip` | Interactive cards lift and fade in a masked gradient border on hover/focus |
| Per-item tone | `--tone-h` + `.tone-*` utilities | Project categories map to a hue in `lib/projects.ts` |
| Motion | `.reveal`, `animate-rise`, `.flow-packet` | Scroll reveals are CSS scroll-driven animations (no JS); everything stops under `prefers-reduced-motion` |
| Primitives | `web/components/ui/` | `Container`, `Section`, `SectionHeader`, `PageHeader`, `ButtonLink`, `Chip`, `StatusBadge`, icons |
| Sections | `web/components/sections/` | Reused across pages: focus grid, trajectory, tech ecosystem, platform grid, contact CTA |

Content lives in typed modules — `lib/site.ts` (person, links, nav,
capabilities), `lib/projects.ts`, `lib/experience.ts`, `lib/platform.ts`
(writing, tutorials, labs). Adding a project, post, tutorial, or lab entry
is a data change; the pages render whatever is there, with honest
empty/planned states until real content exists.

## Roadmap

V1 portfolio (this) → V2 blog → V3 tutorials → V4 AI Labs (FastAPI +
`agents/`) → V5 RAG over own content → V6 multi-agent → V7 auth/admin.

The public content site stays static forever — interactive features are
added beside it as API calls, never by making the whole site dynamic.
