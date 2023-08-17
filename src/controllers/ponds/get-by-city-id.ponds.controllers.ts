/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Ponds, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getPondsByCityId(req: Request, res: Response) {
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
        message: 'User dengan Token yang digunakan tidak ditemukan!'
      })
    )
  }

  const ponds = await Ponds.find({cityId: req.params.cityId, userId, ...NOT_ARCHIVED});
  if (!ponds.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'Tambak tidak ditemukan',
        data: req.query
      })
    );
  }
  
  return res.send(
    message({
      statusCode: 200,
      message: 'Tambak berhasil didapatkan',
      data: ponds
    })
  );
}

export { getPondsByCityId };
