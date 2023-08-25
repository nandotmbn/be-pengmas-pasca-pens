import express from 'express';
import {
  createPoolsByUser,
  getAllPools,
  getPoolsByCityId,
  getPoolsById,
  getPoolsByPondsId,
  getPoolsByProvinceId,
  updatePoolByUser,
  deletePoolsById,
  bindPoolsWithDevice,
} from '../controllers/pools';
const router = express.Router();

router.get('/', getAllPools);
router.get('/poolsId/:poolsId', getPoolsById);
router.get('/pondsId/:pondsId', getPoolsByPondsId);
router.get('/cityId/:cityId', getPoolsByCityId);
router.get('/provinceId/:provinceId', getPoolsByProvinceId);
router.post('/', [createPoolsByUser]);
router.put('/poolsId/:poolsId', [updatePoolByUser]);
router.put('/bind/poolsId/:poolsId', [bindPoolsWithDevice]);
router.delete('/poolsId/:poolsId', [deletePoolsById]);

router.stack.forEach(function (middleware) {
  console.log('[routes]: ' + middleware.route.stack[0].method.toUpperCase() + ' /api/v1/pools' + middleware.route.path);
});

export { router };
