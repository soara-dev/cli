const commandRegistry = new Map();

export const registerCommand = (name, description, action) => {
  if (commandRegistry.has(name)) {
    console.error(`❌ Command "${name}" sudah terdaftar!`);
    process.exit(1);
  }
  commandRegistry.set(name, { description, action });
};

export const getCommands = () => {
  return commandRegistry;
};
