import express from 'express';
import {protect} from '../middleware/authHandler.js'
import { addTransaction, getAllTransaction } from '../controllers/TransactionController.js';

const router = express.Router();

router.post('/new', protect, addTransaction );
router.get('/',protect, getAllTransaction);
router.get('/:typeId',protect, getAllTransaction);

export default router;