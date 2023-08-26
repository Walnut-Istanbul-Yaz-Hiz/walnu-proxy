/**
 * Database connection settings are made here.
 */
module.exports = ({ env }) => ({
  client: "sqlite",
  connection: {
    filename: env("DATABASE_FILENAME", ".tmp/walnut_proxy.db"),
  },
});
