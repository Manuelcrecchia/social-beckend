import express from "express";
import { getAccounts, addAccount, deleteAccount } from "../controllers/accounts.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// ROTTE ACCOUNTS
router.get("/", authMiddleware, getAccounts);
router.post("/", authMiddleware, addAccount);
router.delete("/:id", authMiddleware, deleteAccount);

export default router;
