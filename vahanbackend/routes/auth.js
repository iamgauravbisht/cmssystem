const express = require("express");
const { createUser, loginUser, verifyUser } = require("../db/index.js");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs 1",
    });
  }

  const user = await createUser(username, email, password);

  if (user.message.includes("Incorrect")) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs 2",
    });
  }

  res.json({
    message: "User created successfully",
    token: user.token,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await loginUser(email, password);

  if (user.message.includes("Invalid")) {
    return res.status(411).json({
      message: "Invalid credentials",
    });
  }

  res.json({
    message: "User logged in successfully",
    token: user.token,
  });
});

router.post("/verify", async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  const response = await verifyUser(token);
  if (response.message.includes("Invalid")) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
  res.json({
    message: "Token verified",
  });
});

module.exports = router;
