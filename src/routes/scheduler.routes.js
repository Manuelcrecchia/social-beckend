// FILE: src/routes/scheduler.routes.js

import express from 'express';
import { getScheduler, createScheduler, deleteScheduler } from '../controllers/scheduler.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getScheduler);
router.post('/', authMiddleware, createScheduler);
router.delete('/:id', authMiddleware, deleteScheduler);

export default router;
