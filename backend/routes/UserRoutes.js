import express from 'express';
import { registerUser, loginUser, getMe, getUser } from '../controllers/UserController.js';

const router = express.Router();
import { protect } from '../middleware/authHandler.js';

router.post('/new', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', getUser);

export default router;