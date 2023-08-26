const { createProxy } = require("./registers/create-proxy");
const { createConfig } = require("./registers/create-config");
const { createConnection } = require("./registers/create-connection");
const { createLogger } = require("./registers/create-logger");

class WalnutProxy {
  constructor() {
    this.config = createConfig();
    this.log = createLogger(this.config.logger);
    this.db = createConnection(this.config.database);
    this.proxies = new Map();
  }

  async slient() {
    await this.db.checkSchema();
  }

  async bootstrap() {
    await this.db.checkSchema();
    await this.loadProxies();
  }

  async loadProxies() {
    const knex = this.db.connection;
    const proxies = await knex("proxies").select("*");

    for (const proxy of proxies) {
      this.proxies.set(proxy.id, createProxy({ proxy, walnutProxy: this }));
    }

    return proxies;
  }

  async start() {
    await this.bootstrap();
    this.log.info("Walnut Proxy started");

    if (this.proxies.size > 0) {
      this.log.info("Proxies:");
      this.proxies.forEach((proxyContainer) => {
        this.log.info(proxyContainer.proxy.name + " proxy is running on port http://localhost:" + proxyContainer.proxy.port);
      });
    } else {
      this.exit();
    }
  }

  async exit() {
    this.log.info("Walnut Proxy stopped");
    process.exit(0);
  }
}

module.exports = WalnutProxy;
