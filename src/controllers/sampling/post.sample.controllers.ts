import { Request, Response } from 'express';
import { Sample, Pools, Users } from '../../models/index';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { validatePostRecord } from '../../validators';
import message from '../../views/message';

async function postSample(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID' ? true : false;
  const userId = extractToken(req.headers.authorization, false).result;
  const isUserExist = await Users.findById(userId);
  if (!isUserExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'User by given API Key is not found!'
      })
    );
  }

  const isPoolsExist = await Pools.findOne({_id: req.params.poolsId, userId: isUserExist._id, ...NOT_ARCHIVED});
  if (!isPoolsExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Pools by given ID is not found!'
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
    poolsId: req.params.poolsId
  });
  
  const savedRecord = await record.save();

  const ioEmitter = req.app.get('socketIo');
  ioEmitter.emit(req.params.poolsId, savedRecord);

  return res.send(
    message({
      statusCode: 201,
      message: isId ? 'Berita berhasil dibuat' : 'Record is successfully created',
      data: savedRecord
    })
  );
}

export { postSample };
