/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City, Ponds, Users } from '../../models';
import { extractToken } from '../../utils';
import message from '../../views/message';
import { objectIdValidator } from '../../validators';

async function updatePondsByUser(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID';

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
  
  const isCityExist = await City.findById(req.body.cityId);
  if (!isCityExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'City by given Id is not found!'
      })
    );
  }

  const isPondsExist = await Ponds.findOne({_id: req.params.pondsId, userId});
  if (!isPondsExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Ponds by given ID is not found!'
      })
    );
  }

  isPondsExist.pondsName = req.body.pondsName;
  isPondsExist.cityId = req.body.cityId;
  isPondsExist.updatedAt = Date.now() as unknown as Date;

  return res.status(201).send(
    message({
      statusCode: 201,
      message: isId ? 'Tambak berhasil diupdate' : 'Ponds are successfully updated',
      data: await isPondsExist.save()
    })
  );
}

export { updatePondsByUser };
