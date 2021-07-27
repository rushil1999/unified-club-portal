import mongoose from 'mongoose';

const resourceSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  extension: {
    type: String
  }
}, {timestamps: true});

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;