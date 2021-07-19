import express from 'express';
import { checkUserAccess } from '../services/authenticationService';
import { saveEvent, getEvents } from '../controllers/eventController';

const router = express.Router();

router.post('/', checkUserAccess, saveEvent);
router.post('/list', checkUserAccess, getEvents);

export default router;