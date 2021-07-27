import mongoose, { Schema } from 'mongoose';

const eventSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
  clubId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc:{
    type: String,
    required: true,
  },
  capacity: {
    type: Number
  },
  from: {
    type: Schema.Types.Date,
    required: true,
  },
  to: {
    type: Schema.Types.Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  participants: [{
    type: mongoose.Types.ObjectId 
  }],
  status: [{
    type: String
  }],
  privateFiles: [{
    types: String
  }],
  publicFiles: [{
    types: String
  }]
},{ timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;