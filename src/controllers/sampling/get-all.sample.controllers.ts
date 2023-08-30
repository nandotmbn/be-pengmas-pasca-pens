/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Sample, Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getAllSample(req: Request, res: Response) {
  const from = (req.query.from as string) || '';
  const to = (req.query.to as string) || '';
  const isId = true;
  const limit: number = parseInt(req.query.limit as string) || 9999;
  const page: number = parseInt(req.query.page as string) || 1;
  const newestTime: string = (req.query.newestTime as string) || 'false';

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
    );
  }

  const isPoolExist = await Pools.findOne({ userId, ...NOT_ARCHIVED, _id: req.params.poolsId });
  if (!isPoolExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Kolam dengan Id ini tidak ditemukan!'
      })
    );
  }

  let params: any = { poolsId: req.params.poolsId };

  if (from && !to) {
    const gte = new Date(from);

    params = { createdAt: { $gte: gte }, poolsId: req.params.poolsId };
  } else if (!from && to) {
    const lte = new Date(to);

    params = { createdAt: { $lte: lte }, poolsId: req.params.poolsId };
  } else if (from && to) {
    const gte = new Date(from);
    const lte = new Date(to);

    params = { createdAt: { $gte: gte, $lte: lte }, poolsId: req.params.poolsId };
  }

  const sortParams = newestTime == 'false' ? 'createdAt' : '-createdAt';

  const record = await Sample.find(params)
    .limit(limit || 1 * 1)
    .skip((page - 1) * limit)
    .sort(sortParams)
    .exec();

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

export { getAllSample };
