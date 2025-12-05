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

import cors from "cors";

app.use(cors({
  origin: ["http://localhost:4200", "http://127.0.0.1:4200", "https://socialfrontend-url-render.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED PROMISE REJECTION:", reason);
});


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
