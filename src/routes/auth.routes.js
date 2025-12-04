// FILE: src/routes/auth.routes.js

import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { startTikTokOAuth, handleTikTokCallback } from '../controllers/tiktok.controller.js';

const router = express.Router();

// Rotte pubbliche (login e register)
router.post('/register', register);
router.post('/login', login);

// TikTok OAuth (pubbliche)
router.get('/tiktok', startTikTokOAuth);
router.get('/tiktok/callback', handleTikTokCallback);

export default router;
