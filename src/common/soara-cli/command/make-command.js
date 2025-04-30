const path = require('path');
// const { registerCommand } = require(path.join(process.cwd(), 'src/templates', 'soara-registry'));
const { registerCommand } = require(path.join(__dirname, '../../../templates', 'soara-registry'));
const { copyTemplate } = require(path.join(__dirname, '../../utils'));

registerCommand('make:command <name>', 'Create new Command CLI', async (name) => {
  const templatePath = path.join(__dirname, '../template/command');
  const targetPath = path.join(process.cwd(), 'src/common/soara-cli/command');
  copyTemplate(templatePath, targetPath, name);
});
