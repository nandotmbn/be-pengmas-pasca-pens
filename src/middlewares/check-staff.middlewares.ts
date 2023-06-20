import { NextFunction, Request, Response } from 'express';
import { extractToken } from '../utils';
import message from '../views/message';

async function checkStaff(req: Request, res: Response, next: NextFunction) {
  const { error, result } = extractToken(
    req.headers.authorization,
    req.headers['accept-language'] == 'id-ID' ? true : false
  );
  if (error) {
    return res.status(403).send(
      message({
        statusCode: 403,
        data: req.body,
        message: error
      })
    );
  }
  if (result.role != 'Staff' && result.role != 'Admin' && result.role != 'Super Admin')
    return res.status(403).send(
      message({
        statusCode: 403,
        data: req.body,
        message: req.headers['accept-language'] == 'id-ID' ? 'Anda bukan seorang staf!' : "You're not Staff!"
      })
    );
  next();
}

export { checkStaff };
