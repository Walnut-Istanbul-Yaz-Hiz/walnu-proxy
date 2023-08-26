const winston = require("winston");

const createLogger = (config) => winston.createLogger(config);

module.exports = { createLogger, winston };
