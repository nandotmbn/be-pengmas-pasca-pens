import { Request, Response } from 'express';
import { Record, Users } from '../../models/index';
import { validatePostRecord } from '../../validators';
import message from '../../views/message';

async function postRecordByKey(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID' ? true : false;
  const apiKey = req.params.apiKey;
  const isUserExist = await Users.findOne({ apiKey });
  if (!isUserExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'User by given API Key is not found!'
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
  const record = new Record({
    ...req.body,
    userId: isUserExist._id
  });
  const savedRecord = await record.save();
  
  const ioEmitter = req.app.get('socketIo');
  ioEmitter.emit(isUserExist._id, savedRecord);

  return res.send(
    message({
      statusCode: 201,
      message: isId ? 'Berita berhasil dibuat' : 'Record is successfully created',
      data: savedRecord
    })
  );
}

export { postRecordByKey };
