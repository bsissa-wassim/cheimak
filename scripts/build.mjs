import { readFile, writeFile, mkdir, copyFile, rm, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const output = path.join(root, 'dist');
const files = new Set(['index.html', 'senior-smile.html']);

function addReference(reference, source) {
  if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) return;
  const clean = decodeURIComponent(reference.split(/[?#]/)[0]);
  if (!clean) return;
  const absolute = clean.startsWith('/')
    ? path.resolve(root, `.${clean}`)
    : path.resolve(root, path.dirname(source), clean);
  const relative = path.relative(root, absolute);
  if (relative.startsWith('..') || path.isAbsolute(relative)) throw new Error(`Reference outside project: ${reference}`);
  if (!/^(?:index\.html|senior-smile\.html|(?:css|js|assets)[\\/])/i.test(relative)) {
    throw new Error(`Unexpected public file: ${relative}`);
  }
  files.add(relative);
}

for (const source of files) {
  const contents = await readFile(path.join(root, source));
  const extension = path.extname(source);
  if (!['.html', '.css', '.js'].includes(extension)) continue;
  const text = contents.toString('utf8');
  const pattern = extension === '.html'
    ? /\s(?:src|href)=["']([^"']+)["']/g
    : extension === '.css'
      ? /url\(\s*["']?([^\s"')]+)["']?\s*\)/g
      : /\bimport\s+(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]/g;
  for (const match of text.matchAll(pattern)) addReference(match[1], source);
  if (extension === '.html') {
    for (const match of text.matchAll(/\s(?:srcset|imagesrcset)=["']([^"']+)["']/g)) {
      for (const candidate of match[1].split(',')) addReference(candidate.trim().split(/\s+/)[0], source);
    }
  }
}

if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Invalid build directory');
const existing = await lstat(output).catch(error => {
  if (error.code !== 'ENOENT') throw error;
});
if (existing?.isSymbolicLink()) throw new Error('Build directory must not be a symlink');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
let bytes = 0;
for (const file of files) {
  const destination = path.join(output, file);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(root, file), destination);
  bytes += (await lstat(destination)).size;
}
await writeFile(path.join(output, 'robots.txt'), 'User-agent: *\nAllow: /\n');
console.log(`Published files prepared: ${files.size + 1}; ${(bytes / 1024 / 1024).toFixed(1)} MB in dist/`);
