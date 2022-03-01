const users = require("../models/users");
const { validationResult } = require("express-validator");
const transporter = require("../util/mail");
const generateOTP = require("../util/otp");

exports.sendEmailOtp = (req, res, next) => {
  const userId = req.userId;
  users
    .findByPk(userId)
    .then((userObject) => {
      const userEmail = userObject.dataValues.email;
      if (userObject) {
        const OTP = generateOTP();
        users
          .update(
            { OTP: OTP },
            {
              where: {
                id: userId,
              },
            }
          )
          .then((result) => {
            transporter.sendMail({
              to: userEmail,
              subject: "OTP Verification",
              html: `OTP: ${OTP}`,
            });
            res.status(200).json({ data: "OTP Sent" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.status(400).json({ data: "Incorrect User ID Given." });
      }
    })
    .catch((err) => {
      res.status(500).json({ data: "Internal server error." });
    });
};
