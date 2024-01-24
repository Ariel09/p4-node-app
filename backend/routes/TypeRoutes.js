import express from 'express';
import { getType } from '../controllers/TypeController.js';
import {protect} from '../middleware/authHandler.js'

const router = express.Router();

router.get('/', protect, getType);

export default router;