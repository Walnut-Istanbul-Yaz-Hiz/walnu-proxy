"use strict";

/**
 * `$ strapi start`
 */
module.exports = async (name, port, target) => {
  const WalnutProxy = require("../../../../walnut-proxy");

  const walnutProxy = new WalnutProxy();

  await walnutProxy.slient();

  walnutProxy.log.info("Generating proxy...");

  var knex = walnutProxy.db.connection;

  await knex("proxies").insert({
    name: name,
    port: port,
    target: target,
  });

  walnutProxy.log.info("Proxy generated successfully");

  process.exit(0);
};
