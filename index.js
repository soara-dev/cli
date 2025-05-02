#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, 'src/templates', 'soara.js');
const fileContent = fs.readFileSync(templatePath, 'utf-8');
const targetPath = path.join(process.cwd(), '../../../soara');

fs.writeFileSync(targetPath, fileContent);
fs.chmodSync(targetPath, 0o755);
