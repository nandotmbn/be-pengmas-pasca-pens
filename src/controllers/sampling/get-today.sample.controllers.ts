import { Request, Response } from 'express';
import { Sample, Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getAllSampleToday(req: Request, res: Response) {
  const isId = true;
  const userId = extractToken(req.headers.authorization, false).result._id;
  const isIdValid = objectIdValidator(userId as string, 'User', isId);
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
        message: 'Pengguna dengan Token yang digunakan tidak ditemukan!'
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

  const record = await Sample.find({ poolsId: req.params.poolsId, createdAt: {$gte: startOfToday}, ...NOT_ARCHIVED });

  if (!record.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Sample tidak ditemukan' : 'Sample are not found',
        data: req.query
      })
    );
  }
  return res.send(
    message({
      statusCode: 200,
      message: isId ? 'Sample berhasil didapatkan' : 'Sample are successfully found',
      data: record
    })
  );
}

export { getAllSampleToday };
