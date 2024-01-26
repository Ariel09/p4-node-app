import express from 'express';
import {protect} from '../middleware/authHandler.js'
import { addTransaction, deleteTransaction, getAllTransaction, updateTransaction, viewTransaction } from '../controllers/TransactionController.js';

const router = express.Router();

router.post('/new', protect, addTransaction );
router.get('/',protect, getAllTransaction);
router.get('/:typeId',protect, getAllTransaction);
router.delete('/:typeId',protect, deleteTransaction);
router.get('/view/:transactionId', protect, viewTransaction);
router.patch('/view/:transactionId', protect, updateTransaction);

export default router;