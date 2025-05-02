const fs = require('fs');
const path = require('path');

exports.camelize = (string) => {
  return string
    .split(':')
    .map((part) =>
      part
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase()
    )
    .join('-');
};

exports.copyTemplate = (src, dest, name) => {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const camelizeModuleName = this.camelize(name);
  const entries = fs.readdirSync(src, { withFileTypes: true });

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
      this.copyTemplate(srcPath, destPath, name);
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
};
