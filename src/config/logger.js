const winston = require("winston");

module.exports = ({ env }) => ({
  level: env("LOGGER_LEVEL", "info"),
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS",
    }), // Zaman damgası eklemek için
    winston.format.colorize(), // Renklendirmek için
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level} : ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
