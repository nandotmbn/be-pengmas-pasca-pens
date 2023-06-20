import { Request, Response } from 'express';
import { Record, Users } from '../../models';
import { extractToken } from '../../utils';
import message from '../../views/message';

async function getAllRecordToday(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID';
  const userId = extractToken(req.headers.authorization, false).result;
  const isUserExist = await Users.findById(userId);
  if (!isUserExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'User by given Token is not found!'
      })
    );
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const record = await Record.find({ userId, createdAt: {$gte: startOfToday} });

  if (!record.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Record tidak ditemukan' : 'Record are not found',
        data: req.query
      })
    );
  }
  return res.send(
    message({
      statusCode: 200,
      message: isId ? 'Record berhasil didapatkan' : 'Record are successfully found',
      data: record
    })
  );
}

export { getAllRecordToday };
