/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City, Ponds, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getPondsByProvinceId(req: Request, res: Response) {
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

  City.find({ provinceId: req.params.provinceId, ...NOT_ARCHIVED }, { _id: 1 }, function (err, docs: any) {
    const ids = docs.map(function (doc: any) {
      return doc._id;
    });

    return Ponds.find({ cityId: { $in: ids }, userId, ...NOT_ARCHIVED }, function (err: any, docs: any) {
      return res.send(
        message({
          statusCode: 200,
          message: 'Tambak berhasil didapatkan',
          data: docs
        })
      );
    });
  });
}

export { getPondsByProvinceId };
