import mongoose from 'mongoose';

const clubSchema = mongoose.Schema({
  _id: { 
    type: mongoose.Types.ObjectId 
  } ,
  name: { 
    type: String, 
    required: true 
  },
  desc: { 
    type: String, 
    required: true 
  },
  memberCapacity: { 
    type: Number 
  },
  clubHandlers: [{ 
    type: mongoose.Types.ObjectId
  }],
  clubType: {
    type: String, required: true
  },
  members: [{
    type: mongoose.Types.ObjectId
  }],
  events: [{
    type: mongoose.Types.ObjectId
  }]
},{ timestamps: true });

const Club = mongoose.model('Club', clubSchema);

export default Club;