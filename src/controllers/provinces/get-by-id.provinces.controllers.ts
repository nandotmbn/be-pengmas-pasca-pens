/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Province } from '../../models';
import message from '../../views/message';

async function getProvinceById(req: Request, res: Response) {
  const provinces = await Province.findById(req.params.provinceId);
  if (!provinces) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'Propinsi tidak ditemukan!',
        data: req.query
      })
    );
  }
  return res.send(
    message({
      statusCode: 200,
      message: 'Propinsi berhasil didapatkan!',
      data: provinces
    })
  );
}

export { getProvinceById };
