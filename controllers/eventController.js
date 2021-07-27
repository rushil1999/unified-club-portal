import mongoose from 'mongoose';
import Event from '../models/event';
import Club from '../models/club';
import User from '../models/user';
import Resource from '../models/resource';
import Feedback from '../models/feedback';
import { sendEventRegisterationMail } from '../services/emailService';

export const saveEvent = async (req, res) => {
  let event;
  try {
    const { clubId } = req.body;
    const club = await Club.findById(clubId);
    if (club) {

      if (req.body['_id']) {
        event = await Event.findById(req.body['_id']).exec();

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

        if (req.file) {
          const { originalname: fileName, mimetype: type, path } = req.file;
          const extension = fileName.split('.').pop();
          const resource = new Resource({ fileName, type, path, extension });
          await resource.save();
          event.publicFiles.push(resource['_id']);
          //functionality to update event poster as well...needs some work
          // else{
          //   const currentResourceId = event.publicFiles[0]['_id'];
          //   console.log(currentResourceId);
          //   await Resource.findByIdAndDelete(currentResourceId);
          //   event.publicFiles = [];
          //   event.publicFiles.push(resource['_id']);
          // }
        }
      }

      await event.save();
      if (!req.body['_id']) {
        club.events.push(event['_id']); //updating club data object as well
        await club.save();
      }
      res.status(201).json({
        success: true,
        data: event
      });
    }
    else {
      res.status(404).json({
        errors: ['Entity Not found']
      })
    }
  }
  catch (err) {
    console.log('Catch', err.message);
    res.status(500).json({
      errors: [err.message]
    });
  }
}

export const getEventInfo = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId).exec();
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
      if (event) {
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

export const registerUserToEvent = async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    const user = await User.findById(userId).exec();
    const event = await Event.findById(eventId).exec();
    if (user && event) {
      if ((event.participants || []).length + 1 > event.capacity) {
        res.status(412).json({
          message: 'Limit Exceeded'
        })
      }
      else {
        if ((event.participants || []).includes(userId)) {
          res.status(412).json({
            message: 'Limit Exceeded'
          })
        }
        else {
          event.participants.push(user['_id']);
          user.registeredEvents.push(event.id);
          await event.save();
          await user.save();
          const emailReponse = sendEventRegisterationMail(event);
          res.status(200).json({
            success: true,
            data: event
          })
        }

      }
    }
    else {
      res.status(404).json({
        errors: ['Entity Not Found']
      })
    }
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({
      errors: [err.message]
    });
  }
}

export const saveFeedback = async (req, res) => {
  const { userId, eventId, stars, comments } = req.body;
  try {
    const feedback = await Feedback.find({ userId, eventId });
    if (feedback.length === 0) {
      const newFeedback = new Feedback({ userId, eventId, stars, comments });
      await newFeedback.save();
      res.status(201).json({
        success: true,
        data: newFeedback
      })
    }
    else {
      res.status(409).json({
        errors: ['Entity Already Existits']
      })
    }
  }
  catch (err) {
    console.log('Catch', err.message);
    return res.status(500).json({
      errors: [err.message],
    });
  }
}

export const getUserFeedbackForEvent = async (req, res) => {
  const { userId, eventId } = req.params;
  try {
    const feedback = await Feedback.find({ userId, eventId });
    if (feedback.length > 0) {
      return res.status(200).json({
        success: true,
        data: feedback[0]
      })
    }
    else {
      return res.status(200).json({
        success: false,
      })
    }
  }
  catch (err) {
    console.log('Catch', err.message);
    return res.status(500).json({
      errors: [err.message]
    })
  }
}

export const getEventsFeedbacks = async (req, res) => {
  const { eventId }= req.params;
  try {
    const feedback = await Feedback.find({ eventId });
    if (feedback.length > 0) {
      return res.status(200).json({
        success: true,
        data: feedback
      })
    }
    else {
      return res.status(404).json({
        errors: ['Entity Not Found']
      })
    }
  }
  catch (err) {
    console.log('Catch', err.message);
    return res.status(500).json({
      errors: [err.message]
    })
  }
}