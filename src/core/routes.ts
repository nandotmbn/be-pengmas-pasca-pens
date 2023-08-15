import { Express } from 'express';
import {
  AuthRouter,
  CityRouter,
  PondsRouter,
  PoolsRouter,
  ProvinceRouter,
  MonitorRouter,
  UserRouter,
  SampleRouter
} from '../routes';

export default function coreRoutes(app: Express) {
  app.use('/api/v1/auth', [AuthRouter]); // Auth Routes
  app.use('/api/v1/users', [UserRouter]); // Users Routes
  app.use('/api/v1/provinces', [ProvinceRouter]); // City Routes
  app.use('/api/v1/cities', [CityRouter]); // City Routes
  app.use('/api/v1/ponds', [PondsRouter]); // Ponds Routes
  app.use('/api/v1/pools', [PoolsRouter]); // Pools Routes
  app.use('/api/v1/monitor', [MonitorRouter]); // Record Routes
  app.use('/api/v1/sample', [SampleRouter]); // Record Routes
}
 