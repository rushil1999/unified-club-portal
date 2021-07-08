import express from 'express';
import { getClubList, saveClub } from '../controllers/club';

const router = express.Router();

router.get('/', getClubList);
router.post('/', saveClub);
router.put('/', saveClub);

export default router;