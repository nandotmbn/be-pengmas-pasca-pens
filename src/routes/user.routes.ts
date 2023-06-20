import express from 'express';
import { apiKeyUpdate, getUserProfiles, userUpdate, userUpdatePassword } from '../controllers/users';
const router = express.Router();

router.get('/', getUserProfiles);
router.put('/', userUpdate);
router.put('/apiKey', apiKeyUpdate);
router.put('/password', userUpdatePassword);

router.stack.forEach(function (middleware) {
  console.log('[routes]: ' + middleware.route.stack[0].method.toUpperCase() + ' /api/v1/users' + middleware.route.path);
});

export {router};
