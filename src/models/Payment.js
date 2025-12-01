import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Payment extends Model {}

Payment.init(
  {
    orderId: DataTypes.INTEGER,
    provider_transaction_id: DataTypes.STRING,
    status: DataTypes.ENUM("success", "failure", "pending"),
    amount: DataTypes.DECIMAL(10, 2),
  },
  { sequelize, modelName: "payment" }
);

export default Payment;
