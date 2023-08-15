/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getAllPools(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID';
  const poolsName: string = (req.query.poolsName as string) || '';

  const userId = extractToken(req.headers.authorization, false).result._id;
  const isIdValid = objectIdValidator(userId as string, 'User', isId);
  if (isIdValid.error) {
    return res.status(401).send(
      message({
        statusCode: 401,
        data: req.body,
        message: 'Token is not valid!'
      })
    );
  }

  const isUserExist = await Users.findById(userId);
  if (!isUserExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'User by given API Key is not found!'
      })
    )
  }

  const pools = await Pools.find({poolsName: { $regex: new RegExp(poolsName, 'i') }, userId, ...NOT_ARCHIVED});
  if (!pools.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Kolam tambak tidak ditemukan' : 'Pools are not found',
        data: req.query
      })
    );
  }
  
  return res.send(
    message({
      statusCode: 200,
      message: isId ? 'Kolam tambak berhasil didapatkan' : 'Pools are successfully found',
      data: pools
    })
  );
}

export { getAllPools };
