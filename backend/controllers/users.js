const users = require("../models/users");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const req = require("express/lib/request");
const res = require("express/lib/response");

exports.getUsers = (req, res, next) => {
  users
    .findAll()
    .then((userlist) => {
      res.status(200).json(userlist);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.registerUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  users
    .findOne({
      where: {
        email: req.body.newUserEmail,
      },
    })
    .then((userObject) => {
      console.log(userObject);
      if (userObject) {
        res.status(400).json({ message: "Email is already being used." });
      } else {
        users
          .create({
            email: req.body.newUserEmail,
            password: req.body.newUserPassword,
          })
          .then((result) => {
            res.status(201).json({
              data: "The new user has been successfully registered.",
            });
          })
          .catch((err) => {
            res.status(500).json({
              data: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ data: "Internal seraaaver error." });
    });
};

exports.verifyUser = (req, res, next) => {
  const userId = req.userId;
  const userOTP = req.body.userOTP;
  users
    .findByPk(userId)
    .then((userObject) => {
      if (userObject) {
        if (userObject.dataValues.OTP === userOTP) {
          users
            .update(
              { isVerified: true },
              {
                where: {
                  id: userId,
                },
              }
            )
            .then((result) => {
              res.status(200).json({ data: "User Verified" });
            })
            .catch((err) => {
              res.status(500).json({ data: "Internal server error." });
            });
        } else {
          res
            .status(400)
            .json({ data: "Verification Failed, Wrong OTP Given." });
        }
      } else {
        res.status(400).json({ data: "Incorrect User ID Given." });
      }
    })
    .catch((err) => {
      res.status(500).json({ data: "Internal server error." });
    });
};

exports.loginUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  users
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((userObject) => {
      if (userObject) {
        if (userObject.password === req.body.password) {
          let isProfileComplete = true;
          if (
            !userObject.firstName ||
            !userObject.lastName ||
            !userObject.phoneNumber ||
            !userObject.country ||
            !userObject.state ||
            !userObject.city ||
            !userObject.zipCode
          ) {
            isProfileComplete = false;
          }
          const token = jwt.sign(
            {
              userId: userObject.id,
              email: userObject.email,
              isVerified: userObject.isVerified,
              isProfileComplete: isProfileComplete,
            },
            "somesupersecretsauce",
            { expiresIn: "1h" }
          );
          res.status(200).json({ token: token });
        } else {
          res.status(401).json({ data: "Incorrect Password." });
        }
      } else {
        res.status(401).json({ data: "Incorrect Email Address." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ data: "Internal server error." });
    });
};

exports.updateUserProfile = (req, res, next) => {
  const userId = req.userId;
  const firstName = req.body.firstName ? req.body.firstName : null;
  const lastName = req.body.lastName ? req.body.lastName : null;
  const phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : null;
  const country = req.body.country ? req.body.country : null;
  const state = req.body.state ? req.body.state : null;
  const city = req.body.city ? req.body.city : null;
  const zipCode = req.body.zipCode ? req.body.zipCode : null;
  users
    .findByPk(userId)
    .then((userObject) => {
      if (userObject) {
        users
          .update(
            {
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              country: country,
              state: state,
              city: city,
              zipCode: zipCode,
            },
            {
              where: {
                id: userId,
              },
            }
          )
          .then((result) => {
            res.status(200).json({ data: "User Profile Updated" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ data: "Internal server error." });
          });
      } else {
        res.status(401).json({ data: "Incorrect User ID Given." });
      }
    })
    .catch((err) => {
      res.status(500).json({ data: "Internal server error." });
    });
};

exports.getUserData = (req, res, next) => {
  const userId = req.userId;
  users
    .findOne({
      attributes: {
        exclude: [
          "password",
          "isVerified",
          "email",
          "OTP",
          "createdAt",
          "updatedAt",
          "id",
        ],
      },
      where: {
        id: userId,
      },
    })
    .then((userObject) => {
      if (userObject) {
        res.status(200).json({ data: userObject });
      } else {
        res.status(400).json({ data: "Incorrect User ID Given." });
      }
    })
    .catch((err) => {
      res.status(500).json({ data: "Internal server error." });
    });
};
