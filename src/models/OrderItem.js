import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class OrderItem extends Model {}

OrderItem.init(
  {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price_at_order: DataTypes.DECIMAL(10, 2),
  },
  { sequelize, modelName: "order_item" }
);

export default OrderItem;
