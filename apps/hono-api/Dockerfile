# Build stage
FROM oven/bun:1.2.3-alpine AS build
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production \
    BUN_INSTALL_CACHE_DIR=/bun-cache

# Copy package.json files
COPY package.json ./
COPY scripts scripts
COPY packages/hono-health packages/hono-health
COPY apps/hono-api apps/hono-api

# Install dependencies with cache
RUN --mount=type=cache,target=/bun-cache \
    bun install --production --no-frozen-lockfile --ignore-scripts

# Runtime stage
FROM oven/bun:1.2.3-alpine

# Set environment variables
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy from build stage
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/packages/hono-health /app/packages/hono-health
COPY --from=build /app/apps/hono-api /app/apps/hono-api

# Set correct ownership
RUN chown -R appuser:appgroup /app

# Use non-root user
USER appuser

WORKDIR /app/apps/hono-api

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8081/health || exit 1

# Expose API port
EXPOSE 8081

# Run the application
CMD ["bun", "src/index.ts"]