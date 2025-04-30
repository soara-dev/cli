#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'src/templates', 'soara.js');
const fileContent = fs.readFileSync(templatePath, 'utf-8');
const targetPath = path.join(process.cwd(), '../../../soara');

fs.writeFileSync(targetPath, fileContent);
fs.chmodSync(targetPath, 0o755);
