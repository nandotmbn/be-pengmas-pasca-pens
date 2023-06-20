/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { keyHasher } from '../utils';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    min: 0
  },
  username: {
    type: String,
    min: 0
  },
  password: {
    type: String,
    max: 255,
    min: 0,
    unique: true
  },
  apiKey: {
    type: String,
    unique: true,
    default: () => keyHasher(8)
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

const Users = mongoose.model('Users', UserSchema);

export { Users };
