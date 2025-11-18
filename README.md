# Cursor Experience Project

A curated collection of Cursor IDE configurations, rules, and developer experience enhancements.

## 👤 Mobile Team Lead

**Name:** Gurkan Fikret Gunak  
**GitHub:** [@gurkanfikretgunak](https://github.com/gurkanfikretgunak)

## 📋 About

This project contains custom rules, configurations, and best practices for enhancing the development experience in Cursor IDE. It serves as a personal repository for Cursor-specific settings and workflows.

## 🚀 Projects Built with Cursor

These projects were developed and built using Cursor IDE, showcasing the power of AI-assisted development:

### Share Your Note

**Live:** [share-your-note.vercel.app](https://share-your-note.vercel.app/) | **Source:** [GitHub](https://github.com/gurkanfikretgunak/share-your-note)

A real-time event participation platform where attendees can join events managed by hosts to share notes, images, and emotions in real-time. Features include QR code-based event joining, host dashboard for event management, and live interaction capabilities.

**Tech Stack:** Next.js, Supabase, TypeScript

### Developer Candidate

**Live:** [developer-candicate.vercel.app](https://developer-candicate.vercel.app/) | **Source:** [GitHub](https://github.com/gurkanfikretgunak/developer-candicate)

An open-source hiring platform that standardizes the hiring process by measuring technical and behavioral competencies. Features include standardized evaluation methodology, department-based technical criteria, a 4-step detailed assessment process, and data-driven hiring decisions.

**Tech Stack:** Modern web technologies

### MasterFabric Welcome

**Live:** [welcome.masterfabric.co](https://welcome.masterfabric.co/) | **Source:** [GitHub](https://github.com/gurkanfikretgunak/welcome)

An open-source developer onboarding and internal ops portal that consolidates developer onboarding, worklogs, event management, and support into one place. Features include GitHub-based authentication, dynamic onboarding checklists, worklog tracking, internal event management, integrated support ticket system, and company email verification (OTP).

**Tech Stack:** Next.js 15, React 19, TypeScript, Supabase, Tailwind CSS, Sentry

### Developer Manifesto

**Live:** [manifesto.masterfabric.co](https://manifesto.masterfabric.co/) | **Source:** [GitHub](https://github.com/gurkanfikretgunak/manifesto)

A minimalist Next.js website for publishing developer manifestos with clean typography, interactive 3D animations, and GitHub-based signature system. Features include Markdown-driven content, JetBrains Mono typography, interactive Three.js animations with mouse interactions, GitHub authentication, dynamic signature system with Supabase, public RESTful API, and SEO optimization.

**Tech Stack:** Next.js 15+, TypeScript, TailwindCSS, Three.js with React Three Fiber, Supabase, Gray Matter, Remark

### PathBunny

**Source:** [GitHub](https://github.com/gurkanfikretgunak/pathbunny)

A lightning-fast CLI tool for creating directory shortcuts in your terminal. Jump to any directory instantly with memorable shortcuts instead of typing long paths. Features include quick navigation with aliases, persistent shortcuts storage, cross-platform support (macOS/Linux), and easy installation via npm.

**Tech Stack:** TypeScript, Node.js, Shell Scripts

---

These projects demonstrate how Cursor IDE can accelerate development workflows and help create production-ready applications efficiently.

## 📁 Project Structure

```
cursor/
├── learn/                    # Learning resources and configurations
│   ├── mcp/                  # Model Context Protocol configurations
│   │   ├── flutter-mcp.json
│   │   ├── mcp-servers.md
│   │   └── README.md
│   ├── agent/                # Agent configurations
│   │   ├── flutter-agent.json
│   │   └── README.md
│   └── extensions/           # Extension guides
│       └── remote-ssh.md
├── rules/                    # Cursor IDE rules and configurations
│   ├── semantic-commits.md
│   ├── flutter-cursor-rules.md
│   ├── project-manager-rules.md
│   ├── product-manager-rules.md
│   ├── devops-engineer-rules.md
│   ├── qa-engineer-rules.md
│   ├── tech-lead-rules.md
│   └── ai-efficiency-rules.md
├── tools/                    # Development tools
│   └── cli/                  # Gurkan CLI tool (npx gurkan)
│       ├── bin/
│       │   └── gurkan.js
│       ├── package.json
│       ├── PUBLISH.md
│       └── README.md
├── web/                      # Next.js web application
│   ├── app/                  # Next.js app directory
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── redirect/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/           # React components
│   │   ├── BlurTransition.tsx
│   │   ├── Footer.tsx
│   │   ├── LinkInterceptor.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   ├── MatrixRain.tsx
│   │   └── SplashScreen.tsx
│   ├── lib/                  # Utility libraries
│   │   └── git.ts            # Git commit information utilities
│   ├── scripts/              # Build scripts
│   │   └── copy-readme.js   # Script to copy README.md for build
│   ├── public/               # Static assets
│   │   └── images/          # Image assets
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── instrumentation.ts
│   ├── sentry.client.config.ts
│   ├── sentry.edge.config.ts
│   ├── sentry.server.config.ts
│   ├── SENTRY_SETUP.md
│   └── README.md
├── .cursorrules.example        # Cursor IDE rules file example (Flutter focused)
├── vercel.json                  # Vercel deployment configuration
├── LICENSE                      # MIT License
└── README.md                    # Project documentation
```

## 🚀 Getting Started

1. Clone this repository
2. Explore the `rules/` directory for Cursor IDE configurations
3. Customize the rules according to your development needs

## 🛠️ Tools

### CLI Tool

A personal CLI tool that can be run via `npx`:

```bash
npx gurkan
```

This displays information about Gurkan Fikret Gunak including skills, contact information, and more.

**Location**: [tools/cli/](tools/cli/)

**Documentation**:
- **[README.md](tools/cli/README.md)**: CLI tool usage and documentation
- **[PUBLISH.md](tools/cli/PUBLISH.md)**: Publishing guide for npm package

**Usage**:
- `npx gurkan` - Display full information
- `npx gurkan --skills` - Show skills only
- `npx gurkan --contact` - Show contact info
- `npx gurkan --repos` - Show repositories (masterfabric, masterfabric-mobile)
- `npx gurkan --masterfabric` - Show Masterfabric company info
- `npx gurkan --github` - Open GitHub profile
- `npx gurkan --help` - Show help

## 📚 Learning Resources

The `learn/` directory contains learning resources and configurations:

- **[MCP Configuration](learn/mcp/)**: Model Context Protocol configurations for Flutter developers
  - **[mcp-servers.md](learn/mcp/mcp-servers.md)**: Comprehensive guide to MCP servers in Cursor IDE (based on [official Cursor documentation](https://cursor.com/docs/context/mcp#servers))
  - **[flutter-mcp.json](learn/mcp/flutter-mcp.json)**: MCP server configuration for Flutter development tools
  - **[README.md](learn/mcp/README.md)**: MCP setup guide for Flutter developers
- **[Agent Configuration](learn/agent/)**: Agent configurations and settings for Cursor IDE
  - **[flutter-agent.json](learn/agent/flutter-agent.json)**: Flutter development agent configuration
- **[Extension Guides](learn/extensions/)**: Guides for essential extensions
  - **[remote-ssh.md](learn/extensions/remote-ssh.md)**: Guide to using Remote - SSH for remote development

## 📝 Rules Directory

The `rules/` directory contains Cursor IDE-specific rules and configurations that help streamline your development workflow.

### Available Rules

- **[semantic-commits.md](rules/semantic-commits.md)**: Guidelines for writing semantic commit messages following conventional commit standards
- **[flutter-cursor-rules.md](rules/flutter-cursor-rules.md)**: Comprehensive Cursor rules for Flutter senior engineers covering architecture, best practices, and code quality standards
- **[project-manager-rules.md](rules/project-manager-rules.md)**: Comprehensive Cursor rules for project managers covering planning, communication, risk management, agile methodologies, and leadership best practices
- **[product-manager-rules.md](rules/product-manager-rules.md)**: Comprehensive Cursor rules for product managers covering product strategy, requirements, prioritization, metrics, and stakeholder management
- **[devops-engineer-rules.md](rules/devops-engineer-rules.md)**: Comprehensive Cursor rules for DevOps engineers covering infrastructure as code, CI/CD, monitoring, security, and automation best practices
- **[qa-engineer-rules.md](rules/qa-engineer-rules.md)**: Comprehensive Cursor rules for QA engineers covering test planning, automation, bug reporting, quality metrics, and collaboration best practices
- **[tech-lead-rules.md](rules/tech-lead-rules.md)**: Comprehensive Cursor rules for tech leads covering technical leadership, team management, architecture decisions, code reviews, and process improvement
- **[ai-efficiency-rules.md](rules/ai-efficiency-rules.md)**: Comprehensive rules for efficient AI prompt usage and code execution, focusing on minimizing token consumption, direct code implementation over planning, and orchestrating time and process consumption efficiently

## 🌐 Web Application

The `web/` directory contains a Next.js web application that displays this project's content:

- **Framework**: Next.js 14+ with App Router
- **Styling**: Custom CSS with mobile-first responsive design
- **Features**:
  - Pixel-style blur-to-clear page transitions
  - Redirect page with 3-second countdown for external links
  - Mobile-optimized responsive layout
  - Markdown content rendering
  - Splash screen animation with Matrix-style effects
  - **Error Tracking & Analytics**: Integrated with Sentry for error monitoring and performance analytics

**Location**: [web/](web/)

**Deployment**: Configured for Vercel deployment via `vercel.json`

**Monitoring**: Error tracking and analytics powered by [Sentry](https://sentry.io)

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note:** This project is designed to enhance the Cursor IDE development experience with custom rules and configurations.

