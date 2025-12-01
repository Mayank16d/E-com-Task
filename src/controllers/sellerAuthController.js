import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import Seller from "../models/Seller.js";

export async function registerSeller(req, res) {
  const { name, email, password } = req.body;

  const exists = await Seller.findOne({ where: { email } });
  if (exists) return res.status(400).json({ error: "Email already used" });

  const hash = await bcrypt.hash(password, 10);

  const seller = await Seller.create({
    name,
    email,
    password_hash: hash
  });

  const token = jwt.sign({ id: seller.id, role: "seller" }, process.env.JWT_SECRET);

  res.json({ token });
}

export async function loginSeller(req, res) {
  const { email, password } = req.body;

  const seller = await Seller.findOne({ where: { email } });
  if (!seller) return res.status(404).json({ error: "Seller not found" });

  const ok = await bcrypt.compare(password, seller.password_hash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: seller.id, role: "seller" }, process.env.JWT_SECRET);

  res.json({ token });
}
