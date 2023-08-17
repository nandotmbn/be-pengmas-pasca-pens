/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getPoolsById(req: Request, res: Response) {
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
        message: 'Pengguna dengan Token yang digunakan tidak ditemukan!'
      })
    )
  }

  const pools = await Pools.findOne({_id: req.params.poolsId, ...NOT_ARCHIVED, userId});
  if (!pools) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'Kolam tidak ditemukan',
        data: req.query
      })
    );
  }
  
  return res.send(
    message({
      statusCode: 200,
      message: 'Kolam berhasil didapatkan',
      data: pools
    })
  );
}

export { getPoolsById };
