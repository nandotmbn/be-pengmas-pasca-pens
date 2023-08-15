/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { City } from '../../models';
import message from '../../views/message';

async function getAllCity(req: Request, res: Response) {
  const isId = req.headers['accept-language'] == 'id-ID';
  const cityName: string = (req.query.cityName as string) || '';

  const cities = await City.find({cityName: { $regex: new RegExp(cityName, 'i') }});
  if (!cities.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: isId ? 'Kota tidak ditemukan' : 'City are not found',
        data: req.query
      })
    );
  }
  return res.send(
    message({
      statusCode: 200,
      message: isId ? 'Kota berhasil didapatkan' : 'City are successfully found',
      data: cities
    })
  );
}

export { getAllCity };
