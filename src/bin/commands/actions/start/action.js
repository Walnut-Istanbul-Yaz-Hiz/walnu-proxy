"use strict";

/**
 * `$ strapi start`
 */
module.exports = async () => {
  const WalnutProxy = require("../../../../walnut-proxy");

  const walnutProxy = new WalnutProxy();

  return walnutProxy.start();
};
