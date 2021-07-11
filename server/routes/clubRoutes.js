import express from 'express';
import { getClubList, saveClub, getClubInfo } from '../controllers/clubController';
import { checkUserAccess } from '../services/authenticationService';

const router = express.Router();

router.get('/', checkUserAccess, getClubList);
router.get('/:id', checkUserAccess, getClubInfo);
router.post('/', checkUserAccess, saveClub);
router.put('/', checkUserAccess, saveClub);

export default router;