import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Auth routes (mounted on /api in index.js)
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', verifyToken, getProfile);

export default router;
