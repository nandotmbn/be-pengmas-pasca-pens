/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Monitor } from '../../models';
import message from '../../views/message';

async function deleteOneMonitor(req: Request, res: Response) {
  const record = await Monitor.findById(req.params.recordId);
  if (!record) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'Monitor tidak ditemukan',
        data: req.query
      })
    );
  }
  Monitor.findByIdAndDelete(req.params.recordId)
    .then(function () {
      return res.status(200).send(
        message({
          statusCode: 200,
          message: 'Monitor berhasil dihapus',
          data: record
        })
      );
    })
    .catch(function (error: any) {
      return res.status(500).send(
        message({
          statusCode: 500,
          message: 'Monitor gagal dihapus, coba sesaat lagi',
          data: error
        })
      );
    });
}

export { deleteOneMonitor };
