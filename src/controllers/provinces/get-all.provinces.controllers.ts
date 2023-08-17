/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Province } from '../../models';
import message from '../../views/message';

async function getAllProvinces(req: Request, res: Response) {
  const provinceName: string = (req.query.provinceName as string) || '';

  const provinces = await Province.find({ provinceName: { $regex: new RegExp(provinceName, 'i') } });
  if (!provinces.length) {
    return res.status(404).send(
      message({
        statusCode: 404,
        message: 'Provinsi tidak ditemukan',
        data: req.query
      })
    );
  }
  return res.send(
    message({
      statusCode: 200,
      message: 'Provinsi berhasil didapatkan',
      data: provinces
    })
  );
}

export { getAllProvinces };
