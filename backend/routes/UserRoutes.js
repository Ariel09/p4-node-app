import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/UserController.js';

const router = express.Router();
import { protect } from '../middleware/authHandler.js';

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;