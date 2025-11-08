# Cursor Experience Project

A curated collection of Cursor IDE configurations, rules, and developer experience enhancements.

## 👤 Mobile Team Lead

**Name:** Gurkan Fikret Gunak  
**GitHub:** [@gurkanfikretgunak](https://github.com/gurkanfikretgunak)

## 📋 About

This project contains custom rules, configurations, and best practices for enhancing the development experience in Cursor IDE. It serves as a personal repository for Cursor-specific settings and workflows.

## 📁 Project Structure

```
cursor/
├── .github/        # GitHub templates and workflows
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── SECURITY.md
├── learn/          # Learning resources and configurations
│   ├── mcp/        # Model Context Protocol configurations
│   │   ├── flutter-mcp.json
│   │   └── README.md
│   └── agent/      # Agent configurations
│       ├── flutter-agent.json
│       └── README.md
├── rules/          # Cursor IDE rules and configurations
│   ├── semantic-commits.md
│   ├── flutter-cursor-rules.md
│   ├── project-manager-rules.md
│   ├── product-manager-rules.md
│   ├── devops-engineer-rules.md
│   ├── qa-engineer-rules.md
│   └── tech-lead-rules.md
├── tools/          # Development tools
│   └── cli/        # Gurkan CLI tool (npx gurkan)
│       ├── bin/
│       │   └── gurkan.js
│       ├── package.json
│       └── README.md
├── .cursorrules    # Cursor IDE rules file (Flutter focused)
├── LICENSE         # MIT License
└── README.md       # Project documentation
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
  - **[flutter-mcp.json](learn/mcp/flutter-mcp.json)**: MCP server configuration for Flutter development tools
- **[Agent Configuration](learn/agent/)**: Agent configurations and settings for Cursor IDE
  - **[flutter-agent.json](learn/agent/flutter-agent.json)**: Flutter development agent configuration

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

## 📋 GitHub Templates

This project includes GitHub templates to standardize contributions:

- **[Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)**: Standard template for pull requests with checklists and guidelines
- **[Security Policy](.github/SECURITY.md)**: Security vulnerability reporting guidelines and policy

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note:** This project is designed to enhance the Cursor IDE development experience with custom rules and configurations.

