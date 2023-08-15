import express from 'express';
import { getAllProvinces } from '../controllers/provinces';
const router = express.Router();

router.get('/', getAllProvinces);
// router.get('/provinceId/:provinceId', getCityById);
// router.post('/', [postRecord]);

router.stack.forEach(function (middleware) {
  console.log(
    '[routes]: ' + middleware.route.stack[0].method.toUpperCase() + ' /api/v1/provinces' + middleware.route.path
  );
});

export { router };
