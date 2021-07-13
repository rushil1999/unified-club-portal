import express from 'express';
import { signup, signin, checkTokenValidation } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/verifyToken/:token', checkTokenValidation);

export default router;