/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const PondsSchema = new mongoose.Schema({
  pondsName: {
    type: String,
    min: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
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

const Ponds = mongoose.model('Ponds', PondsSchema);

export { Ponds };
