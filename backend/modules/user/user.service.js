const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function registerUser(data) {
  console.log("Incoming data:", data);

  if (!data.username || !data.emailAddress || !data.secret) {
    throw new Error("All fields are required");
  }

  const existing = await User.findOne({ emailAddress: data.emailAddress });
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.secret, 10);

  const user = await User.create({
    username: data.username,
    emailAddress: data.emailAddress,
    secret: hashedPassword,
    role: data.role || "member"
  });

  return user;
}


async function loginUser(data) {
  if (!data.emailAddress || !data.secret) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ emailAddress: data.emailAddress });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(data.secret, user.secret);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
}

module.exports = { registerUser, loginUser };