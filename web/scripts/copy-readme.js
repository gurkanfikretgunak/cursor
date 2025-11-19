const fs = require('fs');
const path = require('path');

// Copy from root README.md to web/README.md
// Try multiple possible paths to handle different build environments
const possibleSourcePaths = [
  path.join(__dirname, '../../README.md'), // From web/scripts/ -> web/ -> root/
  path.join(process.cwd(), '../README.md'), // From web/ -> root/ (Vercel with rootDirectory)
  path.join(process.cwd(), 'README.md'), // If already at root (Vercel without rootDirectory)
];

const destPath = path.join(__dirname, '../README.md');

let copied = false;

for (const sourcePath of possibleSourcePaths) {
  try {
    if (fs.existsSync(sourcePath)) {
      const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
      if (sourceContent && sourceContent.trim().length > 0) {
        fs.writeFileSync(destPath, sourceContent, 'utf-8');
        console.log(`✓ README.md copied successfully from: ${sourcePath}`);
        copied = true;
        break;
      }
    }
  } catch (error) {
    // Try next path
    continue;
  }
}

if (!copied) {
  console.log('⚠ README.md not found in any expected location, skipping copy');
  console.log('  Tried paths:', possibleSourcePaths);
  // Don't fail the build - getReadmeContent() will try to read from root directly
}

