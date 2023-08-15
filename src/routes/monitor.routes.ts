import express from 'express';
import {
  deleteOneMonitor,
  getAllMonitor,
  getOneMonitor,
  postMonitor,
  updateMonitor,
  postMonitorByKey,
  getAllMonitorToday
} from '../controllers/monitoring';
const router = express.Router();

router.get('/poolsId/:poolsId', getAllMonitor);
router.get('/poolsId/:poolsId/today', getAllMonitorToday);
router.get('/:recordId', getOneMonitor);
router.post('/poolsId/:poolsId', [postMonitor]);
router.post('/apiKey/:apiKey/poolsId/:poolsId', [postMonitorByKey]);
router.put('/:recordId', [updateMonitor]);
router.delete('/:recordId', [deleteOneMonitor]);

router.stack.forEach(function (middleware) {
  console.log(
    '[routes]: ' + middleware.route.stack[0].method.toUpperCase() + ' /api/v1/monitor' + middleware.route.path
  );
});

export { router };
