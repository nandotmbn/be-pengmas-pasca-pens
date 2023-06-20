import { json } from 'body-parser';
import express, { urlencoded } from 'express';
import errorHandler from '../logs/error.logs';
import requestLogger from '../logs/request.logs';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

function createApp(app: express.Express) {
  app.set('trust proxy', true);

  app.use(requestLogger);
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(helmet({
    crossOriginResourcePolicy: false,
  }));
  app.use(cors({
    exposedHeaders: "x-auth-token"
  }));
  app.use(express.static((path.join('public'))));

  app.use(errorHandler);
}

export default createApp;
