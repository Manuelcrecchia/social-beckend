// FILE: src/controllers/tiktok.controller.js

import jwt from "jsonwebtoken";
import { upsertTikTokAccount } from "../services/accounts.service.js";

const TIKTOK_AUTH_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_USERINFO_URL = "https://open.tiktokapis.com/v2/user/info/";

/* -------------------------------------------------------------
   1) START OAUTH
------------------------------------------------------------- */
export const startTikTokOAuth = (req, res) => {
  console.log("🔥 START TIKTOK OAUTH CONTROLLER");

  const { token } = req.query;
  if (!token) return res.status(400).send("Missing token");

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log("❌ JWT invalid:", err);
    return res.status(401).send("Invalid token");
  }

  const userId = payload.id;
  console.log("👤 OAuth User ID:", userId);

  const state = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  const redirectUri = process.env.TIKTOK_REDIRECT_URI; // 👈 NON CODIFICARLA

const params = new URLSearchParams();

params.append("client_key", process.env.TIKTOK_CLIENT_KEY);
params.append("response_type", "code");
params.append("scope", "user.info.basic,user.info.profile,user.info.stats");

// ❗ IMPORTANTISSIMO: nessuna encoding automatica
params.append("redirect_uri", decodeURIComponent(process.env.TIKTOK_REDIRECT_URI));

params.append("state", state);



/* -------------------------------------------------------------
   2) CALLBACK
------------------------------------------------------------- */
export const handleTikTokCallback = async (req, res) => {
  console.log("🔥 CALLBACK RICEVUTA");

  const { code, state } = req.query;

  if (!code || !state) return res.status(400).send("Missing code or state");

  let decoded;
  try {
    decoded = jwt.verify(state, process.env.JWT_SECRET);
  } catch (err) {
    console.error("❌ STATE ERROR:", err);
    return res.status(400).send("Invalid state");
  }

  const userId = decoded.userId;
  console.log("👤 State userId:", userId);

  /* ---------------- TOKEN EXCHANGE ---------------- */
 const params = new URLSearchParams();

params.append("client_key", process.env.TIKTOK_CLIENT_KEY);
params.append("response_type", "code");
params.append("scope", "user.info.basic,user.info.profile,user.info.stats");

// ❗ IMPORTANTISSIMO: nessuna encoding automatica
params.append("redirect_uri", decodeURIComponent(process.env.TIKTOK_REDIRECT_URI));

params.append("state", state);


  const tokenJson = await tokenRes.json();
  console.log("💬 TOKEN JSON:", tokenJson);

  if (!tokenJson.access_token) {
    console.error("❌ TOKEN ERROR:", tokenJson);
    return res.status(500).send("Error getting TikTok token");
  }

  const accessToken = tokenJson.access_token;
  const refreshToken = tokenJson.refresh_token;

  /* ---------------- USER INFO ---------------- */
  const userRes = await fetch(TIKTOK_USERINFO_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: ["display_name", "open_id"] }),
  });

  const userJson = await userRes.json();
  console.log("👤 USER JSON:", userJson);

  if (!userJson.data?.user) {
    return res.status(500).send("Error getting TikTok user info");
  }

  const username = userJson.data.user.display_name || userJson.data.user.open_id;

  /* ---------------- SAVE TO DB ---------------- */
  await upsertTikTokAccount(userId, {
    username,
    accessToken,
    refreshToken,
  });

  console.log("✅ TikTok account saved!");

  return res.redirect(`${process.env.FRONTEND_URL}/app/accounts?tiktok=connected`);
};
