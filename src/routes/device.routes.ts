import express from 'express';
import { createDevice } from '../controllers/device';
const router = express.Router();

router.get('/', createDevice);

router.stack.forEach(function (middleware) {
  console.log('[routes]: ' + middleware.route.stack[0].method.toUpperCase() + ' /api/v1/device' + middleware.route.path);
});

export {router};
