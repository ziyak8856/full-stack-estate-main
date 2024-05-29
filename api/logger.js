import winston from 'winston';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Function to clean the log message
const cleanMessage = (message) => {
  const regex = /"(GET|POST|PUT|DELETE|OPTIONS|PATCH) (\/api\/\S*) HTTP\/1\.1"/;
  const match = message.match(regex);
  if (match) {
    return `${match[1]} ${match[2]}`;
  }
  return message;
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(({ timestamp, level, message }) => {
      const cleanedMessage = cleanMessage(message);
      return `${timestamp} ${level}: "${cleanedMessage}"`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
  ]
});

// If we're not in production then log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message }) => {
        const cleanedMessage = cleanMessage(message);
        return `${timestamp} ${level}: "${cleanedMessage}"`;
      })
    )
  }));
}

export default logger;
