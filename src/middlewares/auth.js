import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import Seller from "../models/Seller.js";

export default async function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.role === "seller") {
      req.user = await Seller.findByPk(payload.id);
      req.user.role = "seller";
    } else {
      req.user = await User.findByPk(payload.id);
      req.user.role = "user";
    }

    if (!req.user) return res.status(401).json({ error: "Invalid token" });

    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
