import fs from 'fs';
import path from 'path';

/**
 * Convert names like `MyExample:Command` to kebab-case e.g. `my-example-command`
 * @param {string} string
 * @returns {string}
 */
export function camelize(string) {
  return string
    .split(':')
    .map((part) =>
      part
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase()
    )
    .join('-');
}

/**
 * Copy template files from `src` to `dest`, replacing placeholders with the `name`
 * @param {string} src - Source template path
 * @param {string} dest - Destination path
 * @param {string} name - Module name
 */
export function copyTemplate(src, dest, name) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const camelizeModuleName = camelize(name);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  if (entries.length === 0) return;

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    let destName = entry.name
      .replace(/__Name__/g, name)
      .replace(/__name__/g, name.toLowerCase())
      .replace(/__NAME__/g, name.toUpperCase())
      .replace(/__name-kebab__/g, camelizeModuleName);

    if (destName.endsWith('.stub')) {
      destName = destName.replace(/\.([a-z]+)?\.stub$/, '.$1');
    }

    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
      copyTemplate(srcPath, destPath, name); // recursive call
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      content = content
        .replace(/__Name__/g, name)
        .replace(/__name__/g, name.toLowerCase())
        .replace(/__NAME__/g, name.toUpperCase())
        .replace(/__name-kebab__/g, camelizeModuleName);
      fs.writeFileSync(destPath, content);
    }
  }
}
