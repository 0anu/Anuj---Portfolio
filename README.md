# Anuj Gautam — Data & AI Engineering Platform

Personal portfolio for Anuj Gautam, Data Engineer II, moving toward agentic
AI. Static Next.js site, one Python Lambda for the contact form, Terraform
for the rest.

Work happens entirely in Docker — no local Node/Python toolchain required.

```bash
# Dev server at localhost:3000, hot reload
docker compose run --rm --service-ports web npm run dev

# Verify: format check + lint + typecheck + build
docker compose run --rm web npm run verify

# Contrast check (after a build)
docker compose run --rm web npm run contrast

# Static export for deploy
docker build --target artifact --output "type=local,dest=dist" .
```

See [`docs/architecture.md`](docs/architecture.md) for the architecture
decisions and roadmap, and [`infrastructure/README.md`](infrastructure/README.md)
for deploying to AWS.
