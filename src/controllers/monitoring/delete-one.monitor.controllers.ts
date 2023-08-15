/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Monitor } from '../../models';
import message from '../../views/message';

async function deleteOneMonitor(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID';
  const record = await Monitor.findById(req.params.recordId);
  if (!record) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Monitor tidak ditemukan' : 'Monitor is not found',
        data: req.query
      })
    );
  }
  Monitor.findByIdAndDelete(req.params.recordId)
    .then(function () {
      return res.status(200).send(
        message({
          statusCode: 200,
          message: isId ? 'Monitor berhasil dihapus' : 'Monitor is successfully deleted',
          data: record
        })
      );
    })
    .catch(function (error: any) {
      return res.status(500).send(
        message({
          statusCode: 500,
          message: isId ? 'Monitor gagal dihapus, coba sesaat lagi' : 'Monitor is failed to delete, try soon',
          data: error
        })
      );
    });
}

export { deleteOneMonitor };
