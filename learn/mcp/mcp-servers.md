# MCP Servers - Cursor Documentation Resource

This document provides comprehensive information about Model Context Protocol (MCP) servers in Cursor IDE, based on the [official Cursor documentation](https://cursor.com/docs/context/mcp#servers).

## What are MCP Servers?

MCP (Model Context Protocol) servers are external services that extend Cursor's capabilities by providing access to tools, data sources, and APIs. They enable AI assistants to securely interact with external resources beyond the codebase.

## MCP Server Configuration

MCP servers are configured in Cursor's settings file, typically located at `~/.cursor/mcp.json` or in your project's configuration.

### Configuration Structure

```json
{
  "mcpServers": {
    "server-name": {
      "command": "command-to-run",
      "args": ["arg1", "arg2"],
      "env": {
        "ENV_VAR": "value"
      }
    }
  }
}
```

### Configuration Options

- **command**: The command to execute the MCP server (e.g., `npx`, `node`, `python`)
- **args**: Array of arguments to pass to the command
- **env**: Environment variables to set for the server

## Available MCP Servers

### Official MCP Servers

Cursor supports various official MCP servers that can be easily integrated:

#### 1. Filesystem Server
Provides file system access for reading and writing files.

```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/path/to/directory"
    ]
  }
}
```

#### 2. GitHub Server
Enables GitHub integration for repositories, issues, and pull requests.

```json
{
  "github": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-github"
    ],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
    }
  }
}
```

#### 3. Flutter Server
Provides Flutter SDK tools and commands.

```json
{
  "flutter-tools": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-flutter"
    ],
    "env": {
      "FLUTTER_SDK_PATH": "/path/to/flutter"
    }
  }
}
```

#### 4. Dart Server
Dart language analysis and tooling.

```json
{
  "dart-analyzer": {
    "command": "dart",
    "args": [
      "run",
      "mcp_server_dart"
    ],
    "env": {
      "DART_SDK_PATH": "/path/to/dart"
    }
  }
}
```

#### 5. Pub.dev Server
Access to pub.dev package repository.

```json
{
  "pub-dev": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-pub-dev"
    ]
  }
}
```

## Adding MCP Servers to Cursor

### Method 1: Manual Configuration

1. **Locate or create the MCP configuration file**:
   - macOS/Linux: `~/.cursor/mcp.json`
   - Windows: `%APPDATA%\Cursor\mcp.json`

2. **Add your server configuration** to the `mcpServers` object

3. **Restart Cursor IDE** to load the new configuration

### Method 2: Using "Add to Cursor" Button

Many MCP servers provide an "Add to Cursor" button that automatically configures the server:

1. Visit the MCP server's documentation page
2. Click the "Add to Cursor" button
3. Confirm the installation in Cursor
4. The server will be automatically added to your configuration

### Method 3: Project-Specific Configuration

You can also configure MCP servers per project by creating a `.cursor/mcp.json` file in your project root:

```json
{
  "mcpServers": {
    "project-specific-server": {
      "command": "npx",
      "args": ["-y", "@your/package"]
    }
  }
}
```

## Environment Variables

MCP servers often require environment variables for authentication or configuration:

### Common Environment Variables

- `GITHUB_PERSONAL_ACCESS_TOKEN`: GitHub API token
- `FLUTTER_SDK_PATH`: Path to Flutter SDK
- `DART_SDK_PATH`: Path to Dart SDK
- `OPENAI_API_KEY`: OpenAI API key (if using OpenAI servers)
- `ANTHROPIC_API_KEY`: Anthropic API key (if using Anthropic servers)

### Setting Environment Variables

#### macOS/Linux
```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="your_token"
export FLUTTER_SDK_PATH="/path/to/flutter"
```

#### Windows (PowerShell)
```powershell
$env:GITHUB_PERSONAL_ACCESS_TOKEN="your_token"
$env:FLUTTER_SDK_PATH="C:\path\to\flutter"
```

#### In Configuration File
You can also set environment variables directly in the MCP configuration:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## Verifying MCP Server Installation

1. **Open Cursor Settings**:
   - macOS: `Cmd + ,`
   - Windows/Linux: `Ctrl + ,`

2. **Navigate to MCP Settings**:
   - Look for "MCP" or "Model Context Protocol" in settings

3. **Check Server Status**:
   - Verify all configured servers are listed
   - Check connection status (connected/disconnected)
   - Review any error messages

4. **Test Server Functionality**:
   - Use Cursor's chat interface
   - Ask questions that require the MCP server
   - Verify responses indicate server usage

## Troubleshooting

### Server Not Connecting

**Symptoms**: Server shows as disconnected in settings

**Solutions**:
- Verify Node.js/npm is installed: `node --version` and `npm --version`
- Check server package exists: `npm view @modelcontextprotocol/server-filesystem`
- Review Cursor logs for connection errors
- Ensure command and args are correct in configuration

### Authentication Errors

**Symptoms**: Server connects but returns authentication errors

**Solutions**:
- Verify environment variables are set correctly
- Check token permissions and expiration
- Regenerate tokens if necessary
- Ensure tokens are not expired or revoked

### Command Not Found

**Symptoms**: Error message about command not being found

**Solutions**:
- Verify the command exists in your PATH
- Use full paths for commands if needed
- Check that required packages are installed globally
- Use `npx` for npm packages to avoid global installation

### Permission Errors

**Symptoms**: Server cannot access files or resources

**Solutions**:
- Check file system permissions
- Verify paths are correct and accessible
- Review restricted paths in Cursor settings
- Ensure user has necessary permissions

## Best Practices

### Security

1. **Never commit tokens or secrets** to version control
2. **Use environment variables** for sensitive data
3. **Restrict server access** to necessary directories only
4. **Regularly rotate** API tokens and keys
5. **Review server permissions** periodically

### Performance

1. **Limit server scope** to necessary directories
2. **Use project-specific configurations** when possible
3. **Monitor server resource usage**
4. **Disable unused servers** to reduce overhead

### Organization

1. **Group related servers** in configuration
2. **Document custom configurations** in project README
3. **Use descriptive server names**
4. **Keep configurations version controlled** (without secrets)

## Creating Custom MCP Servers

You can create custom MCP servers to extend Cursor's capabilities:

1. **Follow MCP Protocol**: Implement the Model Context Protocol specification
2. **Use MCP SDK**: Leverage official MCP SDKs for your language
3. **Document Your Server**: Provide clear documentation and examples
4. **Test Thoroughly**: Ensure your server works correctly with Cursor
5. **Share Your Server**: Consider publishing to npm or other package managers

## Resources

### Official Documentation

- [Cursor MCP Documentation](https://cursor.com/docs/context/mcp#servers)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP Server Examples](https://github.com/modelcontextprotocol/servers)

### Related Resources

- [Flutter MCP Configuration](../mcp/flutter-mcp.json): Flutter-specific MCP server configuration
- [MCP README](../mcp/README.md): Detailed MCP setup guide for Flutter developers

### Community

- [MCP GitHub Repository](https://github.com/modelcontextprotocol)
- [Cursor Community](https://cursor.sh/community)
- [MCP Discord](https://discord.gg/modelcontextprotocol)

## Example: Complete MCP Configuration

Here's a complete example configuration with multiple servers:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/projects"
      ]
    },
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "flutter-tools": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-flutter"
      ],
      "env": {
        "FLUTTER_SDK_PATH": "${FLUTTER_SDK_PATH:-}"
      }
    },
    "pub-dev": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-pub-dev"
      ]
    }
  }
}
```

## Updates and Maintenance

- **Keep servers updated**: Regularly update MCP server packages
- **Monitor for changes**: Check Cursor documentation for updates
- **Review configurations**: Periodically review and optimize configurations
- **Test after updates**: Verify functionality after updating servers

---

**Last Updated**: Based on Cursor documentation as of 2024  
**Source**: [Cursor MCP Documentation](https://cursor.com/docs/context/mcp#servers)

