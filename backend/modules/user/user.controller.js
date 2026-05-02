const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🔹 helper: generate token
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// REGISTER
async function register(req, res) {
  try {
    const { username, emailAddress, secret } = req.body;

    if (!username || !emailAddress || !secret) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ emailAddress });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(secret, 10);

    const newUser = await User.create({
      username,
      emailAddress,
      secret: hashedPassword,
      role: "member"
    });

    const token = createToken(newUser);

    return res.status(201).json({ token });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Unable to register user" });
  }
}

// LOGIN
async function login(req, res) {
  try {
    const { emailAddress, secret } = req.body;

    if (!emailAddress || !secret) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValid = await bcrypt.compare(secret, user.secret);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);

    return res.json({ token });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Login failed" });
  }
}

module.exports = { register, login };