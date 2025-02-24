const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// Add Product
router.post("/", async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = new Product({ name, price, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//  Get a Single Product by ID (GET /products/:id)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(400).json({ msg: "Invalid product ID" });
  }
});

//  Update Product by ID (PUT /products/:id)
router.put("/:id", async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock },
      { new: true } // Return updated product
    );

    if (!updatedProduct)
      return res.status(404).json({ msg: "Product not found" });

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ msg: "Invalid product ID" });
  }
});

//  Delete Product by ID (DELETE /products/:id)
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ msg: "Product not found" });

    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: "Invalid product ID" });
  }
});

module.exports = router;
