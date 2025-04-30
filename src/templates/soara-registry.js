// File ini hanya berisi registry logic, bisa di-require tanpa side effects
const commandRegistry = new Map();

function registerCommand(name, description, action) {
  if (commandRegistry.has(name)) {
    console.error(`❌ Command "${name}" sudah terdaftar!`);
    process.exit(1);
  }
  commandRegistry.set(name, { description, action });
}

function getCommands() {
  return commandRegistry;
}

module.exports = { registerCommand, getCommands };
