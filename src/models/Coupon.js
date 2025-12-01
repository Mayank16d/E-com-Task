import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Coupon extends Model {}

Coupon.init(
  {
    code: { type: DataTypes.STRING, unique: true },
    discount_type: DataTypes.ENUM("percent", "amount"),
    value: DataTypes.DECIMAL(10, 2),
    min_order_value: DataTypes.DECIMAL(10, 2),
    expiry_date: DataTypes.DATE,
    usage_limit: DataTypes.INTEGER,
  },
  { sequelize, modelName: "coupon" }
);

export default Coupon;
