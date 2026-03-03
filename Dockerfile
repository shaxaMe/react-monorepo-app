# ============================================================
# Multi-stage Dockerfile — Enterprise Monorepo
# Builds both admin and public-web apps, served by Nginx.
# ============================================================

# ── Stage 1: deps ────────────────────────────────────────────
# Install only production-relevant dependencies for the build.
FROM node:20-alpine AS deps
WORKDIR /app

# Enable Corepack for Yarn Berry
RUN corepack enable

COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./
COPY packages/config/package.json ./packages/config/package.json
COPY packages/types/package.json   ./packages/types/package.json
COPY packages/utils/package.json   ./packages/utils/package.json
COPY packages/hooks/package.json   ./packages/hooks/package.json
COPY packages/ui/package.json      ./packages/ui/package.json
COPY apps/admin/package.json       ./apps/admin/package.json
COPY apps/public-web/package.json  ./apps/public-web/package.json

RUN yarn install --immutable --inline-builds

# ── Stage 2: builder ─────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY --from=deps /app/node_modules       ./node_modules
COPY --from=deps /app/packages/config/node_modules ./packages/config/node_modules
COPY --from=deps /app/packages/types/node_modules  ./packages/types/node_modules
COPY --from=deps /app/packages/utils/node_modules  ./packages/utils/node_modules
COPY --from=deps /app/packages/hooks/node_modules  ./packages/hooks/node_modules
COPY --from=deps /app/packages/ui/node_modules     ./packages/ui/node_modules
COPY --from=deps /app/apps/admin/node_modules      ./apps/admin/node_modules
COPY --from=deps /app/apps/public-web/node_modules ./apps/public-web/node_modules

# Copy all source files
COPY . .

# Build everything via Turborepo (respects pipeline dependencies)
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV NODE_ENV=production

RUN yarn turbo run build --filter=@repo/admin --filter=@repo/public-web

# ── Stage 3: runtime (Nginx) ──────────────────────────────────
FROM nginx:1.27-alpine AS runtime

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy both app builds
COPY --from=builder /app/apps/admin/dist      /usr/share/nginx/html/admin
COPY --from=builder /app/apps/public-web/dist /usr/share/nginx/html/public

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
