import express from 'express';
import { login, register } from '../controllers/auth';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.stack.forEach(function (middleware) {
  console.log('[routes]: ' + middleware.route.stack[0].method.toUpperCase() + ' /api/v1/auth' + middleware.route.path);
});

export {router};
