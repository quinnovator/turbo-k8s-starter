# Builder stage
FROM golang:1.22.3-alpine3.19 AS builder

ARG TARGETOS
ARG TARGETARCH

# Setup working directory that matches relative path in go.mod
WORKDIR /workspace/apps/go-api

# Copy go.mod and go.sum for dependency caching
COPY apps/go-api/go.mod apps/go-api/go.sum ./

# Create directory structure for the replace directive
RUN mkdir -p ../../packages/go-health

# Copy the local go-health package with correct relative path
COPY packages/go-health /workspace/packages/go-health

# Download dependencies with cache mounting
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go mod download

# Copy the source code
COPY apps/go-api/main.go ./

# Build the binary for the target platform with optimizations
RUN --mount=type=cache,target=/root/.cache/go-build \
    CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} \
    go build -ldflags="-s -w" -o go-api

# Release stage
FROM alpine:3.19.1

# Add CA certificates for HTTPS
RUN apk --no-cache add ca-certificates tzdata

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the binary from the builder stage
COPY --from=builder /workspace/apps/go-api/go-api /go-api

# Set the user to non-root
USER appuser

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Expose port 8080 as used in main.go
EXPOSE 8080

# Run the binary
ENTRYPOINT ["/go-api"]