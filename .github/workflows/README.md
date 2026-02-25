# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD automation of the Cursor project.

## Workflows Overview

### 1. CI Workflow (`ci.yml`)
**Triggers:** Push/PR to `main` or `develop` branches

**What it does:**
- Builds and lints the web application (Next.js)
- Builds and type-checks the service (Fastify)
- Builds and verifies the CLI tool
- Uploads build artifacts for use in deployment workflows

**No secrets required** - This workflow only builds and tests code.

### 2. Deploy Web App (`deploy-web.yml`)
**Triggers:** Push to `main` branch (web directory changes) or manual dispatch

**What it does:**
- Deploys the Next.js web application to Vercel
- Uses Vercel CLI for building and deployment
- Supports production deployments

**Required Secrets:**
- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `NEXT_PUBLIC_SITE_URL` - Your site URL
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN (optional)
- `SENTRY_ORG` - Sentry organization (optional)
- `SENTRY_PROJECT` - Sentry project name (optional)
- `SENTRY_AUTH_TOKEN` - Sentry auth token (optional)
- `RESEND_API_KEY` - Resend API key (optional)
- `RESEND_FROM_EMAIL` - Resend from email (optional)
- `SUPABASE_URL` - Supabase URL (optional)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (optional)
- `VERCEL_WEBHOOK_SECRET` - Vercel webhook secret (optional)

### 3. Deploy Service (`deploy-service.yml`)
**Triggers:** Push to `main` branch (service directory changes) or manual dispatch

**What it does:**
- Builds the Fastify service
- Creates a deployment package
- Uploads artifacts (ready for deployment to your platform)

**Deployment Options:**
The workflow includes commented-out sections for different deployment platforms:
- **Railway**: Uncomment the Railway deployment step
- **Render**: Uncomment the Render deployment step
- **SSH/Server**: Uncomment the SSH deployment step
- **Docker**: Uncomment the Docker build/push steps

**Required Secrets (depending on deployment method):**
- `RAILWAY_TOKEN` - Railway API token (if using Railway)
- `RENDER_SERVICE_ID` - Render service ID (if using Render)
- `RENDER_API_KEY` - Render API key (if using Render)
- `DEPLOY_HOST` - Server hostname (if using SSH)
- `DEPLOY_USER` - SSH username (if using SSH)
- `DEPLOY_SSH_KEY` - SSH private key (if using SSH)
- `DOCKER_USERNAME` - Docker Hub username (if using Docker)
- `DOCKER_PASSWORD` - Docker Hub password (if using Docker)

### 4. Deploy CLI Tool (`deploy-cli.yml`)
**Triggers:** Release published or manual dispatch

**What it does:**
- Publishes the CLI tool to npm
- Only runs on releases or manual trigger with version

**Required Secrets:**
- `NPM_TOKEN` - npm authentication token with publish permissions

## Setting Up Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret listed above

### Getting Vercel Credentials

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel login`
3. Run `vercel link` in your project directory
4. Get your credentials:
   - **VERCEL_TOKEN**: Create at [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - **VERCEL_ORG_ID**: Found in `.vercel/project.json` after linking
   - **VERCEL_PROJECT_ID**: Found in `.vercel/project.json` after linking

### Getting npm Token

1. Go to [npmjs.com](https://www.npmjs.com)
2. Sign in and go to **Access Tokens**
3. Create a new token with **Automation** type
4. Copy the token and add it as `NPM_TOKEN` secret

## Workflow Status

You can check workflow status:
- In the **Actions** tab of your GitHub repository
- Via GitHub API
- Via email notifications (if enabled)

## Customization

### Changing Deployment Platforms

To change where the service deploys, edit `.github/workflows/deploy-service.yml` and uncomment the deployment method you want to use.

### Adding Environment Variables

Add environment variables to the workflow files in the `env:` section of the relevant steps.

### Modifying Triggers

Edit the `on:` section at the top of each workflow file to change when workflows run.

## Troubleshooting

### Build Failures
- Check that all dependencies are properly listed in `package.json`
- Verify Node.js version compatibility
- Review build logs in the Actions tab

### Deployment Failures
- Verify all required secrets are set
- Check that deployment platform credentials are valid
- Review deployment logs for specific error messages

### Permission Issues
- Ensure GitHub Actions has write permissions
- Verify token permissions match required scopes
- Check repository settings allow Actions

