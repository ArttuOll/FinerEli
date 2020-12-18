const { createLogger, format, transports } = require("winston");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const timestampFormat = { format: "YYYY-MM-DD HH:mm:ss" }
const logFormat = format.combine(format.timestamp(timestampFormat), format.json());

const logger = createLogger({
  level: "debug",
  transports: [
    new transports.File({
      filename: "./logs/errors.log",
      level: "error",
      format: logFormat
    }),
    new transports.File({
      filename: "./logs/combined.log",
      level: "info",
      format: logFormat
    })
  ]
});

logger.stream = {
  write: (message, encoding) => logger.info(`Connection: ${message}`)
};

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({
    level: "debug",
    format: format.combine(
      format.timestamp(timestampFormat),
      format.colorize(),
      format.simple(),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    )
  }));
}

module.exports = logger;
