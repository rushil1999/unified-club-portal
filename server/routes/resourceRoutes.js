import express from 'express';
import { getResource } from '../controllers/resourceController';
import { checkUserAccess } from '../services/authenticationService';

const router = express.Router();

router.get('/:id', checkUserAccess, getResource);

export default router;