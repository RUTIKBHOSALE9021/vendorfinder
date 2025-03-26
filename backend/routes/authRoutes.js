const express = require("express");
const { signup, login, googleAuth, googleCallback } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Google Auth Routes
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

module.exports = router;
