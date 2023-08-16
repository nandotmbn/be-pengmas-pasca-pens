/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City, Ponds, Province, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function getAllPonds(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID';
  const pondsName: string = (req.query.pondsName as string) || '';
  const provinceId: string = (req.query.provinceId as string) || '';
  const cityId: string = (req.query.cityId as string) || '';

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
    );
  }

  if (provinceId) {
    const isProvIdVal = objectIdValidator(provinceId as string, 'User', isId);
    if (isProvIdVal.error) {
      return res.status(400).send(
        message({
          statusCode: 400,
          data: req.body,
          message: 'Province with given Id is not valid!'
        })
      );
    }

    const isProvinceExist = await Province.findById(provinceId);
    if (!isProvinceExist) {
      return res.status(400).send(
        message({
          statusCode: 400,
          data: req.body,
          message: 'Province with given id is not exist!'
        })
      );
    }

    return await City.find({ provinceId, ...NOT_ARCHIVED }, { _id: 1 }, function (err, docs: any) {
      const ids = docs.map(function (doc: any) {
        return doc._id;
      });

      return Ponds.find(
        { cityId: { $in: ids }, userId, ...NOT_ARCHIVED, pondsName: { $regex: new RegExp(pondsName, 'i') } },
        function (err: any, docs: any) {
          return res.send(
            message({
              statusCode: 200,
              message: isId ? 'Tambak berhasil didapatkan' : 'Ponds are successfully found',
              data: docs
            })
          );
        }
      );
    });
  } else if (cityId) {
    const isCityIdVal = objectIdValidator(cityId as string, 'User', isId);
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
    });
    if (!ponds.length) {
      return res.status(404).send(
        message({
          statusCode: 404,
          message: isId ? 'Tambak tidak ditemukan' : 'Ponds are not found',
          data: req.query
        })
      );
    }

    return res.send(
      message({
        statusCode: 200,
        message: isId ? 'Tambak berhasil didapatkan' : 'Ponds are successfully found',
        data: ponds
      })
    );
  }

  const ponds = await Ponds.find({ pondsName: { $regex: new RegExp(pondsName, 'i') }, userId, ...NOT_ARCHIVED });
  if (!ponds.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Tambak tidak ditemukan' : 'Ponds are not found',
        data: req.query
      })
    );
  }
  return res.send(
    message({
      statusCode: 200,
      message: isId ? 'Tambak berhasil didapatkan' : 'Ponds are successfully found',
      data: ponds
    })
  );
}

export { getAllPonds };
