const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = auth;