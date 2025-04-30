const path = require("path");
const { registerCommand } = require(path.join(
  __dirname,
  "../../templates",
  "soara-registry"
));

registerCommand("make:command", "Create new Command CLI", async () => {
  console.log("Creating Command CLI...");
});
