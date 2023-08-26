const { env } = require("../utils");
const path = require("path");

class ConfigManager {
  constructor() {
    // first step load envrioment variables
    this.loadEnvriomentVariables();

    // load database config
    this.database = this.compile("database");

    this.logger = this.compile("logger", {});
  }

  loadEnvriomentVariables() {
    var filename = path.resolve(process.cwd(), ".env");
    require("dotenv").config({ path: filename });
  }

  compile(configName, config) {
    try {
      const configCallback = require(`../config/${configName}`);
      return configCallback({ env: env });
    } catch (error) {
      if (config) {
        return config;
      }

      console.log("\n");
      console.error(`x Error while loading config: ${configName}`);
      console.log("\n");
      process.exit(1);
    }
  }
}

const createConfig = () => new ConfigManager();

module.exports = { createConfig, ConfigManager };
