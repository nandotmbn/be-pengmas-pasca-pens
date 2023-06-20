import { NextFunction, Request, Response } from 'express';
import winston, { Logger } from 'winston';

const LoggerInfo: Logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'log/info.log', level: 'info' })
  ]
});

function requestLogger(req: Request, res: Response, next: NextFunction) {
  LoggerInfo.log(
    'info',
    `${req.method} ${req.path} from ${req.ip} at ${new Date().toLocaleString()}`
  );
  next();
}

export default requestLogger;
export { LoggerInfo };
