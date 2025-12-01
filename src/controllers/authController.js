import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import Coupon from "../models/Coupon.js";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ where: { email } });
  if (exists) return res.status(400).json({ error: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password_hash: hash,
    wallet_balance: 100,
  });

  const coupon = await Coupon.findOne({ where: { code: "WELCOME10" } });

  if (coupon && coupon.usage_limit > 0) {
    coupon.usage_limit--;
    await coupon.save();
  }

  const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET);

  res.json({ token });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: "Not found" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET);

  res.json({ token });
}
