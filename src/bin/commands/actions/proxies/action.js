"use strict";

const CLITable = require("cli-table3");
const chalkImporter = import("chalk");

/**
 * `$ strapi start`
 */
module.exports = async () => {
  const WalnutProxy = require("../../../../walnut-proxy");

  const walnutProxy = new WalnutProxy();

  await walnutProxy.slient();

  const chalk = new (await chalkImporter).Chalk();

  var knex = walnutProxy.db.connection;

  var proxies = await knex("proxies").select("*");

  const infoTable = new CLITable({
    head: [chalk.blue("Name"), chalk.blue("Port"), chalk.blue("Target")],
  });

  proxies.forEach((proxy) => infoTable.push([proxy.name, proxy.port, proxy.target]));

  console.log(infoTable.toString());

  process.exit(0);
};
