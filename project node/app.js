const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const express = require("express");

const connectDB = require("./config/db");

// Middleware
const authMiddleware = require("./middleware/auth");

// Load environment variables

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const invoiceRoutes = require("./routes/invoice");
const userRoutes = require("./routes/user");

// Define Routes
app.use("/auth", authRoutes);
app.use("/products", authMiddleware, productRoutes);
app.use("/invoices", authMiddleware, invoiceRoutes);
app.use("/users", authMiddleware, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
