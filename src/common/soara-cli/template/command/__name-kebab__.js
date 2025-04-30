const { registerCommand } = require('@soara/cli/src/templates/soara-registry');

registerCommand('__name__', 'Create __name__', async (name) => {
  console.log('Hello __name__');
});
