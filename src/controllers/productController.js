import Product from "../models/Product.js";

export async function addProduct(req, res) {
  if (req.user.role !== "seller")
    return res.status(403).json({ error: "Seller only" });

  const product = await Product.create({
    sellerId: req.user.id,
    ...req.body,
  });

  res.json(product);
}

export async function listProducts(req, res) {
  const products = await Product.findAll();
  res.json(products);
}
