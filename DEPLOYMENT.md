# Deployment Guide

This guide explains how to deploy the Cursor project components using GitHub Actions.

## Overview

The project consists of three main components:
1. **Web Application** (`web/`) - Next.js app deployed to Vercel
2. **Auth Service** (`service/`) - Fastify backend service
3. **CLI Tool** (`tools/cli/`) - npm package

## Quick Start

### 1. Set Up GitHub Secrets

Go to your repository → **Settings** → **Secrets and variables** → **Actions** and add the required secrets.

#### For Web App (Vercel)
```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
SLACK_WEBHOOK_URL=your_slack_webhook_url  # Optional: For deployment notifications
```

#### For Service (choose your platform)
- **Railway**: `RAILWAY_TOKEN`
- **Render**: `RENDER_SERVICE_ID`, `RENDER_API_KEY`
- **Docker Hub**: `DOCKER_USERNAME`, `DOCKER_PASSWORD`
- **SSH Server**: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`

#### For CLI Tool
```bash
NPM_TOKEN=your_npm_token
```

### 2. Configure Workflows

Workflows are already set up in `.github/workflows/`. You may need to:
- Uncomment the deployment method you want in `deploy-service.yml`
- Adjust environment variables in `deploy-web.yml`

### 3. Deploy

- **Web App**: Push to `main` branch (changes in `web/` directory)
- **Service**: Push to `main` branch (changes in `service/` directory)
- **CLI**: Create a GitHub release

## Detailed Setup

### Web Application (Vercel)

#### Getting Vercel Credentials

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Link your project:
   ```bash
   cd web
   vercel link
   ```

3. Get your credentials:
   - **VERCEL_TOKEN**: Create at [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**: Found in `.vercel/project.json`

4. Add secrets to GitHub:
   - Go to repository Settings → Secrets → Actions
   - Add all Vercel-related secrets

#### Environment Variables

Add these in Vercel dashboard or as GitHub secrets:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `VERCEL_WEBHOOK_SECRET`

#### Slack Notifications (Optional)

The web deployment workflow includes Slack notifications for successful and failed deployments.

**Setting up Slack Webhook:**

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Create a new app or select an existing one
3. Go to **Incoming Webhooks** and activate it
4. Click **Add New Webhook to Workspace**
5. Select the channel where you want notifications
6. Copy the webhook URL
7. Add `SLACK_WEBHOOK_URL` to your GitHub secrets

**Notification includes:**
- Version number from `package.json`
- Deployment URL
- Commit information
- Deployer information
- Quick action buttons (View Deployment, View Commit, View Workflow)

### Auth Service

#### Option 1: Railway

1. Create a Railway account and project
2. Get your Railway token from [railway.app/account](https://railway.app/account)
3. Add `RAILWAY_TOKEN` to GitHub secrets
4. Uncomment Railway deployment section in `deploy-service.yml`

#### Option 2: Render

1. Create a Render account and web service
2. Get your API key from [dashboard.render.com](https://dashboard.render.com)
3. Add `RENDER_SERVICE_ID` and `RENDER_API_KEY` to GitHub secrets
4. Uncomment Render deployment section in `deploy-service.yml`

#### Option 3: Docker (Docker Hub or GHCR)

**Docker Hub:**
1. Create Docker Hub account
2. Add `DOCKER_USERNAME` and `DOCKER_PASSWORD` to GitHub secrets
3. Uncomment Docker Hub section in `deploy-service.yml`

**GitHub Container Registry (GHCR):**
1. No additional setup needed (uses `GITHUB_TOKEN`)
2. Uncomment GHCR section in `deploy-service.yml`
3. Image will be available at `ghcr.io/your-username/your-repo/auth-service:latest`

#### Option 4: SSH/Your Own Server

1. Set up SSH access to your server
2. Add `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` to GitHub secrets
3. Uncomment SSH deployment section in `deploy-service.yml`
4. Adjust target path if needed

#### Environment Variables for Service

Set these in your deployment platform:
```bash
DATABASE_URL=postgresql://user:password@host:port/dbname
PORT=4000
HOST=0.0.0.0
NODE_ENV=production
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-service-url.com
CORS_ORIGIN=https://your-web-app-url.com
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### CLI Tool

#### Publishing to npm

1. Create npm account (if you don't have one)
2. Create an automation token at [npmjs.com/settings/your-username/tokens](https://www.npmjs.com/settings/your-username/tokens)
3. Add `NPM_TOKEN` to GitHub secrets
4. Create a GitHub release to trigger publishing

#### Manual Publishing

```bash
cd tools/cli
npm version patch  # or minor, major
npm publish --access public
```

## Local Development

### Running with Docker Compose

```bash
cd service
docker-compose up -d
```

### Running Manually

**Web App:**
```bash
cd web
npm install
npm run dev
```

**Service:**
```bash
cd service
npm install
npm run dev
```

## Monitoring Deployments

- Check workflow status in GitHub Actions tab
- View deployment logs in the Actions tab
- Set up notifications in repository settings

## Troubleshooting

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Review build logs in Actions tab

### Deployment Failures
- Verify all secrets are set correctly
- Check deployment platform credentials
- Review deployment logs for specific errors

### Environment Variable Issues
- Ensure variables are set in deployment platform
- Check variable names match exactly
- Verify sensitive values are not exposed in logs

## Security Best Practices

1. **Never commit secrets** - Always use GitHub Secrets
2. **Use least privilege** - Only grant necessary permissions to tokens
3. **Rotate secrets regularly** - Update tokens periodically
4. **Review workflow logs** - Check for exposed sensitive data
5. **Use environment-specific configs** - Separate dev/staging/prod

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

