#!/usr/bin/env node
const glob = require('glob');
const path = require('path');
const { pathToFileURL } = require('url');
const { Command } = require('commander');

let registry;
try {
  registry = require('@soara/cli/src/templates/soara-registry');
} catch (err) {
  try {
    registry = require(path.join(__dirname, 'src/templates', 'soara-registry'));
  } catch (err) {
    console.error('❌ Failed to load command registry:', err.message);
    process.exit(1);
  }
}

const { getCommands } = registry;
const patterns = ['src/common/soara-cli/cli.js', 'node_modules/@soara/**/src/common/soara-cli/cli.js'];

const allMatches = patterns.flatMap((pattern) => glob.sync(pattern, { absolute: true }));

if (allMatches.length === 0) process.exit(0);

(async () => {
  for (const cliPath of allMatches) {
    try {
      await import(pathToFileURL(cliPath).href);
    } catch (err) {
      console.error(`❌ Failed to import ${cliPath}:`, err.message);
    }
  }

  const program = new Command();
  program.name('soara');

  const commands = getCommands();
  commands.forEach((cmd, name) => {
    program.command(name).description(cmd.description).action(cmd.action);
  });

  program.parse(process.argv);
})();
