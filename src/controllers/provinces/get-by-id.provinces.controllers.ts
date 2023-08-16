/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Province } from '../../models';
import message from '../../views/message';

async function getProvinceById(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID';
  const provinces = await Province.findById(req.params.provinceId);
  if (!provinces) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Provinsi tidak ditemukan' : 'Provinces are not found',
        data: req.query
      })
    );
  }
  return res.send(
    message({
      statusCode: 200,
      message: isId ? 'Provinsi berhasil didapatkan' : 'Provinces are successfully found',
      data: provinces
    })
  );
}

export { getProvinceById };
