/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import { objectIdValidator } from '../../validators';
import message from '../../views/message';

async function deletePoolsById(req: Request, res: Response) {
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
    )
  }

  const pools = await Pools.findOne({_id: req.params.poolsId, ...NOT_ARCHIVED, userId});
  if (!pools) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Kolam tidak ditemukan' : 'Pools are not found',
        data: req.query
      })
    );
  }

  pools.isArchived = true;
  
  return res.send(
    message({
      statusCode: 200,
      message: isId ? 'Kolam berhasil dihapus' : 'Pools are successfully deleted',
      data: await pools.save()
    })
  );
}

export { deletePoolsById };
