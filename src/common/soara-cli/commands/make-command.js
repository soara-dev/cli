import path from 'path';
import { registerCommand } from '../../../templates/soara-registry.js';
import { copyTemplate } from '../../../utils/index.js';
import { fileURLToPath } from 'url';

registerCommand('make:command <name>', 'Create new Command CLI', async (name) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatePath = path.join(__dirname, '../template/commands');
  const targetPath = path.join(process.cwd(), 'src/common/soara-cli/commands');
  copyTemplate(templatePath, targetPath, name);
});
