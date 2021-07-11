import mongoose from 'mongoose';
import Club from '../models/club';

export const getClubList = async (req, res) => {
  try{
    const clubs = await Club.find({});
    res.send(clubs);
    res.status(200).send(club);
  } 
  catch {
    res.status(500).send();
  } 
};

export const getClubInfo = async (req, res) => {
  try{
    const clubId = req.params.id;
    const club = await Club.findById(clubId).exec();
    res.status(200).send(club);
  } 
  catch(err) {
    res.status(500).json({errors: [err.message]});
  } 
};

export const saveClub = async (req, res) => {
  let club;
  try{
    if(req.body.hasOwnProperty('_id')){
      club = await Club.findById(req.body['_id']);
      if (!club) {
        return res.status(404).send()
      }
      const updates = Object.keys(req.body);
      updates.forEach((update) => {
        club[update] = req.body[update]
      })
    }
    else{
      club = new Club({_id: new mongoose.Types.ObjectId, ...req.body});
    } 
    await club.save();
    res.status(201).send(club);
  }
  catch(err) {
    res.status(500).send(err.message);
  }
}