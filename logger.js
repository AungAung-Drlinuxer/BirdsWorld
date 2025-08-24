import winston from 'winston';
import 'winston-daily-rotate-file';
import newrelicPkg from 'newrelic';
const newrelic = newrelicPkg.default || newrelicPkg;

// Custom format for New Relic compatibility
const newRelicFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  const logData = {
    timestamp: timestamp || new Date().toISOString(),
    level: level,
    message: message,
    ...metadata
  };
  
  // For New Relic log forwarding, we want to output JSON to stdout
  return JSON.stringify(logData);
});

// Console transport for New Relic log forwarding
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp(),
    newRelicFormat
  ),
});

// Optional: daily rotating log files
const fileTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    consoleTransport,
    fileTransport
  ],
});

// Wrap Mongoose operations for logging
export const logMongoOperation = async (segmentName, fn) => {
  return await newrelic.startSegment(segmentName, true, async () => {
    try {
      const result = await fn();
      logger.info(`MongoDB operation: ${segmentName}`, { success: true });
      return result;
    } catch (err) {
      logger.error(`MongoDB operation failed: ${segmentName}`, { error: err.message, stack: err.stack });
      throw err;
    }
  });
};

// Add a method to explicitly send logs to New Relic
logger.sendToNewRelic = (level, message, metadata = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: level,
    message: message,
    ...metadata
  };
  
  // Send to stdout for New Relic to capture
  console.log(JSON.stringify(logEntry));
};

export default logger;
