import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.colorize()
  ),
  transports: [
    new transports.File({
        filename: 'error.log',
        level: 'error',
    }),
    new transports.File({
        filename: 'info.log',
        level: 'info',
    })
  ]
});

logger.add(new transports.Console({
    format: format.combine(
        format.colorize(),
        format.simple()
    )
}));