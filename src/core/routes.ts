import { Express } from 'express';
import {
  AuthRouter,
  RecordRouter,
  UserRouter
} from '../routes';

export default function coreRoutes(app: Express) {
  app.use('/api/v1/auth', [AuthRouter]); // Auth Routes
  app.use('/api/v1/record', [RecordRouter]); // News Routes
  app.use('/api/v1/users', [UserRouter]); // News Routes
}
