/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express } from 'express';
import dotEnv from 'dotenv';
const app: Express = express();
const http = require('http').createServer(app);
dotEnv.config();

const port = Number(process.env.PORT);
export { app, http, port };
