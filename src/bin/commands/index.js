const { Command } = require("commander");

const walnutProxyCommands = {
  generate: require("./actions/generate/command"),
  remove: require("./actions/remove/command"),
  proxies: require("./actions/proxies/command"),
  start: require("./actions/start/command"),
  version: require("./actions/version/command"),
};

const buildWalnutProxyCommand = (argv, command = new Command()) => {
  // Initial program setup
  command.storeOptionsAsProperties(false).allowUnknownOption(true);

  // Help command
  command.helpOption("-h, --help", "Display help for command");
  command.addHelpCommand("help [command]", "Display help for command");

  // Load all commands
  Object.keys(walnutProxyCommands).forEach((name) => {
    try {
      // Add this command to the Commander command object
      walnutProxyCommands[name]({ command, argv });
    } catch (e) {
      console.error(`Failed to load command ${name}`, e);
    }
  });

  return command;
};

const runWalnutProxyCommand = async (argv = process.argv, command = new Command()) => {
  await buildWalnutProxyCommand(argv, command).parseAsync(argv);
};

module.exports = {
  runWalnutProxyCommand,
  buildWalnutProxyCommand,
  walnutProxyCommands,
};
