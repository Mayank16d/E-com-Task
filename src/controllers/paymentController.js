import {
  sequelize,
  Order,
  OrderItem,
  Product,
  User,
  Payment,
} from "../models/index.js";

export async function paymentWebhook(req, res) {
  const { orderId, status, provider_txn_id } = req.body;

  const t = await sequelize.transaction();

  try {
    const order = await Order.findByPk(orderId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!order) throw new Error("Order not found");

    if (status === "success") {
      order.status = "paid";
      await order.save({ transaction: t });

      await Payment.create(
        {
          orderId,
          provider_transaction_id: provider_txn_id,
          status: "success",
          amount: order.total_amount,
        },
        { transaction: t }
      );

      await t.commit();
      return res.json({ ok: true });
    } else {
      // restore stock
      const items = await OrderItem.findAll({
        where: { orderId },
        transaction: t,
      });

      for (const it of items) {
        const p = await Product.findByPk(it.productId, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        p.stock += it.quantity;
        await p.save({ transaction: t });
      }

      // refund wallet
      if (order.wallet_used > 0) {
        const u = await User.findByPk(order.userId, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        u.wallet_balance += order.wallet_used;
        await u.save({ transaction: t });
      }

      order.status = "failed";
      await order.save({ transaction: t });

      await Payment.create(
        {
          orderId,
          provider_transaction_id: provider_txn_id,
          status: "failure",
          amount: order.total_amount,
        },
        { transaction: t }
      );

      await t.commit();
      return res.json({ ok: true });
    }
  } catch (e) {
    await t.rollback();
    res.status(500).json({ error: e.message });
  }
}
