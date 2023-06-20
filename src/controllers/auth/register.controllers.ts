import { Request, Response } from 'express';
import { Users } from '../../models';
import { validateRegister } from '../../validators';
import message from '../../views/message';
import bcrypt from 'bcrypt';
import { keyHasher } from '../../utils';

async function register(req: Request, res: Response) {
  const { error } = validateRegister(req.body);
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
  if (isUserExist) {
    return res.status(400).send(
      message({
        statusCode: 400,
        message: 'User with given username had been registered',
        data: req.body
      })
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let isApiExist = true;
  let apiKey = "";
  
  while(isApiExist) {
    const _apiKey: string = keyHasher(8);
    const _isApiExist = await Users.findOne({
      apiKey: _apiKey
    });
    isApiExist = _isApiExist ? true : false
    apiKey = _apiKey
  }

  const newUser = new Users({
    ...req.body,
    apiKey,
    password: hashedPassword,
    isActive: true
  });

  const user = (await newUser.save()).toObject();
  res.status(201).send(
    message({
      statusCode: 201,
      message: 'User successfully registered',
      data: {
        ...user
      }
    })
  );
}

export { register };
