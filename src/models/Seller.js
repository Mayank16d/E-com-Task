import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Seller extends Model {}

Seller.init(
  {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password_hash: DataTypes.STRING,
  },
  { sequelize, modelName: "seller" }
);

export default Seller;
