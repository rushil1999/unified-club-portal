import express from 'express';
import { getClubList, saveClub } from '../controllers/clubController';
import { checkUserAccess } from '../services/authenticationService';

const router = express.Router();

router.get('/', checkUserAccess, getClubList);
router.post('/', checkUserAccess, saveClub);
router.put('/', checkUserAccess, saveClub);

export default router;