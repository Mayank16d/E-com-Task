import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Product extends Model {}

Product.init(
  {
    sellerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    stock: DataTypes.INTEGER,
    sku: DataTypes.STRING,
  },
  { sequelize, modelName: "product" }
);

export default Product;
