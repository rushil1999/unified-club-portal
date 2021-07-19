import express from 'express';
import { checkUserAccess } from '../services/authenticationService';
import { saveEvent, getEvents, getEventInfo, registerUserToEvent } from '../controllers/eventController';

const router = express.Router();

router.post('/', checkUserAccess, saveEvent);
router.post('/list', checkUserAccess, getEvents);
router.get('/:id', checkUserAccess, getEventInfo);
router.post('/register', checkUserAccess, registerUserToEvent);

export default router;