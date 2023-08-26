"use strict";

/**
 * `$ strapi start`
 */
module.exports = async (id) => {
  const WalnutProxy = require("../../../../walnut-proxy");

  const walnutProxy = new WalnutProxy();

  await walnutProxy.slient();

  var knex = walnutProxy.db.connection;

  var proxy = await knex("proxies").select("*").where("id", id).first();

  if (proxy == null) {
    walnutProxy.log.error("No proxy found");
    process.exit(1);
  }

  walnutProxy.log.info(`Removing proxy ${proxy.name}...`);
  await knex("proxies").where("id", id).del();

  walnutProxy.log.info("Proxy removed successfully");

  process.exit(0);
};
