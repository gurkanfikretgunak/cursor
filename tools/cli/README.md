# Gurkan CLI

CLI tool to get information about **Gurkan Fikret Gunak** — AI | Mobile Team Lead at Ticimax, Open Source Development Lead at MasterFabric, SpaceXAI Ambassador, MasterFabric Academy.

## Installation

Run directly via `npx` (no installation required):

```bash
npx gurkan
```

Or install globally:

```bash
npm install -g gurkan
gurkan
```

## Usage

```bash
# Display full information (English)
npx gurkan

# Turkish version
npx gurkan -tr
npx gurkan --tr

# With npm start (use -- to pass args to script)
npm start -- -tr
npm run start:tr

# Show help
npx gurkan --help

# Show skills only
npx gurkan --skills

# Show contact information
npx gurkan --contact

# Show repositories
npx gurkan --repos

# Show MasterFabric company information
npx gurkan --masterfabric

# Show MasterFabric open source projects
npx gurkan --opensource

# Open GitHub profile in browser
npx gurkan --github

# Show version
npx gurkan --version
```

## Options

| Option | Description |
|--------|-------------|
| `--help, -h` | Show help message |
| `--tr, -tr` | Turkish version (labels & content) |
| `--github, -g` | Open GitHub profile in browser |
| `--skills, -s` | Display skills only |
| `--contact, -c` | Display contact information only |
| `--repos, -r` | Show repositories information |
| `--projects, -p` | Alias for --repos |
| `--masterfabric, -m` | Show MasterFabric company information |
| `--opensource, -o` | Show MasterFabric open source projects |
| `--version, -v` | Show version number |

## Features

### Multi-language
- **English** (default)
- **Turkish** (`-tr` or `--tr`) — labels, skills, interests, about sections

### Company Information
- **Ticimax** — Turkey's leading e-commerce platform. 14,000+ companies. Omnichannel, B2B, marketplace integrations.
- **MasterFabric** — AI-powered product development, education, open source first. Flutter, BaaS platforms, developer tools.

### Roles
- AI | Mobile Team Lead
- Ticimax Mobile Team Lead
- MasterFabric Open Sourced Development Lead

### Volunteer
- **SpaceXAI Ambassador** — Community program: documentation, events, hackathon/workshop, workflow optimization
- **MasterFabric Academy** — Volunteer, free education track
  - Website: [academy.masterfabric.co](https://academy.masterfabric.co)
  - Curriculum / MCP: [masterfabric/one-hundered-days](https://github.com/masterfabric/one-hundered-days)
  - Certificates & progress: [academy-app.masterfabric.co](https://academy-app.masterfabric.co)

### Repositories
- **masterfabric** — Core platform and infrastructure
- **masterfabric-mobile** — Flutter-based mobile application
- **one-hundered-days** — MasterFabric Academy curriculum and education MCP

### Open Source Projects
- MasterFabric Platform — Self-hosted BaaS platform
- OSMEA — Mobile E-commerce Architecture Framework
- MasterFabric Welcome — Developer onboarding portal
- Developer Manifesto — Manifesto publishing platform
- MasterFabric Academy — Free volunteer education track with MCP curriculum

## Examples

```bash
# Full info in English
npx gurkan

# Full info in Turkish
npx gurkan -tr

# Skills in Turkish
npx gurkan --skills -tr

# Contact info
npx gurkan --contact

# Learn about MasterFabric
npx gurkan --masterfabric
```

## Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Or directly
node bin/gurkan.js

# Test Turkish
node bin/gurkan.js -tr
npm run start:tr

# Test name & bio table
node bin/gurkan.js --test
npm run start:test
```

### Test before publishing

```bash
npm link
gurkan
gurkan -tr
```

## Dependencies

- **chalk** — Terminal string styling
- **boxen** — Create boxes in terminal

## Publishing

```bash
npm login
npm version patch
npm publish
```

## License

MIT

## Author

Gurkan Fikret Gunak — [Ticimax](https://ticimax.com) · [MasterFabric](https://masterfabric.co) · [MasterFabric Academy](https://academy.masterfabric.co)
