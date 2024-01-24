import express from 'express';
import {protect} from '../middleware/authHandler.js'
import { addTransaction } from '../controllers/TransactionController.js';

const router = express.Router();

router.post('/new', protect, addTransaction )
export default router;