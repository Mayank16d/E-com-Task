import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";

import { sequelize } from "./models/index.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";



const app = express();
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/payments", paymentRoutes);
app.use("/auth", sellerRoutes);


const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database synced");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.log("Startup error:", err);
  }
}

start();
