/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City, Ponds, Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import message from '../../views/message';
import { objectIdValidator } from '../../validators';

async function updatePoolByUser(req: Request, res: Response) {
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

  const isPondsExist = await Ponds.findOne({ _id: req.body.pondsId, ...NOT_ARCHIVED, userId });
  if (!isPondsExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Ponds by given ID is not found!'
      })
    );
  }

  const isCityExist = City.findById(req.body.cityId);
  if (!isCityExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'City with given Id is not found!',
        data: req.body
      })
    );
  }

  const isPoolExist = await Pools.findOne({
    userId,
    poolsName: req.body.poolsName,
    pondsId: req.body.pondsId,
    ...NOT_ARCHIVED,
  });
  if (isPoolExist) {
    return res.status(400).send(
      message({
        statusCode: 400,
        data: req.body,
        message: 'Pools by name is already set!'
      })
    );
  }

  const poolWillBeUpdated = await Pools.findById(req.params.poolsId);

  poolWillBeUpdated!.poolsName = req.body.poolsName;
  poolWillBeUpdated!.pondsId = req.body.pondsId;
  poolWillBeUpdated!.updatedAt = Date.now() as unknown as Date;

  return res.status(201).send(
    message({
      statusCode: 201,
      message: isId ? 'Tambak berhasil diupdate' : 'Ponds are successfully updated',
      data: await poolWillBeUpdated?.save()
    })
  );
}

export { updatePoolByUser };
