import express from 'express';
import {protect} from '../middleware/authHandler.js'
import { addTransaction, deleteTransaction, getAllTransaction, updateTransaction, viewTransaction } from '../controllers/TransactionController.js';
import { transactionValidation } from '../middleware/validationHandler.js';

const router = express.Router();

router.post('/new', protect, transactionValidation, addTransaction );
router.get('/',protect, getAllTransaction);
router.get('/:typeId',protect, getAllTransaction);
router.delete('/:typeId',protect, deleteTransaction);
router.get('/view/:transactionId', protect, viewTransaction);
router.patch('/view/:transactionId', protect, transactionValidation, updateTransaction);

export default router;