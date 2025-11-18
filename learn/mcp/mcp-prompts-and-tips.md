# MCP Tips, Tricks & Prompt Guide

This guide explores how to effectively leverage the **Model Context Protocol (MCP)** in Cursor. It covers tips for maximizing efficiency, explains the "power" (force multiplier) behind MCP-aware prompts, and provides 15 concrete examples with detailed breakdowns to supercharge your workflow.

## ⚡ The "Force Side": The Power of MCP

The "Force" of an MCP prompt lies in its ability to bridge the gap between **Static Knowledge** (what the AI was trained on) and **Dynamic Context** (your live project state). It turns Cursor from a **Text Predictor** into an **Active Agent**.

### The Force Multiplier Effect
When you use MCP, you are not just asking a question; you are orchestrating a workflow. The AI acts as a bridge between your intent and your tools.

*   **Without MCP (Static)**: "How do I use the `provider` package?"
    *   *Result*: Generic documentation example. might be outdated.
*   **With MCP (Dynamic)**: "Read `pubspec.yaml` to see my provider version, check `lib/main.dart` for how I set it up, and tell me why `context.read` is failing in `AuthScreen`."
    *   *Result*: Specific debugging based on your actual code structure and version.

**Key Takeaway**: The "Force" comes from **Grounding**. Every answer is grounded in the reality of your codebase, external documentation, or live system status, not just hallucinations.

## 🧬 Anatomy of a Perfect MCP Prompt

To unlock this power, structure your prompts to trigger specific tools. A perfect MCP prompt usually contains four elements:

1.  **The Role** (Optional): Who is the AI? (e.g., "As a Senior Flutter Engineer...")
2.  **The Action (The Tool)**: What specific tool should be used? (e.g., "Search pub.dev", "Run dart analyze", "Read file")
3.  **The Context**: Where should it look? (e.g., "in `lib/auth/`", "checking the git logs")
4.  **The Goal**: What is the tangible output? (e.g., "fix the bug", "generate a report", "refactor the class")

## 🎯 15 MCP Prompt Examples (Expanded)

Here are 15 prompts tailored for a setup with **Flutter**, **GitHub**, and **Filesystem** MCP servers. Each example includes the "Force Side" explanation of what happens behind the scenes.

### 🔍 Exploration & Search

1.  **"Search pub.dev for the top-rated package for handling SVG files, read its documentation, and tell me how to implement it in `IconWidget`."**
    *   *The Force*: **External Knowledge Retrieval**.
    *   *Behind the Scenes*: The agent calls the `pub-dev` tool to search, selects a package, reads its readme, then reads your local `IconWidget` file to generate custom implementation code.

2.  **"Find all defined colors in `theme.dart` and search the entire codebase for hardcoded hex values that should use these variables instead."**
    *   *The Force*: **Semantic Consistency**.
    *   *Behind the Scenes*: Reads `theme.dart` to build a "knowledge bank" of colors, then uses `grep` or semantic search to find patterns like `0xFF...` or `#...` across all files, cross-referencing them.

3.  **"Summarize the open GitHub issues related to 'performance' for this repo and check if any current code in `lib/animations/` might be contributing to them."**
    *   *The Force*: **Contextual Issue Tracking**.
    *   *Behind the Scenes*: Connects to the `github` MCP server to fetch issues filtered by label/keyword, summarizes them, and then reads your local `lib/animations` directory to look for code patterns mentioned in the issues.

### 🐛 Debugging & Fixing

4.  **"Run `dart analyze` on the current file. For every error found, read the relevant documentation or definition, and propose a fix."**
    *   *The Force*: **Autonomous Diagnostics**.
    *   *Behind the Scenes*: Executes the terminal command `dart analyze`. It parses the output (error codes), searches for those codes or reads the specific lines in the file, and synthesizes a fix.

5.  **"I'm seeing a 'RenderFlex overflow' error. Analyze the widget tree in `ProfileScreen`, check the parent constraints, and suggest a scrollable layout fix."**
    *   *The Force*: **Structural Analysis**.
    *   *Behind the Scenes*: Reads `ProfileScreen` (and likely its parent widgets if accessible) to build a mental model of the widget tree. It identifies unconstrained height/width issues and proposes wrapping in `SingleChildScrollView` or `Expanded`.

6.  **"Check the recent git logs for `auth_service.dart` to see who changed the login logic last, and compare it with the current version to find why the token is null."**
    *   *The Force*: **Temporal Debugging**.
    *   *Behind the Scenes*: Uses `git log` and `git diff` on the specific file to trace changes over time, helping identify exactly which commit introduced the regression.

