"use strict";

const { resolveScript } = require("../../../../utils");
const path = require("path");


module.exports = ({ command, argv }) => {
  command
    .command("generate <name> <port> <target>")
    .description("Launch the interactive Proxy generator")
    .action(resolveScript(path.join(__dirname, "action")));
};
