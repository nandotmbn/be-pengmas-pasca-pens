/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
  cityName: {
    type: String,
    min: 0
  },
  provinceId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
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

const City = mongoose.model('City', CitySchema);

export { City };
