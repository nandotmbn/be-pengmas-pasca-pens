import { Request, Response } from 'express';
import { Monitor, Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getAllMonitorToday(req: Request, res: Response) {
  const userId = extractToken(req.headers.authorization, false).result._id;
  const isIdValid = objectIdValidator(userId as string, 'User', true);
  if (isIdValid.error) {
    return res.status(401).send(
      message({
        statusCode: 401,
        data: req.body,
        message: 'Token tidak valid!'
      })
    );
  }

  const isUserExist = await Users.findById(userId);
  if (!isUserExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Pengguna dengan token yang diberikan tidak ditemukan!!'
      })
    )
  }

  const isPoolExist = await Pools.findOne({userId, ...NOT_ARCHIVED, _id: req.params.poolsId})
  if(!isPoolExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Kolam dengan Id yang diberikan tidak ditemukan!'
      })
    )
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const record = await Monitor.find({ poolsId: req.params.poolsId, createdAt: {$gte: startOfToday}, ...NOT_ARCHIVED });

  if (!record.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'Pemantauan tidak ditemukan',
        data: req.query
      })
    );
  }
  return res.send(
    message({
      statusCode: 200,
      message: 'Pemantauan berhasil didapatkan',
      data: record
    })
  );
}

export { getAllMonitorToday };
