# Gurkan CLI Tool

A simple CLI tool to get information about Gurkan Fikret Gunak - Mobile Team Lead and Flutter Developer.

## Installation

This package can be run directly via `npx` without installation:

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
# Display full information
npx gurkan

# Show help
npx gurkan --help

# Show skills only
npx gurkan --skills

# Show contact information
npx gurkan --contact

# Open GitHub profile
npx gurkan --github

# Show version
npx gurkan --version
```

## Options

- `--help, -h` - Show help message
- `--github, -g` - Open GitHub profile in browser
- `--skills, -s` - Display skills only
- `--contact, -c` - Display contact information only
- `--version, -v` - Show version number

## Examples

```bash
# Basic usage
npx gurkan

# Quick skills check
npx gurkan --skills

# Get contact info
npx gurkan --contact
```

## Publishing to npm

To publish this package to npm:

1. **Login to npm**:
   ```bash
   npm login
   ```

2. **Check package name availability**:
   ```bash
   npm search gurkan
   ```

3. **Publish**:
   ```bash
   npm publish
   ```

4. **After publishing**, anyone can run:
   ```bash
   npx gurkan
   ```

## Development

### Local Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Or directly
node bin/gurkan.js
```

### Testing Locally Before Publishing

You can test the package locally using `npm link`:

```bash
# In the package directory
npm link

# Now you can run from anywhere
gurkan
```

## Dependencies

- `chalk` - Terminal string styling
- `boxen` - Create boxes in terminal

## License

MIT

## Author

Gurkan Fikret Gunak

