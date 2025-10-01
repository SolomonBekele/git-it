import winston from "winston";

const logger = winston.createLogger({
    level: process.LOG_LEVEL || "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
            })
    ),
    transports: [new winston.transports.Console()]
})

logger.error("hello, world");
logger.log("info","hello, world again!")