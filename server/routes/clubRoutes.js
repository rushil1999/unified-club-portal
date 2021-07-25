import express from 'express';
import { getClubList, saveClub, getClubInfo, enrollMemberInClub, removeMemberFromClub } from '../controllers/clubController';
import { checkUserAccess } from '../services/authenticationService';

const router = express.Router();

router.get('/', checkUserAccess, getClubList);
router.get('/:id', checkUserAccess, getClubInfo);
router.post('/', checkUserAccess, saveClub);
router.put('/', checkUserAccess, saveClub);
router.put('/enroll', checkUserAccess, enrollMemberInClub);
router.put('/leave', checkUserAccess, removeMemberFromClub);

export default router;