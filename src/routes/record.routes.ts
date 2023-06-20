import express from 'express';
import {
  deleteOneRecord,
  getAllRecord,
  getOneRecord,
  postRecord,
  updateRecord,
  postRecordByKey,
  getAllRecordToday
} from '../controllers/record';
const router = express.Router();

router.get('/', getAllRecord);
router.get('/today', getAllRecordToday);
router.get('/:recordId', getOneRecord);
router.post('/', [postRecord]);
router.post('/apiKey/:apiKey', [postRecordByKey]);
router.put('/:recordId', [updateRecord]);
router.delete('/:recordId', [deleteOneRecord]);

router.stack.forEach(function (middleware) {
  console.log(
    '[routes]: ' + middleware.route.stack[0].method.toUpperCase() + ' /api/v1/record' + middleware.route.path
  );
});

export { router };
