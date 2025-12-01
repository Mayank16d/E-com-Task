import sequelize from "../config/db.js";
import User from "./User.js";
import Seller from "./Seller.js";
import Product from "./Product.js";
import Coupon from "./Coupon.js";
import CartItem from "./CartItem.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Payment from "./Payment.js";

User.hasMany(CartItem, { foreignKey: "userId" });
CartItem.belongsTo(User);

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product);

Seller.hasMany(Product, { foreignKey: "sellerId" });
Product.belongsTo(Seller);

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User);

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order);

Order.hasMany(Payment, { foreignKey: "orderId" });
Payment.belongsTo(Order);

export {
  sequelize,
  User,
  Seller,
  Product,
  Coupon,
  CartItem,
  Order,
  OrderItem,
  Payment,
};
