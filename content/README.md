# content

Reserved for MDX (blog posts, tutorials) starting V2. Validated at build time
with Zod, and shared with the future Python RAG indexer (V5) — the reason
this lives at the repo root rather than under `web/`.

V1 project data lives in [`web/lib/projects.ts`](../web/lib/projects.ts)
instead; `getAllProjects()`/`getProjectBySlug()` are the seam that gets
repointed at this directory once MDX content exists.
