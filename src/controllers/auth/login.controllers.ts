/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { Users } from '../../models';
import { validateLogin } from '../../validators';
import message from '../../views/message';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

async function login(req: Request, res: Response) {
  const { error } = validateLogin(req.body);
  if (error)
    return res.status(400).send(
      message({
        statusCode: 400,
        message: error.message,
        data: 'Bad Request'
      })
    );

  const isUserExist = await Users.findOne({
    username: req.body.username
  });
  if (!isUserExist) {
    return res.status(400).send(
      message({
        statusCode: 400,
        message:
          req.headers['accept-language'] == 'id-ID'
            ? 'Username atau email anda tidak valid'
            : 'Username or email is not valid',
        data: req.body
      })
    );
  }

  const isValid = await bcrypt.compare(req.body.password, isUserExist.password!);
  if (!isValid)
    return res.status(403).send(
      message({
        statusCode: 403,
        message: req.headers['accept-language'] == 'id-ID' ? 'Password tidak valid' : 'Invalid password',
        data: req.body
      })
    );

  dotEnv.config();
  res.header('x-auth-token', jwt.sign({ _id: isUserExist._id }, process.env.JWTPRIVATEKEY!)).send(
    message({
      statusCode: 200,
      message: req.headers['accept-language'] == 'id-ID' ? 'Anda berhasil masuk' : 'You have successfully logged in!',
      data: {
        data: isUserExist,
        access_token: jwt.sign({ _id: isUserExist._id }, process.env.JWTPRIVATEKEY!)
      }
    })
  );
}

export { login };
