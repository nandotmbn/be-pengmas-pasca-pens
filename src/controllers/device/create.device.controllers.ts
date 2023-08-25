/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { Device } from '../../models';
import { keyHasher } from '../../utils';

async function createDevice(req: Request, res: Response) {
  let deviceName = keyHasher(6);

  let isExist = true;

  while (isExist) {
    const isDeviceExist = await Device.findOne({ deviceName });
    if (isDeviceExist) {
      deviceName = keyHasher(6);
    } else {
      isExist = false;
    }
  }

  await new Device({
    deviceName
  }).save();

  QRCode.toDataURL(deviceName).then((url) => {
    res.send(`
      <h2 style="width:100%;text-align:center">Aquaculture PENS</h2>
      <h2 style="width:100%;text-align:center">QR Code Generator for Device</h2>
      <h2 style="width:100%;text-align:center">Name = ${deviceName}</h2>
      <div style="width:100%;text-align:center"><img width="400px" height="400px" center src='${url}'/></div>
    `);
  });
}

export { createDevice };
