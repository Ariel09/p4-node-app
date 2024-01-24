import express from "express";
import { getCategoryByType, registerCategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.post('/new', registerCategory);
router.get('/type/:type', getCategoryByType);

export default router;