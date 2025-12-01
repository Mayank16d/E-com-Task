import {
  sequelize,
  CartItem,
  Product,
  User,
  Coupon,
  Order,
  OrderItem,
} from "../models/index.js";

export async function calculateTotal(userId, couponCode, walletUseRequested) {
  const cartItems = await CartItem.findAll({
  where: { userId },
  include: [
    {
      model: Product,
    }
  ]
});

  if (!cartItems.length) throw new Error("Cart empty");

  let subtotal = 0;
  for (const it of cartItems) {
    subtotal += it.quantity * it.product.price;
  }

  let discount = 0;
  let coupon = null;

  if (couponCode) {
    coupon = await Coupon.findOne({ where: { code: couponCode } });
    if (!coupon) throw new Error("Invalid coupon");

    discount =
      coupon.discount_type === "percent"
        ? (subtotal * coupon.value) / 100
        : coupon.value;
  }

  const afterDiscount = subtotal - discount;

  const user = await User.findByPk(userId);

  const walletUse = Math.min(
    walletUseRequested,
    user.wallet_balance,
    afterDiscount
  );

  const finalAmount = afterDiscount - walletUse;

  return { subtotal, discount, walletUse, finalAmount, coupon, cartItems };
}

export async function placeOrder(req, res) {
  const userId = req.user.id;
  const { couponCode, useWalletAmount } = req.body;

  const t = await sequelize.transaction();

  try {
    const calc = await calculateTotal(
      userId,
      couponCode,
      useWalletAmount
    );

    const order = await Order.create(
      {
        userId,
        total_amount: calc.finalAmount,
        couponId: calc.coupon?.id || null,
        wallet_used: calc.walletUse,
        status: "pending",
      },
      { transaction: t }
    );

    for (const it of calc.cartItems) {
      const p = await Product.findByPk(it.productId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (p.stock < it.quantity)
        throw new Error(`Not enough stock for ${p.name}`);

      await OrderItem.create(
        {
          orderId: order.id,
          productId: p.id,
          quantity: it.quantity,
          price_at_order: p.price,
        },
        { transaction: t }
      );

      p.stock -= it.quantity;
      await p.save({ transaction: t });
    }

    if (calc.walletUse > 0) {
      const u = await User.findByPk(userId, {
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      u.wallet_balance -= calc.walletUse;
      await u.save({ transaction: t });
    }

    await CartItem.destroy({ where: { userId }, transaction: t });

    await t.commit();

    res.json({ orderId: order.id, amount: calc.finalAmount });
  } catch (e) {
    await t.rollback();
    res.status(400).json({ error: e.message });
  }
}
