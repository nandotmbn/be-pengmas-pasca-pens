/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Monitor, Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getAllMonitor(req: Request, res: Response) {
  const from = (req.query.from as string) || '';
  const to = (req.query.to as string) || '';
  const limit: number = parseInt(req.query.limit as string) || 9999;
  const page: number = parseInt(req.query.page as string) || 1;
  const newestTime: string = (req.query.newestTime as string) || 'false';

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
        message: 'User dengan API yang diberikan tidak ditemukan!'
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

  let params: any = {};

  if (from && !to) {
    const gte = new Date(from);

    params = { createdAt: { $gte: gte } };
  } else if (!from && to) {
    const lte = new Date(to);

    params = { createdAt: { $lte: lte } };
  } else if (from && to) {
    const gte = new Date(from);
    const lte = new Date(to);

    params = { createdAt: { $gte: gte, $lte: lte } };
  }

  const sortParams = newestTime == 'false' ? 'createdAt' : '-createdAt';

  const record = await Monitor.find(params)
    .limit(limit || 1 * 1)
    .skip((page - 1) * limit)
    .sort(sortParams)
    .exec();

  if (!record.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'Monitor tidak ditemukan',
        data: req.query
      })
    );
  }
  return res.send(
    message({
      statusCode: 200,
      message: 'Monitor berhasil didapatkan',
      data: record
    })
  );
}

export { getAllMonitor };
