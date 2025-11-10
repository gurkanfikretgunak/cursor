# MCP Configuration for Flutter Developers

This folder contains Model Context Protocol (MCP) configurations for Flutter developers using Cursor IDE.

## What is MCP?

Model Context Protocol (MCP) is a protocol that enables AI assistants to securely access external tools and data sources. It allows Cursor to interact with Flutter-specific tools, package repositories, and development resources.

## Configuration Files

### flutter-mcp.json

This configuration file includes MCP servers for Flutter development:

- **flutter-tools**: Flutter SDK tools and commands
- **dart-analyzer**: Dart language analysis and linting
- **pub-dev**: Access to pub.dev package repository
- **github**: GitHub integration for repositories and issues
- **filesystem**: File system access for project files

## Setup Instructions

1. **Copy the configuration**:
   ```bash
   cp learn/mcp/flutter-mcp.json ~/.cursor/mcp.json
   ```

2. **Set environment variables** (optional but recommended):
   ```bash
   export FLUTTER_SDK_PATH="/path/to/flutter"
   export DART_SDK_PATH="/path/to/dart"
   export GITHUB_TOKEN="your_github_token"
   ```

3. **Restart Cursor IDE** to load the MCP configuration.

4. **Verify installation**:
   - Open Cursor Settings
   - Navigate to MCP settings
   - Verify all servers are configured correctly

## Environment Variables

### Required
- None (servers will use default paths if not set)

### Optional
- `FLUTTER_SDK_PATH`: Path to Flutter SDK installation
- `DART_SDK_PATH`: Path to Dart SDK installation
- `GITHUB_TOKEN`: GitHub personal access token for GitHub integration

## Customization

You can customize the configuration by:

1. **Adding custom paths**: Update the filesystem server path to your project directory
2. **Adding more servers**: Add additional MCP servers as needed
3. **Configuring environment variables**: Set specific paths or tokens

## Troubleshooting

### MCP servers not connecting
- Verify Node.js and npm are installed
- Check that server packages are available on npm
- Review Cursor logs for connection errors

### Flutter tools not working
- Ensure Flutter SDK is installed and in PATH
- Set `FLUTTER_SDK_PATH` environment variable
- Verify Flutter installation: `flutter doctor`

### GitHub integration issues
- Generate a GitHub personal access token
- Set `GITHUB_TOKEN` environment variable
- Ensure token has necessary permissions

## Resources

- **[MCP Servers Guide](mcp-servers.md)**: Comprehensive guide to MCP servers in Cursor IDE based on [official Cursor documentation](https://cursor.com/docs/context/mcp#servers)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Cursor MCP Documentation](https://cursor.com/docs/context/mcp#servers)
- [Flutter Documentation](https://flutter.dev/docs)

## Notes

- Update the filesystem path in the configuration to match your project directory
- Keep your GitHub token secure and never commit it to version control
- Regularly update MCP server packages for latest features and fixes

