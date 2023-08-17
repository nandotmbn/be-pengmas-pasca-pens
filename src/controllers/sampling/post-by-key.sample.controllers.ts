import { Request, Response } from 'express';
import { Pools, Sample, Users } from '../../models/index';
import { validatePostRecord } from '../../validators';
import message from '../../views/message';

async function postSampleByKey(req: Request, res: Response) {
  const isId = true;
  const apiKey = req.params.apiKey;
  const isUserExist = await Users.findOne({apiKey: apiKey});
  if (!isUserExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Pengguna dengan Token yang digunakan tidak ditemukan!'
      })
    );
  }

  const isPoolsExist = await Pools.findOne({_id: req.params.poolsId, userId: isUserExist._id});
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
  const record = new Sample({
    ...req.body,
    userId: isUserExist._id,
    poolsId: req.params.poolsId
  });
  
  const savedSample = await record.save();

  const ioEmitter = req.app.get('socketIo');
  ioEmitter.emit(`Sample:${req.params.poolsId}`, savedSample);

  return res.send(
    message({
      statusCode: 201,
      message: isId ? 'Sample berhasil dibuat' : 'Sample is successfully created',
      data: savedSample
    })
  );
}

export { postSampleByKey };
