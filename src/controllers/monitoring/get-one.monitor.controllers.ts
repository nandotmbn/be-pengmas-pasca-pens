import { Request, Response } from 'express';
import { Monitor } from '../../models';
import message from '../../views/message';

async function getOneMonitor(req: Request, res: Response) {
  const record = await Monitor.findById(req.params.recordId)
  if(!record) {
    res.status(404).send(message({
      statusCode: 404,
      message: "Pemantauan tidak ditemukan",
      data: req.query
    }))
  }
  return res.send(message({
    statusCode: 200,
    message: "Pemantauan berhasil didapatkan",
    data: record
  }));
}

export { getOneMonitor };
