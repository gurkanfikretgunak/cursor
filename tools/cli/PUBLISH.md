# Quick Start Guide for Publishing

## Prerequisites

1. **Node.js** (v14 or higher)
2. **npm account** (create at https://www.npmjs.com/signup)

## Steps to Publish

### 1. Navigate to CLI directory

```bash
cd tools/cli
```

### 2. Install dependencies

```bash
npm install
```

### 3. Test locally

```bash
npm start
# or
node bin/gurkan.js
```

### 4. Check package name availability

```bash
npm search gurkan
```

If the name is taken, update `name` in `package.json` to something unique like `gurkan-cli` or `@gurkanfikretgunak/gurkan`.

### 5. Login to npm

```bash
npm login
```

Enter your npm username, password, and email.

### 6. Publish

```bash
npm publish
```

**Note**: If you want to publish as a scoped package (e.g., `@gurkanfikretgunak/gurkan`), use:

```bash
npm publish --access public
```

### 7. Test published package

After publishing, test it:

```bash
npx gurkan
```

## Updating the Package

1. Update version in `package.json`:
   ```json
   "version": "1.0.1"
   ```

2. Publish again:
   ```bash
   npm publish
   ```

## Local Testing with npm link

Before publishing, test locally:

```bash
# In tools/cli directory
npm link

# Now run from anywhere
gurkan
```

## Troubleshooting

### Package name already taken
- Use a scoped package: `@gurkanfikretgunak/gurkan`
- Or choose a different name: `gurkan-cli`, `gurkan-info`, etc.

### Permission errors
- Make sure you're logged in: `npm whoami`
- Check package name availability
- Verify you own the package name

### Publishing fails
- Check `package.json` syntax
- Ensure all required fields are present
- Verify Node.js version compatibility

