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

## Roadmap

V1 portfolio (this) → V2 blog → V3 tutorials → V4 AI Labs (FastAPI +
`agents/`) → V5 RAG over own content → V6 multi-agent → V7 auth/admin.

The public content site stays static forever — interactive features are
added beside it as API calls, never by making the whole site dynamic.
