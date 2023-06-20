/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Record } from '../../models';
import message from '../../views/message';

async function deleteOneRecord(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID';
  const record = await Record.findById(req.params.recordId);
  if (!record) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Record tidak ditemukan' : 'Record is not found',
        data: req.query
      })
    );
  }
  Record.findByIdAndDelete(req.params.recordId)
    .then(function () {
      return res.status(200).send(
        message({
          statusCode: 200,
          message: isId ? 'Record berhasil dihapus' : 'Record is successfully deleted',
          data: record
        })
      );
    })
    .catch(function (error: any) {
      return res.status(500).send(
        message({
          statusCode: 500,
          message: isId ? 'Record gagal dihapus, coba sesaat lagi' : 'Record is failed to delete, try soon',
          data: error
        })
      );
    });
}

export { deleteOneRecord };
