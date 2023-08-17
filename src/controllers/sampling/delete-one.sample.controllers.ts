/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Sample } from '../../models';
import message from '../../views/message';

async function deleteOneSample(req: Request, res: Response) {
  const isId = true;
  const record = await Sample.findById(req.params.recordId);
  if (!record) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Sample tidak ditemukan' : 'Sample is not found',
        data: req.query
      })
    );
  }
  Sample.findByIdAndDelete(req.params.recordId)
    .then(function () {
      return res.status(200).send(
        message({
          statusCode: 200,
          message: isId ? 'Sample berhasil dihapus' : 'Sample is successfully deleted',
          data: record
        })
      );
    })
    .catch(function (error: any) {
      return res.status(500).send(
        message({
          statusCode: 500,
          message: isId ? 'Sample gagal dihapus, coba sesaat lagi' : 'Sample is failed to delete, try soon',
          data: error
        })
      );
    });
}

export { deleteOneSample };
