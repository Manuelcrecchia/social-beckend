// FILE: src/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth.routes.js';
import accountsRoutes from './routes/accounts.routes.js';
import schedulerRoutes from './routes/scheduler.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import aiCoachRoutes from './routes/aicoach.routes.js';

const app = express();

// -------------------------
// MIDDLEWARE GLOBALI
// -------------------------
app.use(cors());
app.use(express.json());

// -------------------------
// ROUTES
// -------------------------
app.use('/auth', authRoutes);
app.use('/accounts', accountsRoutes);
app.use('/scheduler', schedulerRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/aicoach', aiCoachRoutes);

// -------------------------
// ROOT ENDPOINT
// -------------------------
app.get('/', (req, res) => {
  res.send('Backend Social AI Manager is running...');
});



app.get('/terms', (req, res) => {
  res.send('Terms of Service - Social AI Manager');
});

app.get('/privacy', (req, res) => {
  res.send('Privacy Policy - Social AI Manager');
});
// -------------------------
// AVVIO SERVER
// -------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Backend running on http://localhost:${PORT}`);
});
