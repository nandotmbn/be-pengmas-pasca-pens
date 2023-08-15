import { Request, Response } from 'express';
import { Monitor } from '../../models';
import message from '../../views/message';

async function getOneMonitor(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == "id-ID";
  const record = await Monitor.findById(req.params.recordId)
  if(!record) {
    res.status(404).send(message({
      statusCode: 404,
      message: isId ? "Pemantauan tidak ditemukan" : "Monitor is not found",
      data: req.query
    }))
  }
  return res.send(message({
    statusCode: 200,
    message: isId ? "Pemantauan berhasil didapatkan" : "Monitor is successfully found",
    data: record
  }));
}

export { getOneMonitor };
