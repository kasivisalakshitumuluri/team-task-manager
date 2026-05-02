const express = require("express");
const router = express.Router();

const { register, login } = require("./user.controller");
const authMiddleware = require("../../core/auth.middleware");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

module.exports = router;