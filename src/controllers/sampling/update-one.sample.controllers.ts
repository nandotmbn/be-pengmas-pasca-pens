/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { Sample } from '../../models';
import { validatePostRecord } from '../../validators';
import message from '../../views/message';

async function updateSample(req: Request, res: Response) {
  const { error } = validatePostRecord(req.body);
  if (error) {
    return res.status(400).send(
      message({
        statusCode: 400,
        data: req.body,
        message: error.message
      })
    );
  }
  const record = await Sample.findById(req.params.RecordId)
  if(!record) {
    return res.status(404).send(message({
      statusCode: 404,
      message: "Sample tidak ditemukan",
      data: req.query
    }))
  }

  record!.salinity = req.body.salinity || record?.salinity
  record!.oxygen = req.body.oxygen || record?.oxygen
  record!.temperature = req.body.temperature || record?.temperature
  record!.acidity = req.body.acidity || record?.acidity
  record!.updatedAt = Date.now() as unknown as Date

  const updatedRecord = await record?.save()
  res.send(message({
    statusCode: 201,
    message: "Sample berhasil diperbarui",
    data: updatedRecord
  }))
}

export { updateSample };
