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

## Hosting

The site deploys to **GitHub Pages** on every push to `main`
([`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)),
at `https://0anu.github.io/Anuj---Portfolio/`. Pull requests run the same
verify + contrast checks without deploying. One-time setup: repo
**Settings → Pages → Source: GitHub Actions**.

- **Contact form:** set the repository variable `CONTACT_ENDPOINT` to a
  Formspree form URL (or the AWS Lambda Function URL). Without it the form
  says it isn't configured yet.
- **Custom domain:** add it under Settings → Pages. The workflow picks up the
  new root path automatically — no code change.

The Terraform in [`infrastructure/`](infrastructure/README.md) remains an
alternative AWS deployment (S3 + CloudFront).

See [`docs/architecture.md`](docs/architecture.md) for the architecture
decisions and roadmap, and [`infrastructure/README.md`](infrastructure/README.md)
for deploying to AWS.
