const path = require('path');
const { registerCommand } = require(path.join(__dirname, '../../../templates', 'soara-registry'));
const { copyTemplate } = require(path.join(__dirname, '../../../utils'));

registerCommand('make:command <name>', 'Create new Command CLI', async (name) => {
  const templatePath = path.join(__dirname, '../template/commands');
  const targetPath = path.join(process.cwd(), 'src/common/soara-cli/commands');
  copyTemplate(templatePath, targetPath, name);
});
