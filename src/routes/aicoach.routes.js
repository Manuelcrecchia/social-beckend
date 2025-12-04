// FILE: src/routes/aicoach.routes.js

import express from 'express';
import { askAI } from '../controllers/aicoach.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, askAI);

export default router;
