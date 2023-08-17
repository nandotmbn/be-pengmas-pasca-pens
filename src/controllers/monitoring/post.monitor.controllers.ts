import { Request, Response } from 'express';
import { Monitor, Pools, Users } from '../../models/index';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { validatePostRecord } from '../../validators';
import message from '../../views/message';

async function postMonitor(req: Request, res: Response) {
  const userId = extractToken(req.headers.authorization, false).result;
  const isUserExist = await Users.findById(userId);
  if (!isUserExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Pengguna dengan token yang digunakan tidak ditemukan!'
      })
    );
  }

  const isPoolsExist = await Pools.findOne({_id: req.params.poolsId, userId: isUserExist._id, ...NOT_ARCHIVED});
  if (!isPoolsExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Kolam dengan Id yang diberikan tidak ditemukan!'
      })
    );
  }

  const { error } = validatePostRecord(req.body);
  if (error) {
    return res.status(400).send(
      message({
        statusCode: 400,
        data: req.body,
        message: error.message
      })
    );
  }
  const record = new Monitor({
    ...req.body,
    poolsId: req.params.poolsId
  });
  
  const savedRecord = await record.save();

  const ioEmitter = req.app.get('socketIo');
  ioEmitter.emit(`Monitor:${req.params.poolsId}`, savedRecord);

  return res.send(
    message({
      statusCode: 201,
      message: 'Pemantauan berhasil disimpan!',
      data: savedRecord
    })
  );
}

export { postMonitor };
