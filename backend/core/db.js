const mongoose = require("mongoose");

async function connectDB() {
  console.log(" Trying to connect DB..."); // ADD THIS

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Database connected");
  } catch (error) {
    console.log(" DB error:", error.message);
  }
}

module.exports = connectDB;