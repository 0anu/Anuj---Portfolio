# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# base — shared Node toolchain image. No NODE_ENV is set anywhere in this
# file: Next.js sets it per-command, and pinning it to "development" makes
# `next build` load dev React internals and die at prerender.
# ---------------------------------------------------------------------------
FROM node:22-alpine AS base
WORKDIR /workspace/web

# ---------------------------------------------------------------------------
# deps — install once, cached across dev/build as long as the lockfile
# doesn't change.
# ---------------------------------------------------------------------------
FROM base AS deps
COPY web/package.json web/package-lock.json* ./
RUN npm ci

# ---------------------------------------------------------------------------
# dev — bind-mounted by compose.yaml; node_modules/.next stay in named
# volumes (see compose.yaml) since Windows bind mounts are far slower for
# many small files. Turbopack's watcher can't see edits across a Windows
# bind mount either, so dev runs webpack with polling instead.
# ---------------------------------------------------------------------------
FROM deps AS dev
ENV WATCHPACK_POLLING=true
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---------------------------------------------------------------------------
# builder — full static export build. Stop any running dev server first:
# both share the .next volume, and a concurrent build reads half-written
# generated types.
# ---------------------------------------------------------------------------
FROM deps AS builder
COPY web/ ./
RUN npm run build

# ---------------------------------------------------------------------------
# artifact — nothing but the static export, for
#   docker build --target artifact --output "type=local,dest=dist" .
# ---------------------------------------------------------------------------
FROM scratch AS artifact
COPY --from=builder /workspace/web/out /
