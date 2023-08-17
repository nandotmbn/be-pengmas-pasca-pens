/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City, Ponds, Province, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getAllPonds(req: Request, res: Response) {
  const limit: number = parseInt(req.query.limit as string) || 1;
  const page: number = parseInt(req.query.page as string) || 1;
  const pondsName: string = (req.query.pondsName as string) || '';
  const provinceId: string = (req.query.provinceId as string) || '';
  const cityId: string = (req.query.cityId as string) || '';

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
        message: 'Pengguna dengan token yang diberikan tidak ditemukan!'
      })
    );
  }

  if (provinceId) {
    const isProvIdVal = objectIdValidator(provinceId as string, 'User', true);
    if (isProvIdVal.error) {
      return res.status(400).send(
        message({
          statusCode: 400,
          data: req.body,
          message: 'ID provinsi tidak valid!'
        })
      );
    }

    const isProvinceExist = await Province.findById(provinceId);
    if (!isProvinceExist) {
      return res.status(400).send(
        message({
          statusCode: 400,
          data: req.body,
          message: 'Propinsi dengan ID yang diberikan tidak ditemukan!'
        })
      );
    }

    City.find({ provinceId, ...NOT_ARCHIVED }, { _id: 1 }, function (err, docs: any) {
      const ids = docs.map(function (doc: any) {
        return doc._id;
      });

      return Ponds.find(
        { cityId: { $in: ids }, userId, ...NOT_ARCHIVED, pondsName: { $regex: new RegExp(pondsName, 'i') } },
        function (err: any, docs: any) {
          return res.send(
            message({
              statusCode: 200,
              message: 'Tambak berhasil didapatkan',
              data: docs
            })
          );
        }
      );
    });
    return;
  } else if (cityId) {
    const isCityIdVal = objectIdValidator(cityId as string, 'User', true);
    if (isCityIdVal.error) {
      return res.status(401).send(
        message({
          statusCode: 401,
          data: req.body,
          message: 'City with given Id is not valid!'
        })
      );
    }

    const isCityExist = await City.findById(cityId);
    if (!isCityExist) {
      return res.status(400).send(
        message({
          statusCode: 400,
          data: req.body,
          message: 'City with given id is not exist!'
        })
      );
    }

    const ponds = await Ponds.find({
      pondsName: { $regex: new RegExp(pondsName, 'i') },
      cityId: cityId,
      userId,
      ...NOT_ARCHIVED
    })
      .limit(limit || 1 * 1)
      .skip((page - 1) * limit)
      .sort('-updatedAt')
      .exec();
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

  const ponds = await Ponds.find({ pondsName: { $regex: new RegExp(pondsName, 'i') }, userId, ...NOT_ARCHIVED })
    .limit(limit || 1 * 1)
    .skip((page - 1) * limit)
    .sort('-updatedAt')
    .exec();
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

export { getAllPonds };
