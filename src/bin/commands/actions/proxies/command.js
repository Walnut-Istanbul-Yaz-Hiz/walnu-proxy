"use strict";

const path = require("path");
const { resolveScript } = require("../../../../utils");

module.exports = ({ command }) => {
  command
    .command("proxies:list")
    .description("List all the proxies")
    .action(resolveScript(path.join(__dirname, "action")));
};
