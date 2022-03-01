const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const mailController = require("../controllers/mail");
const isAuthenticated = require("../middleware/auth");

router.post("/send-otp", isAuthenticated, mailController.sendEmailOtp);

module.exports = router;
