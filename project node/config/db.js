const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// dotenv.config({ path: "config/.env" });
DB_URI = process.env.MONGO_URI;
const connectDB = async () => {
  
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected");
    console.log(process.env.MONGO_URI);
  } catch (error) {
    console.log("Faild To Connect MongoDB", error);
  }
};

module.exports = connectDB;
