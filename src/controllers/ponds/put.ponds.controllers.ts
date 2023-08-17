/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City, Ponds, Users } from '../../models';
import { extractToken } from '../../utils';
import message from '../../views/message';
import { objectIdValidator } from '../../validators';

async function updatePondsByUser(req: Request, res: Response) {
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
        message: 'User dengan Token yang dipakai tidak ditemukan!'
      })
    );
  }
  
  const isCityExist = await City.findById(req.body.cityId);
  if (!isCityExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Kota dengan Id yang diberikan tidak ditemukan!'
      })
    );
  }

  const isPondsExist = await Ponds.findOne({_id: req.params.pondsId, userId});
  if (!isPondsExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Tambak dengan Id yang diberikan tidak ditemukan!'
      })
    );
  }

  isPondsExist.pondsName = req.body.pondsName;
  isPondsExist.cityId = req.body.cityId;
  isPondsExist.updatedAt = Date.now() as unknown as Date;

  return res.status(201).send(
    message({
      statusCode: 201,
      message: 'Tambak berhasil diperbaharui',
      data: await isPondsExist.save()
    })
  );
}

export { updatePondsByUser };