### 🔨 Refactoring & Development

7.  **"Read `lib/api/client.dart` and generate a corresponding Unit Test file using `mockito` in `test/api/client_test.dart`. Ensure all public methods are covered."**
    *   *The Force*: **Mirror Generation**.
    *   *Behind the Scenes*: Reads the source file to understand the API surface (methods, return types). It then creates a new file following the standard Flutter test structure, importing necessary mocking libraries.

8.  **"Rename the `User` class to `AppUser` across the entire project. Ensure you update all imports, variable names, and comments referencing it."**
    *   *The Force*: **Global Consistency**.
    *   *Behind the Scenes*: Performs a project-wide search-and-replace. Unlike a simple text editor replace, it can understand context to avoid replacing partial matches (like `UserPreferences`) if not intended.

9.  **"Create a new feature branch 'feature/dark-mode'. Then, analyze `colors.dart` and generate a `dark_theme.dart` file that mirrors the keys but with dark mode palette values."**
    *   *The Force*: **Workflow Automation**.
    *   *Behind the Scenes*: Chains `git checkout -b` command with file reading (`colors.dart`) and creative file writing (`dark_theme.dart`), maintaining the exact structure of the original keys.

### 📚 Documentation & Understanding

10. **"Read the entire `lib/features/payment/` directory and generate a `README.md` inside it explaining the payment flow, dependencies, and key classes."**
    *   *The Force*: **Synthesis**.
    *   *Behind the Scenes*: recursively lists and reads files in the directory, abstracts the logic into a narrative flow, and writes a formatted Markdown file.

11. **"Look at the `pubspec.yaml`. For every dependency, fetch its latest version from pub.dev and create a report of which packages are outdated and what breaking changes exist."**
    *   *The Force*: **Dependency Intelligence**.
    *   *Behind the Scenes*: Parses `pubspec.yaml` to get package names/versions. Loops through them querying the `pub-dev` MCP tool for latest versions/changelogs, and compiles a comparison report.

12. **"Explain how `AuthGuard` works by tracing its usage in `app_router.dart` and checking the state management logic in `auth_provider.dart`."**
    *   *The Force*: **Deep Tracing**.
    *   *Behind the Scenes*: Simulates a "Jump to Definition" action mentally. It reads the definition, then finds usages, then reads those files, connecting the dots between definition, implementation, and state changes.

### 🧪 Testing & QA

13. **"Run `flutter test`. If any test fails, read the failure log, locate the failing test file, and the code it tests, then explain why it failed."**
    *   *The Force*: **Self-Correction Loop**.
    *   *Behind the Scenes*: Runs the test command. If exit code != 0, it captures the stdout, parses the failing test path, reads that file, and analyzes the assertion logic against the implementation.

14. **"Analyze the `login` function. Generate 5 edge-case inputs (e.g., null, empty string, emoji) and write a test case for each to verify robustness."**
    *   *The Force*: **Adversarial Thinking**.
    *   *Behind the Scenes*: Analyzes the function signature and logic to find weak points (lack of null checks, regex validation). It then generates specific inputs designed to break that logic and wraps them in test code.

15. **"Check the GitHub Actions status for the last commit. If the build failed, analyze the build logs and point me to the file causing the break."**
    *   *The Force*: **CI/CD Integration**.
    *   *Behind the Scenes*: Connects to the `github` MCP server to read pipeline runs. It parses the raw log output of the failed job to extract the error message and file path.

## 💡 Tips & Tricks for MCP Mastery

1.  **Explicit Tool Invocation**: While Cursor is smart, sometimes it helps to explicitly mention the tool or action you want. Instead of "Fix this," try "Run the **analyzer** and fix the errors."
2.  **Context is King**: MCP allows the AI to fetch context dynamically. Don't paste large files; instead, tell the agent *where* to look. "Check `lib/main.dart` and suggested relevant widgets."
3.  **Chain Your Requests**: MCP agents can perform multi-step actions. You can ask for a search, followed by a read, followed by a refactor in a single prompt.
4.  **Verify External Data**: When using tools like `pub-dev` or `github`, ask the agent to summarize what it found before implementing changes to ensure it pulled the right version or issue.
5.  **Refresh Connections**: If a tool seems stuck or context is stale, use the "Restart MCP Servers" command in Cursor settings to refresh the connection.
