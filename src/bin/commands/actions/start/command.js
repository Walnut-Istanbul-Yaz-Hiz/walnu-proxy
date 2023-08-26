"use strict";

const { resolveScript } = require("../../../../utils");
const path = require("path");

module.exports = ({ command }) => {
  command
    .command("start")
    .description("Start your Walnut Proxy application")
    .action(resolveScript(path.join(__dirname, "action")));
};
