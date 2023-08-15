/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const PoolsSchema = new mongoose.Schema({
  poolsName: {
    type: String,
    min: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  pondsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ponds'
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

const Pools = mongoose.model('Pools', PoolsSchema);

export { Pools };
