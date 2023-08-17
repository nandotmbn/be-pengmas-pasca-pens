/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City } from '../../models';
import message from '../../views/message';

async function getCityByProvinceId(req: Request, res: Response) {
  const city = await City.find({provinceId: req.params.provinceId});
  if (!city.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'Kota tidak ditemukan',
        data: req.query
      })
    );
  }
  
  return res.send(
    message({
      statusCode: 200,
      message: 'Kota berhasil didapatkan',
      data: city
    })
  );
}

export { getCityByProvinceId };
