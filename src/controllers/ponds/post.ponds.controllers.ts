/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City, Ponds, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import message from '../../views/message';
import { objectIdValidator } from '../../validators';
import _ from 'lodash';

async function createPondsByUser(req: Request, res: Response) {
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
        message: 'City by given ID is not found!'
      })
    );
  }

  const isPondExist = await Ponds.findOne({
    pondsName: req.body.pondsName,
    cityId: req.body.cityId,
    userId: userId,
    ...NOT_ARCHIVED
  })

  if(isPondExist) {
    return res.status(400).send(
      message({
        statusCode: 400,
        data: req.body,
        message: 'Pond with given name has been initialized!'
      })
    );
  }

  new Ponds({
    ...req.body,
    userId
  }).save();

  return res.status(201).send(
    message({
      statusCode: 201,
      message: isId ? 'Tambak berhasil didapatkan' : 'Ponds are successfully found',
      data: {
        ...{
          ..._.omit(req.body, ["cityId"]),
        },
        city: _.pick(isCityExist, ["cityName", "_id", "latitude", "longitude"])
      }
    })
  );
}

export { createPondsByUser };
