# Cursor Web

A Next.js web application that displays the Cursor Experience Project README.md content.

## Features

- Displays README.md content in a clean, text-based format
- Uses JetBrains Mono font for a monospace, developer-friendly appearance
- Converts all markdown links to GitHub repository URLs
- Footer with author information
- Optimized for Vercel deployment

## Development

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

## Deployment

This project is configured for automatic deployment to Vercel on git commits.

The `vercel.json` configuration file in the root directory handles:
- Build command: `cd web && npm install && npm run build`
- Output directory: `web/.next`
- Framework: Next.js

## Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components (MarkdownRenderer, Footer)
- `public/` - Static assets

## Technologies

- Next.js 14+ (App Router)
- React 18
- react-markdown - Markdown rendering
- remark-gfm - GitHub Flavored Markdown support
- TypeScript

