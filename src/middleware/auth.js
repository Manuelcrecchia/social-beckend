// FILE: src/middleware/auth.js

import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();

  } catch (e) {
    console.error("AUTH ERROR:", e);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
