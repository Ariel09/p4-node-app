import express from "express";
import { registerCategory } from "../controllers/CategoryController.js";

const router = express.Router();

router.post('/new', registerCategory);

export default router;