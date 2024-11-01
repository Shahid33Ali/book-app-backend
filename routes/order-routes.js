const express = require("express");
const { Order } = require("../models/order-model");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(200).json({ message: "Order SUCCESS!!!" });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "There is an error",
    });
  }
});
router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const order = await Order.find({ email }).sort({ createdAt: -1 });
    if (!order) {
      return res.status(404).json({ message: "There is no order" });
    }
    res.status(200).json(order);
  } catch (error) {}
});
module.exports = router;
