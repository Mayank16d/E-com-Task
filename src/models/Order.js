import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Order extends Model {}

Order.init(
  {
    userId: DataTypes.INTEGER,
    total_amount: DataTypes.DECIMAL(10, 2),
    couponId: DataTypes.INTEGER,
    wallet_used: DataTypes.DECIMAL(10, 2),
    status: DataTypes.ENUM("pending", "paid", "failed", "cancelled"),
  },
  { sequelize, modelName: "order" }
);

export default Order;
