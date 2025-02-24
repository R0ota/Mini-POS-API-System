const express = require("express");
const Invoice = require("../models/invoice");
const Product = require("../models/product");

const router = express.Router();

// Create Invoice
router.post("/", async (req, res) => {
  try {
    const { userId, type, items } = req.body;

    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(400).json({ msg: "Product not found" });

      if (type === "sale" && product.stock < item.quantity) {
        return res.status(400).json({ msg: "Not enough stock" });
      }

      total += item.quantity * product.price;
    }

    const invoice = new Invoice({ userId, type, items, total });
    await invoice.save();

    // Update Stock
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (type === "sale") {
        product.stock -= item.quantity;
      } else {
        product.stock += item.quantity;
      }
      await product.save();
    }

    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get All Invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("userId")
      .populate("items.productId");
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
