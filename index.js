#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// Ambil isi file dari template
const templatePath = path.join(__dirname, "src/templates", "soara.js");
const fileContent = fs.readFileSync(templatePath, "utf-8");

// Target output (misalnya di luar, 3 tingkat atas)
const targetPath = path.join(process.cwd(), "../../../soara");

// Tulis file dan set executable
fs.writeFileSync(targetPath, fileContent);
fs.chmodSync(targetPath, 0o755);

console.log('✅ File "soara" berhasil dibuat!');
