import express from 'express';
import { registerUser, loginUser, getMe, getUser } from '../controllers/UserController.js';
import { protect } from '../middleware/authHandler.js';
import { registerValidation } from '../middleware/validationHandler.js';

const router = express.Router();


router.post('/new', registerValidation, registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/', getUser);

export default router;