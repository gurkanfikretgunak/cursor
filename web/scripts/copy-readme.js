const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, '../README.md');
const destPath = path.join(__dirname, './README.md');

try {
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log('✓ README.md copied successfully');
  } else {
    console.log('⚠ README.md not found in parent directory, skipping copy');
  }
} catch (error) {
  console.log('⚠ README.md copy skipped:', error.message);
  process.exit(0); // Don't fail the build if copy fails
}

