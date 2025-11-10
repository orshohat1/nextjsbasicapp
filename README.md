# Next.js Basic App

A Next.js application with automated GitHub Actions workflows for issue management and deployment to Azure Kubernetes Service (AKS).

## Project Overview

This repository contains:
- A Next.js application built with TypeScript and Tailwind CSS
- Automated GitHub Actions workflows for issue management
- Helm charts for Kubernetes deployment
- Docker configuration for containerization

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- Docker (for containerization)
- kubectl and Helm (for Kubernetes deployment)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`.

## GitHub Actions Workflows

### Bug Reproduction Check

**File**: `.github/workflows/bug-reproduction-instructions.yml`

Automatically analyzes new issues labeled as 'bug' using AI to determine if they contain sufficient reproduction information. If details are missing, the workflow posts a helpful comment guiding the reporter.

- **Trigger**: When issues are opened
- **Filter**: Only runs for issues with 'bug' label
- **AI Model**: mistral-ai/ministral-3b

### Weekly Issue Summary

**File**: `.github/workflows/weekly-issue-summary.yml`

Creates a weekly summary of all issues created in the past 7 days.

- **Trigger**: Every Monday at 9:00 UTC (or manual via workflow_dispatch)
- **AI Model**: xai/grok-3-mini
- **Output**: Opens a new issue with the summarized content

## Deployment

### AKS Deployment with Helm

The project includes Helm charts in the `testapp/` directory for deploying to Azure Kubernetes Service.

#### Jobs and Their Purpose

**`analyze`**: Conducts static application security testing using CodeQL for specified languages.

**`set-version`**: Sets the version of the application based on the commit history.

**`buildImage`**: Builds a Docker image for the application and pushes it to Azure Container Registry (ACR). Includes vulnerability scanning with Trivy.

**`deploy`**: Deploys the application to the AKS cluster using Helm charts with dry-run validation.

**`post-deployment`**: Executes post-deployment tests on the deployed application.

**`tag-as-stable`**: Tags the image as stable in the Azure Container Registry.

#### Environment Variables

- `AZURE_CONTAINER_REGISTRY`: Azure Container Registry name
- `RESOURCE_GROUP`: Azure resource group name
- `CLUSTER_NAME`: AKS cluster name

#### Secrets Required

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`

## Project Structure

```
├── .github/
│   └── workflows/          # GitHub Actions workflows
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── sql.ts             # SQL utilities
├── public/                # Static assets
├── testapp/               # Helm chart for deployment
│   ├── templates/         # Kubernetes manifests
│   ├── Chart.yaml         # Helm chart metadata
│   └── values.yaml        # Default values
├── weekly-issue-summary/  # Issue summary prompt configuration
├── Dockerfile             # Docker build configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Contributing

When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Environment details (browser, OS, versions)
- Relevant logs or screenshots

## License

[Add your license information here]

## Contact

For issues or questions, please open an issue in this repository.

