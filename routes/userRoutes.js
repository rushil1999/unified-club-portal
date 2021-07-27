import express from 'express';
import { getUserList } from '../controllers/userController';
import { checkUserAccess } from '../services/authenticationService';

const router = express.Router();

router.post('/userList', checkUserAccess, getUserList);

export default router;