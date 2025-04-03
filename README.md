# Turborepo Starter for Bun, Go, and Python Microservices on K8s

This repo includes examples for three types of services with private packages included.

These include:

- Bun based microservices for external request handling
- Python based microservices for data-intensive processes
- Go based microservices for highly-concurrent operations

## Features

- Turborepo
- Bun and Hono based Microservices
- Python and FastAPI based Microservices
- Go and Gin based Microservices

Each service has a test suite implementation for unit testing and load testing with k6.

Github Actions based CI/CD is also included.

## Getting Started

### Prerequisites

These prerequisites will be verified via a preinstall script.

- Bun must be installed on your machine.
- Python must be installed on your machine.
- Go must be installed on your machine.
- k6 must be installed on your machine.
- Docker must be installed on your machine.
- Skaffold must be installed on your machine.
- You should have a Kubernetes cluster with an active kubectl configuration.

### Install Dependencies

```bash
bun install
```

> If you have any issues, please refer to the [Prerequisites](#prerequisites) section.

### Run the apps in Dev Mode

```bash
bun run dev
```

### Lint the apps

```bash
bun run lint
```

### Format the apps

```bash
bun run format
```

### Run the tests

```bash
bun run test
```

### Run performance tests

```bash
bun run perf-test
```

### Reset Python Virtual Environments

If you encounter issues with Python virtual environments or after moving/renaming the project directory, use this command to reset all Python virtual environments:

```bash
bun run reset-python-venvs
```

This will find all Python packages in the project, remove their virtual environments, and reinstall all dependencies using Poetry.

## Build System

We use Docker and Turborepo to build the apps.

### Build the apps

```bash
bun run build
```

## Generators

This repo includes generators for the following:

- Bun based microservices
- Python based microservices
- Go based microservices
- Bun based packages
- Go based packages
- Python based packages

Run the following commands from the root of the repo.

### Generate a new Bun based microservice

```bash
bun run gen:bun-service
```

### Generate a new Python based microservice

```bash
bun run gen:python-service
```

### Generate a new Go based microservice

```bash
bun run gen:go-service
```

### Generate a new Bun based package

```bash
bun run gen:bun-package
```

### Generate a new Go based package

```bash
bun run gen:go-package
```

### Generate a new Python based package

```bash
bun run gen:python-package
```

## Known Issues

- `turbo prune` does not yet support Bun, so we use `--no-frozen-lockfile` when installing dependencies for Bun services.
