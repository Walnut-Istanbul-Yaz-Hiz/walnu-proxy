"use strict";

const { resolveScript } = require("../../../../utils");
const path = require("path");


module.exports = ({ command, argv }) => {
  command
    .command("remove id")
    .description("Remove the interactive Proxy")
    .action(resolveScript(path.join(__dirname, "action")));
};
