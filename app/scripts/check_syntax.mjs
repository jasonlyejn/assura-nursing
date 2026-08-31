import fs from 'node:fs';
import path from 'node:path';

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(walk(full));
    } else if (item.name.endsWith('.js') || item.name.endsWith('.mjs')) {
      files.push(full);
    }
  }
  return files;
}

const all = walk('./functions/api');
console.log(`Checking ${all.length} files...`);
for (const f of all) {
  try {
    const code = fs.readFileSync(f, 'utf8');
    // Basic syntax check
    new Function('import', code.replace(/import\s+.*?from\s+['"].*?['"];?/g, ''));
  } catch (e) {
    console.error(`Syntax error in ${f}:`, e.message);
  }
}
console.log('Done syntax check.');
