# Cursor Agent Configurations

This folder contains agent configurations and settings for Cursor IDE's AI agent capabilities.

## What are Cursor Agents?

Cursor Agents are AI-powered assistants that can autonomously perform tasks in your codebase, such as:
- Writing and modifying code
- Running commands and tests
- Searching and reading files
- Making multiple file changes
- Executing complex workflows

Agents work alongside Cursor's chat and Composer features to provide more autonomous assistance.

## Available Configurations

- **[flutter-agent.json](flutter-agent.json)**: Flutter development agent configuration with conservative settings for code review

## Agent Configuration

### Agent Settings in Cursor

Cursor agents can be configured through:
1. **Cursor Settings** → **Agent** section
2. **Agent configuration files** (JSON format)
3. **Project-specific settings** via `.cursor/agent.json`

### Key Agent Settings

- **Autonomous Mode**: Enable/disable autonomous agent actions
- **File Access**: Control which files agents can read/modify
- **Command Execution**: Allow/disallow running terminal commands
- **Multi-file Changes**: Enable agents to make changes across multiple files
- **Auto-apply Changes**: Automatically apply agent suggestions

## Configuration Files

### Global Agent Configuration

Place agent configuration in Cursor's settings directory:
- **macOS**: `~/Library/Application Support/Cursor/User/agent.json`
- **Windows**: `%APPDATA%\Cursor\User\agent.json`
- **Linux**: `~/.config/Cursor/User/agent.json`

### Project-Specific Configuration

Create `.cursor/agent.json` in your project root for project-specific agent settings:

```json
{
  "agent": {
    "enabled": true,
    "autonomousMode": true,
    "maxFileChanges": 10,
    "allowedCommands": [
      "flutter",
      "dart",
      "git"
    ],
    "restrictedPaths": [
      "node_modules",
      ".git"
    ],
    "autoApply": false
  }
}
```

## Agent Capabilities

### File Operations
- Read files and directories
- Create new files
- Modify existing files
- Delete files (with confirmation)
- Search across codebase

### Code Operations
- Write new code
- Refactor existing code
- Fix bugs
- Add tests
- Update documentation

### Command Execution
- Run build commands
- Execute tests
- Run linters and formatters
- Git operations (with caution)
- Package management commands

## Best Practices

### Security
- **Review agent actions**: Always review what agents plan to do before approval
- **Restrict sensitive paths**: Exclude directories with secrets or credentials
- **Limit command execution**: Only allow necessary commands
- **Use project-specific configs**: Different projects may need different agent settings

### Workflow
- **Start with small tasks**: Test agents on simple tasks first
- **Review changes**: Always review agent-generated code
- **Use version control**: Commit agent changes in small, reviewable chunks
- **Provide clear instructions**: Give agents specific, actionable tasks

### Performance
- **Limit file scope**: Restrict agents to relevant directories
- **Set max file changes**: Prevent agents from making too many changes at once
- **Use autonomous mode wisely**: Enable only when you trust the agent's decisions

## Example Configurations

### Flutter Development Agent

```json
{
  "agent": {
    "enabled": true,
    "autonomousMode": false,
    "maxFileChanges": 5,
    "allowedCommands": [
      "flutter",
      "dart",
      "flutter test",
      "dart format",
      "dart analyze"
    ],
    "restrictedPaths": [
      "build",
      ".dart_tool",
      "ios/Pods",
      "android/.gradle"
    ],
    "preferredPatterns": [
      "lib/**/*.dart",
      "test/**/*.dart"
    ],
    "autoApply": false
  }
}
```

### Conservative Agent (Review Required)

```json
{
  "agent": {
    "enabled": true,
    "autonomousMode": false,
    "maxFileChanges": 3,
    "allowedCommands": [],
    "restrictedPaths": [
      "**/node_modules/**",
      "**/.git/**",
      "**/build/**"
    ],
    "autoApply": false,
    "requireConfirmation": true
  }
}
```

### Autonomous Agent (Advanced)

```json
{
  "agent": {
    "enabled": true,
    "autonomousMode": true,
    "maxFileChanges": 20,
    "allowedCommands": [
      "npm",
      "yarn",
      "git add",
      "git commit"
    ],
    "restrictedPaths": [
      ".env",
      "*.key",
      "*.pem"
    ],
    "autoApply": true,
    "autoCommit": false
  }
}
```

## Usage Tips

### Effective Agent Prompts
- ✅ "Add error handling to the login function"
- ✅ "Refactor this widget to use Provider pattern"
- ✅ "Create unit tests for the UserRepository class"
- ❌ "Fix everything" (too vague)
- ❌ "Make it better" (not actionable)

### Monitoring Agent Actions
- Review the agent's plan before execution
- Check file diffs before applying changes
- Test agent-generated code thoroughly
- Use version control to track agent changes

### Troubleshooting

**Agent not responding:**
- Check agent is enabled in settings
- Verify configuration file syntax
- Restart Cursor IDE

**Agent making unwanted changes:**
- Review restricted paths configuration
- Reduce maxFileChanges limit
- Disable autonomous mode

**Agent not executing commands:**
- Check allowedCommands list
- Verify command paths are correct
- Review command execution permissions

## Integration with MCP

Agents can work alongside MCP (Model Context Protocol) servers:
- Use MCP servers for external data access
- Agents can leverage MCP tools
- Combine agent autonomy with MCP capabilities

See [MCP Configuration](../mcp/README.md) for more details.

## Resources

- [Cursor Agent Documentation](https://cursor.sh/docs/agents)
- [Cursor Settings Guide](https://cursor.sh/docs/settings)
- [Best Practices for AI-Assisted Development](https://cursor.sh/docs/best-practices)

## Notes

- Agent configurations are project-specific when placed in `.cursor/agent.json`
- Always review agent actions before applying
- Keep sensitive paths restricted
- Test agent configurations in safe environments first
- Share effective configurations with your team


