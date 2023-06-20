/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { Users } from '../../models';
import { extractToken } from '../../utils';
import { validateUpdate } from '../../validators';
import message from '../../views/message';

async function userUpdate(req: Request, res: Response) {
  const { error } = validateUpdate(req.body);
  if (error)
    return res.status(400).send(
      message({
        statusCode: 400,
        message: error.message,
        data: 'Bad Request'
      })
    );

  const userId = extractToken(req.headers.authorization, false).result;
  const isUserExist = await Users.findById(userId._id);
  if (!isUserExist) {
    return res.status(400).send(
      message({
        statusCode: 400,
        message: 'Token is not valid',
        data: req.body
      })
    );
  }

  isUserExist!.fullName = req.body.fullName || isUserExist!.fullName;
  isUserExist!.username = req.body.username || isUserExist!.username;

  res.send(
    message({
      statusCode: 200,
      message: 'You have successfully updated!',
      data: await isUserExist.save()
    })
  );
}

export { userUpdate };
