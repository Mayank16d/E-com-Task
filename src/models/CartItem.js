import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class CartItem extends Model {}

CartItem.init(
  {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  },
  { sequelize, modelName: "cart_item" }
);

export default CartItem;
