/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City, Ponds, Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getPoolsByProvinceId(req: Request, res: Response) {
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
    );
  }

  City.find({ provinceId: req.params.provinceId, ...NOT_ARCHIVED }, { _id: 1 }, function (err, docs: any) {
    const ids_city = docs.map(function (doc: any) {
      return doc._id;
    });

    Ponds.find({ cityId: {$in: ids_city}, ...NOT_ARCHIVED, userId }, { _id: 1 }, function (err, docs: any) {
      const ids = docs.map(function (doc: any) {
        return doc._id;
      });

      return Pools.find({ pondsId: { $in: ids }, userId, ...NOT_ARCHIVED }, function (err: any, docs: any) {
        return res.send(
          message({
            statusCode: 200,
            message: 'Kolam berhasil didapatkan',
            data: docs
          })
        );
      });
    });
  });
}

export { getPoolsByProvinceId };
