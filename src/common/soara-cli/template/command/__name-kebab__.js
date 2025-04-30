const path = require('path');
const { registerCommand } = require(path.join(process.cwd(), 'src/templates', 'soara-registry'));

registerCommand('__name__', 'Create __name__', async (name) => {
  console.log('Hello __name__');
});
