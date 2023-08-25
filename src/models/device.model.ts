/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    min: 0
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Device = mongoose.model('Device', DeviceSchema);

export { Device };
