import { Request, Response } from 'express';
import { Sample } from '../../models';
import message from '../../views/message';

async function getOneSample(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == "id-ID";
  const record = await Sample.findById(req.params.recordId)
  if(!record) {
    res.status(404).send(message({
      statusCode: 404,
      message: isId ? "Pemantauan tidak ditemukan" : "Sample is not found",
      data: req.query
    }))
  }
  return res.send(message({
    statusCode: 200,
    message: isId ? "Pemantauan berhasil didapatkan" : "Sample is successfully found",
    data: record
  }));
}

export { getOneSample };
