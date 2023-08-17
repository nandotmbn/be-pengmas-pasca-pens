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
        message: 'Username atau email anda tidak valid',
        data: req.body
      })
    );
  }

  const isValid = await bcrypt.compare(req.body.password, isUserExist.password!);
  if (!isValid)
    return res.status(403).send(
      message({
        statusCode: 403,
        message: 'Password tidak valid',
        data: req.body
      })
    );

  dotEnv.config();
  res.header('x-auth-token', jwt.sign({ _id: isUserExist._id }, process.env.JWTPRIVATEKEY!)).send(
    message({
      statusCode: 200,
      message: 'Anda berhasil masuk',
      data: {
        data: isUserExist,
        access_token: jwt.sign({ _id: isUserExist._id }, process.env.JWTPRIVATEKEY!)
      }
    })
  );
}

export { login };
