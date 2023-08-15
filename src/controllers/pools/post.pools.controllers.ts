/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Ponds, Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import message from '../../views/message';
import { objectIdValidator } from '../../validators';

async function createPoolsByUser(req: Request, res: Response) {
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

  const isPondsExist = await Ponds.findOne({ _id: req.body.pondsId, ...NOT_ARCHIVED });
  if (!isPondsExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Pond by given ID is not found!'
      })
    );
  }

  const isPoolExist = await Pools.findOne({
    pondsId: req.body.pondsId,
    poolsName: req.body.poolsName,
    userId,
    ...NOT_ARCHIVED
  });
  if (isPoolExist) {
    return res.status(400).send(
      message({
        statusCode: 400,
        data: req.body,
        message: 'Pool by given name is actually exists!'
      })
    );
  }

  const newPool = new Pools({
    ...req.body,
    userId
  });

  return res.status(201).send(
    message({
      statusCode: 201,
      message: isId ? 'Kolam berhasil dibuat' : 'Pools are successfully created',
      data: await newPool.save()
    })
  );
}

export { createPoolsByUser };
