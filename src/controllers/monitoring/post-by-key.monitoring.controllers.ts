import { Request, Response } from 'express';
import { Pools, Monitor, Users } from '../../models/index';
import { validatePostRecord } from '../../validators';
import message from '../../views/message';

async function postMonitorByKey(req: Request, res: Response) {
  const apiKey = req.params.apiKey;
  const isUserExist = await Users.findOne({apiKey: apiKey});
  if (!isUserExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Pengguna dengan API Key yang diberikan tidak ditemukan!'
      })
    );
  }

  const isPoolsExist = await Pools.findOne({deviceName: req.params.deviceName, userId: isUserExist._id});
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
    userId: isUserExist._id,
    poolsId: isPoolsExist._id
  });
  
  const savedMonitor = await record.save();

  const ioEmitter = req.app.get('socketIo');
  ioEmitter.emit(`Monitor:${isPoolsExist._id}`, savedMonitor);
  

  return res.send(
    message({
      statusCode: 201,
      message: 'Pemantauan berhasil disimpan!',
      data: savedMonitor
    })
  );
}

export { postMonitorByKey };
