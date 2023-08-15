/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Ponds } from '../../models';
import { NOT_ARCHIVED } from '../../utils';
import message from '../../views/message';

async function getPondsById(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID';
  const ponds = await Ponds.findOne({_id: req.params.pondsId, ...NOT_ARCHIVED});
  if (!ponds) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Tambak tidak ditemukan' : 'Ponds are not found',
        data: req.query
      })
    );
  }
  
  return res.send(
    message({
      statusCode: 200,
      message: isId ? 'Tambak berhasil didapatkan' : 'Ponds are successfully found',
      data: ponds
    })
  );
}

export { getPondsById };
