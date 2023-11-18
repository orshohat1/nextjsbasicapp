# Build and Deploy App to AKS with Helm

This GitHub Actions workflow automates the building and deploying process of an application to an AKS (Azure Kubernetes Service) cluster using Helm charts. The workflow consists of several jobs and steps:

## Jobs and Their Purpose

### `set-version`

- **Purpose**: Perform static application secutrity testing using CodeQL, sets the version of the application based on the commit history. 
- **Runs on**: Self-hosted runner.

### `buildImage`

- **Purpose**: Builds a Docker image for the application and pushes it to Azure Container Registry (ACR).
- **Runs on**: Self-hosted runner.
- **Steps**:
  - Azure login for authentication.
  - Building and pushing the Docker image.
  - Scanning the Docker image for vulnerabilities using Trivy.

### `deploy`

- **Purpose**: Deploys the application to the AKS cluster using Helm charts.
- **Runs on**: Self-hosted runner.
- **Steps**:
  - Azure AKS login for cluster authentication.
  - Helm dry-run for checking chart compatibility with Kubernetes APIs.
  - Helm deployment with specified configurations and wait time.

### `post-deployment`

- **Purpose**: Executes post-deployment tests on the deployed application.
- **Runs on**: Self-hosted runner.
- **Steps**:
  - Azure AKS login for cluster authentication.
  - Execution of Helm tests on the deployed application.

### `tag-as-stable`

- **Purpose**: Tags the image as stable in the Azure Container Registry.
- **Runs on**: Self-hosted runner.
- **Steps**:
  - Azure login for ACR authentication.
  - Tagging the Docker image as stable in the ACR.

## Workflow Trigger

The workflow is triggered manually using the `workflow_dispatch` event.

## Environment Variables

- `AZURE_CONTAINER_REGISTRY`: Azure Container Registry name.
- `RESOURCE_GROUP`: Azure resource group name.
- `CLUSTER_NAME`: AKS cluster name.

## Secrets Required

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`

## Note

Make sure to replace placeholders with actual values in the workflow configuration.

Feel free to customize the workflow according to your project requirements.

For any issues or queries, please reach out to [maintainer's email/contact].

