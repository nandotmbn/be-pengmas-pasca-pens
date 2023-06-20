import { Request, Response } from 'express';
import { Record } from '../../models';
import message from '../../views/message';

async function getOneRecord(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == "id-ID";
  const record = await Record.findById(req.params.recordId)
  if(!record) {
    res.status(404).send(message({
      statusCode: 404,
      message: isId ? "Berita tidak ditemukan" : "Record is not found",
      data: req.query
    }))
  }
  return res.send(message({
    statusCode: 200,
    message: isId ? "Berita berhasil didapatkan" : "Record is successfully found",
    data: record
  }));
}

export { getOneRecord };
