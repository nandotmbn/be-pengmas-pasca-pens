/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const ProvinceSchema = new mongoose.Schema({
  provinceName: {
    type: String,
    min: 0
  },
  latitude: {
    type: String,
    min: 0
  },
  longitude: {
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

const Province = mongoose.model('Province', ProvinceSchema);

export { Province };
