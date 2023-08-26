const { knex } = require("knex");

class DatabaseConnection {
  /**
   * @type {import('knex').Knex}
   */
  connection = null;

  constructor(config) {
    this.connection = knex(config);
  }

  async checkSchema() {
    const hasProxyTable = await this.connection.schema.hasTable("proxies");
    
    if (!hasProxyTable) {
      await this.createProxyTable();
    }
  }

  async createProxyTable() {
    return await this.connection.schema.createTable("proxies", (table) => {
      table.increments("id");
      table.string("name");
      table.string("port");
      table.string("target");
      table.timestamps();
    });
  }
}

const createConnection = (config) => new DatabaseConnection(config);

module.exports = { createConnection, DatabaseConnection };
