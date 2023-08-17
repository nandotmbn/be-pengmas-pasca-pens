/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Ponds } from '../../models';
import { NOT_ARCHIVED } from '../../utils';
import message from '../../views/message';

async function deletePondsById(req: Request, res: Response) {
  const ponds = await Ponds.findOne({_id: req.params.pondsId, ...NOT_ARCHIVED});
  if (!ponds) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'Tambak tidak ditemukan',
        data: req.query
      })
    );
  }

  ponds.isArchived = true;
  
  return res.send(
    message({
      statusCode: 200,
      message: 'Tambak berhasil dihapus',
      data: await ponds.save()
    })
  );
}

export { deletePondsById };
