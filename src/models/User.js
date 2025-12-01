import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class User extends Model {}

User.init(
  {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password_hash: DataTypes.STRING,
    wallet_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
  },
  { sequelize, modelName: "user" }
);

export default User;
