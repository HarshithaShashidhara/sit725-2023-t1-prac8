// cardRouter.js

import express from "express";
import { getCards, insertCard } from "../controllers/cardController.js"; // Update import statement

const router = express.Router();

router.get('/', getCards); // Use getCards instead of getAllCards
router.post('/', insertCard); // Use insertCard instead of postCard

export default router;
