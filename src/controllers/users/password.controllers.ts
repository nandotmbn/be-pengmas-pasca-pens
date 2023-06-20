/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { Users } from '../../models';
import { extractToken } from '../../utils';
import { validateUpdatePassword } from '../../validators';
import message from '../../views/message';
import bcrypt from 'bcrypt';

async function userUpdatePassword(req: Request, res: Response) {
  const { error } = validateUpdatePassword(req.body);
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

  const isValid = await bcrypt.compare(req.body.oldPassword, isUserExist.password!);
  if (!isValid)
    return res.status(403).send(
      message({
        statusCode: 403,
        message: 'Invalid password',
        data: req.body
      })
    );

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

  isUserExist!.password = hashedPassword;

  res.send(
    message({
      statusCode: 200,
      message: 'You have successfully updated!',
      data: await isUserExist.save()
    })
  );
}

export { userUpdatePassword };
