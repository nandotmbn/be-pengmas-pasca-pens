import express from 'express';
import { getAllCity, getCityById, getCityByProvinceId } from '../controllers/city';
const router = express.Router();

router.get('/', getAllCity);
router.get('/cityId/:cityId', getCityById);
router.get('/provinceId/:provinceId', getCityByProvinceId);
// router.post('/', [postRecord]);

router.stack.forEach(function (middleware) {
  console.log(
    '[routes]: ' + middleware.route.stack[0].method.toUpperCase() + ' /api/v1/cities' + middleware.route.path
  );
});

export { router };
