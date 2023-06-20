import { Request, Response } from 'express';
import { Users } from '../../models';
import message from '../../views/message';
import { extractToken, keyHasher } from '../../utils';

async function apiKeyUpdate(req: Request, res: Response) {
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

  let isApiExist = true;
  let apiKey = '';

  while (isApiExist) {
    const _apiKey: string = keyHasher(8);
    const _isApiExist = await Users.findOne({
      apiKey: _apiKey
    });
    isApiExist = _isApiExist ? true : false;
    apiKey = _apiKey;
  }

  isUserExist.apiKey = apiKey

  const user = (await isUserExist.save()).toObject();
  res.status(201).send(
    message({
      statusCode: 201,
      message: 'User API key has successfully updated',
      data: {
        ...user
      }
    })
  );
}

export { apiKeyUpdate };
