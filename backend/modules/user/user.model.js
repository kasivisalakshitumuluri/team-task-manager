const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  emailAddress: { type: String, unique: true },
  secret: { type: String, required: true },
  role: { type: String, enum: ["admin", "member"], default: "member" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);