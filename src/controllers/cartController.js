import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

export async function addToCart(req, res) {
  if (req.user.role !== "user")
    return res.status(403).json({ error: "User only" });

  const { productId, quantity } = req.body;

  const product = await Product.findByPk(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  if (product.stock < quantity)
    return res.status(400).json({ error: "Insufficient stock" });

  let item = await CartItem.findOne({
    where: { userId: req.user.id, productId },
  });

  if (!item) {
    item = await CartItem.create({
      userId: req.user.id,
      productId,
      quantity,
    });
  } else {
    item.quantity += quantity;
    await item.save();
  }

  res.json(item);
}

export async function getCart(req, res) {
  const items = await CartItem.findAll({
    where: { userId: req.user.id },
    include: [Product],
  });
  res.json(items);
}
