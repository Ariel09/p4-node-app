import express from 'express';
import {protect} from '../middleware/authHandler.js'
import { addTransaction, deleteTransaction, getAllTransaction } from '../controllers/TransactionController.js';

const router = express.Router();

router.post('/new', protect, addTransaction );
router.get('/',protect, getAllTransaction);
router.get('/:typeId',protect, getAllTransaction);
router.delete('/:typeId', protect, deleteTransaction);

export default router;