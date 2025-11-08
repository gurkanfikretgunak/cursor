# Semantic Commits Rules

This document outlines the semantic commit message conventions for this project.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to CI configuration files and scripts (example scopes: Travis, Circle, GitHub Actions)
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Scope

The scope is optional and represents the area of the codebase affected by the change. Examples:
- `api`
- `ui`
- `config`
- `rules`
- `docs`

## Subject

- Use imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end
- Maximum 72 characters

## Body

- Use imperative, present tense: "change" not "changed" nor "changes"
- Include motivation for the change and contrast with previous behavior
- Wrap at 72 characters
- Separate from subject with a blank line

## Footer

- Reference issue numbers if applicable
- Format: `Closes #123`, `Fixes #456`, `Related to #789`

## Examples

### Simple commit
```
feat: add semantic commits rules file
```

### Commit with scope
```
feat(rules): add semantic commits documentation
```

### Commit with body
```
fix(api): resolve authentication token expiration

The authentication token was expiring after 1 hour instead of the configured 24 hours. This was caused by incorrect timezone handling in the token generation logic.

Fixes #123
```

### Breaking change
```
feat(api): change authentication endpoint

BREAKING CHANGE: The authentication endpoint has been moved from /auth/login to /api/v2/auth/login. Update your API clients accordingly.

Closes #456
```

## Breaking Changes

If a commit introduces a breaking change, include `BREAKING CHANGE:` in the footer or body section:

```
feat(api): update user authentication flow

BREAKING CHANGE: The login endpoint now requires email instead of username.
```

## Best Practices

1. **Be descriptive**: Write clear, concise commit messages
2. **Use present tense**: "add feature" not "added feature"
3. **Keep it focused**: One logical change per commit
4. **Reference issues**: Link commits to issues when applicable
5. **Review before committing**: Ensure your message follows these conventions

## Tools

Consider using tools to enforce semantic commits:
- **commitlint**: Lint commit messages
- **commitizen**: Interactive commit message builder
- **husky**: Git hooks for pre-commit validation

## References

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)

