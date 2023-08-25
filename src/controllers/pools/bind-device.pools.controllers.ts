/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Device, Pools, Users } from '../../models';
import { extractToken, NOT_ARCHIVED } from '../../utils';
import message from '../../views/message';
import { objectIdValidator } from '../../validators';

async function bindPoolsWithDevice(req: Request, res: Response) {
  const userId = extractToken(req.headers.authorization, false).result._id;
  const isIdValid = objectIdValidator(userId as string, 'User', true);
  if (isIdValid.error) {
    return res.status(401).send(
      message({
        statusCode: 401,
        data: req.body,
        message: 'Token tidak valid!'
      })
    );
  }

  const isUserExist = await Users.findById(userId);
  if (!isUserExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Pengguna dengan Token yang digunakan tidak ditemukan!'
      })
    );
  }

  if (!req.body.deviceName) {
    const poolWillBeUpdated = await Pools.findById(req.params.poolsId);

    poolWillBeUpdated!.deviceName = "";
    poolWillBeUpdated!.updatedAt = Date.now() as unknown as Date;

    return res.status(201).send(
      message({
        statusCode: 201,
        message: 'Kolam berhasil dilepaskan dengan perangkat ' + poolWillBeUpdated?.deviceName,
        data: await poolWillBeUpdated?.save()
      })
    );
  }

  const isDeviceExist = await Device.findOne({
    deviceName: req.body.deviceName,
    ...NOT_ARCHIVED
  });
  if (!isDeviceExist) {
    return res.status(404).send(
      message({
        statusCode: 404,
        data: req.body,
        message: 'Perangkat ini tidak terdaftar!'
      })
    );
  }

  const isPoolExist = await Pools.findOne({
    _id: { $ne: req.params.poolsId },
    userId,
    deviceName: req.body.deviceName,
    ...NOT_ARCHIVED
  });
  if (isPoolExist) {
    return res.status(400).send(
      message({
        statusCode: 400,
        data: req.body,
        message: 'Perangkat ini sudah digunakan oleh kolam lain!'
      })
    );
  }

  const poolWillBeUpdated = await Pools.findById(req.params.poolsId);

  poolWillBeUpdated!.deviceName = req.body.deviceName;
  poolWillBeUpdated!.updatedAt = Date.now() as unknown as Date;

  return res.status(201).send(
    message({
      statusCode: 201,
      message: 'Kolam berhasil ditautkan dengan perangkat ' + req.body.deviceName,
      data: await poolWillBeUpdated?.save()
    })
  );
}

export { bindPoolsWithDevice };
