# Mastering Cursor Rules: Management & Tips

This guide explains how to effectively manage Cursor rules to customize the AI's behavior, along with 20 tips and tricks to supercharge your prompts.

## 🛡️ Managing Rules in Cursor

Cursor rules allow you to define how the AI should behave, code, and respond. You can manage them at different levels:

### 1. Global Rules (User Level)
*   **Scope**: Applies to ALL projects you open in Cursor.
*   **Location**: `Cursor Settings` > `General` > `Rules for AI`.
*   **Use Case**: Your personal coding style preferences (e.g., "Always use TypeScript," "No semi-colons," "Be concise").

### 2. Project Rules (Project Level)
*   **Scope**: Applies only to the current project.
*   **Location**: A file named `.cursorrules` in the root of your project.
*   **Use Case**: Project-specific architecture, tech stack (Flutter, Next.js), and team conventions.
*   **Priority**: Project rules typically override or merge with global rules.

### 3. Modular Rules (The `rules/` Strategy)
*   **Concept**: Instead of one giant `.cursorrules` file, break rules into topics (as seen in this repo's `rules/` directory).
*   **Usage**:
    *   Keep source rules in `rules/*.md`.
    *   Copy relevant sections into `.cursorrules` for active enforcement.
    *   Or, explicitly reference them in prompts: "Follow the guidelines in `rules/qa-engineer-rules.md`."

## 💡 20 Tips, Tricks & Rule Samples

Here are 20 actionable tips and rule snippets to optimize your AI interactions.

### 🧠 Behavior & Personality

1.  **The "No Yapping" Rule**:
    ```markdown
    - Be concise. Do not offer unasked explanations.
    - Skip polite introductions ("Here is the code..."). Just output the code.
    ```
2.  **Role Adoption**:
    ```markdown
    - Act as a Senior Principal Engineer.
    - Focus on scalability, security, and performance.
    - Critique your own code before outputting.
    ```
3.  **Socratic Mode (Teaching)**:
    ```markdown
    - If I ask a "how to" question, explain the *why* before the *how*.
    - Offer 2 alternatives and ask me to choose the trade-off.
    ```
4.  **Language Enforcement**:
    ```markdown
    - Always communicate in English, even if I ask in another language.
    - Translate technical terms only when necessary for clarity.
    ```

### 🏗️ Code Quality & Style

5.  **Strict Typing (TypeScript/Dart)**:
    ```markdown
    - No `any` or `dynamic` types allowed.
    - Create interfaces/types for all API responses.
    ```
6.  **Functional Style**:
    ```markdown
    - Prefer pure functions.
    - Avoid side effects.
    - Use `.map`, `.filter`, `.reduce` over `for` loops.
    ```
7.  **Comment Policy**:
    ```markdown
    - Do NOT comment obvious code (e.g., `// const x = 1`).
    - DO comment "Why" logic decisions and complex algorithms.
    - Use JSDoc/DocComments for public APIs only.
    ```
8.  **Error Handling**:
    ```markdown
    - Never swallow errors with empty `catch` blocks.
    - Wrap external API calls in try/catch.
    - Log errors to Sentry (or console if dev).
    ```
9.  **Naming Conventions**:
    ```markdown
    - Variables: camelCase
    - Classes: PascalCase
    - Constants: SCREAMING_SNAKE_CASE
    - Booleans: prefix with `is`, `has`, `can`.
    ```

### 🛠️ Tech Stack Specifics

10. **Next.js Optimization**:
    ```markdown
    - Use Server Components by default.
    - Add `'use client'` only when hooks/interactivity are needed.
    - Use `next/image` for all images.
    ```
11. **Flutter/Dart Best Practices**:
    ```markdown
    - Use `const` constructors wherever possible.
    - Split large widgets into smaller private widgets.
    - Use `Riverpod` for state management (or your preferred lib).
    ```
12. **Tailwind CSS Order**:
    ```markdown
    - Sort classes: layout > spacing > sizing > typography > visual.
    - Use `clsx` or `cn` for conditional classes.
    ```

### 🔄 Workflow & Process

13. **Test-Driven Development (TDD) Prompt**:
    ```markdown
    - Before writing code, write the test case that fails.
    - Only write enough code to pass the test.
    ```
14. **Security First**:
    ```markdown
    - Never hardcode secrets/API keys. Use `.env`.
    - Validate all inputs (Zod/pydantic).
    - Sanitize SQL queries (no string concatenation).
    ```
15. **Commit Message Format**:
    ```markdown
    - Follow Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`.
    - Max 50 chars for subject.
    - Include "Closes #ISSUE" if applicable.
    ```

### 🚀 Advanced "Meta-Rules"

16. **The "Codebase Specialist"**:
    ```markdown
    - Before answering, check the file structure to understand architecture.
    - Use existing utils in `lib/utils` instead of reinventing wheels.
    ```
17. **Documentation Updater**:
    ```markdown
    - If you change logic, check if `README.md` or `docs/` need updates.
    - Generate a checklist of documentation changes at the end.
    ```
18. **Dependency Check**:
    ```markdown
    - Before importing a new library, check `package.json` if it's installed.
    - Suggest native alternatives before external packages.
    ```
19. **Refactoring Guard**:
    ```markdown
    - When refactoring, ensure backward compatibility.
    - Flag potential breaking changes with ⚠️.
    ```
20. **The "Check Your Work" Loop**:
    ```markdown
    - After generating code, review it for memory leaks or infinite loops.
    - If you find an issue, fix it before showing me the final result.
    ```

## 📝 How to Apply These

1.  **Copy & Paste**: Take the blocks above and paste them into your `.cursorrules` file.
2.  **Contextual Injection**: For temporary needs, paste a rule block into your Chat input: "For this session, follow these rules: [PASTE]".
3.  **Iterate**: Rules are living documents. If the AI keeps making the same mistake, add a rule to prevent it!

