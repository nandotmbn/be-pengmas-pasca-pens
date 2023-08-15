import express from 'express';
import {
  deleteOneSample,
  getAllSample,
  getOneSample,
  postSample,
  updateSample,
  postSampleByKey,
  getAllSampleToday
} from '../controllers/sampling';
const router = express.Router();

router.get('/poolsId/:poolsId', getAllSample);
router.get('/poolsId/:poolsId/today', getAllSampleToday);
router.get('/:recordId', getOneSample);
router.post('/poolsId/:poolsId', [postSample]);
router.post('/apiKey/:apiKey/poolsId/:poolsId', [postSampleByKey]);
router.put('/:recordId', [updateSample]);
router.delete('/:recordId', [deleteOneSample]);

router.stack.forEach(function (middleware) {
  console.log(
    '[routes]: ' + middleware.route.stack[0].method.toUpperCase() + ' /api/v1/sample' + middleware.route.path
  );
});

export { router };
