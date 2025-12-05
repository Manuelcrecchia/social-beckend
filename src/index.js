import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import accountRoutes from "./routes/accounts.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import schedulerRoutes from "./routes/scheduler.routes.js";
import aicoachRoutes from "./routes/aicoach.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ ABILITA CORS PERMAMENTE (FONDAMENTALE PER RENDER)
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
}));

app.use(express.json());

// 👇 Routes
app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/scheduler", schedulerRoutes);
app.use("/aicoach", aicoachRoutes);

app.get("/", (req, res) => {
  res.send("🔥 Social Backend is running (Render Version)!");
});

// Avvio server
app.listen(PORT, () => {
  console.log(`🔥 Backend running on port ${PORT}`);
});
