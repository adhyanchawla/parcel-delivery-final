const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const usersController = require("../controllers/users");
const isAuthenticated = require("../middleware/auth");

router.get("/user-list", usersController.getUsers);

router.post(
  "/register",
  [
    check("newUserEmail")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail([{ all_lowercase: true }]),
  ],
  usersController.registerUser
);

router.post(
  "/login",
  [
    check("password").not().isEmpty().withMessage("Empty password recieved"),
    check("email")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail([{ all_lowercase: true }]),
  ],
  usersController.loginUser
);

router.post("/verify-user", isAuthenticated, usersController.verifyUser);

router.post(
  "/update-user-profile",
  isAuthenticated,
  usersController.updateUserProfile
);

router.get("/get-user-data", isAuthenticated, usersController.getUserData);

module.exports = router;
