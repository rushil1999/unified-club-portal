import mongoose from 'mongoose';
import Event from '../models/event';
import Club from '../models/club';

export const saveEvent = async (req, res) => {
  let event;
  try {
    const { clubId } = req.body;
    const club = await Club.findById(clubId);
    if (club) {
      if (req.body.hasOwnProperty['_id']) {
        event = await Event.finfById(req.body['_id']).exec();
        if (!event) {
          res.status(404).json({
            errors: ['Entity Not found']
          })
        }
        else {
          const updates = Object.keys(req.body);
          updates.forEach(update => {
            event[update] = req.body[update]
          })
        }
      }
      else {
        event = new Event({ _id: new mongoose.Types.ObjectId(), ...req.body });
      }
      await event.save();
      club.events.push(event['_id']); //updating club data object as well
      await club.save();
      res.status(201).json({
        success: true,
        data: event
      });
    }
    else{
      res.status(404).json({
        errors: ['Entity Not found']
      })
    }
  }
  catch (err) {
    console.log('Catch', err);
    res.status(500).json({
      errors: [err.message]
    });
  }
}

export const getEventInfo = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.finfById(eventId).exec();
    if (!event) {
      res.status(404).json({
        errors: ['Entity Not found']
      })
    }
    else {
      res.status(200).json({
        success: true,
        data: event
      });
    }
  }
  catch (err) {
    res.status(500).json({
      errors: [err.message]
    })
  }
}

export const getEvents = async (req, res) => {
  const { ids } = req.body;
  try {
    const events = ids.map(async id => {
      const event = await Event.findById(id).exec();
      if(event){
        return event;
      }
    });
    const eventList = await Promise.all(events);
    res.status(200).json({
      success: true,
      data: eventList
    })
  }
  catch (err) {
    res.status(500).json({ errors: [err.message] })
  }
}
