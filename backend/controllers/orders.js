const users = require("../models/users");
const { validationResult } = require("express-validator");
const Orders = require("../models/orders");
const Coupons = require("../models/coupons");

exports.createOrder = (req, res, next) => {
  const userId = req.userId;
  const type = req.body.type;
  const weight = req.body.weight;
  const altPhoneNumber = req.body.altPhoneNumber;
  const length = req.body.length;
  const width = req.body.width;
  const height = req.body.height;
  const pickUpAddr = req.body.pickUpAddr;
  const pickUpCity = req.body.pickUpCity;
  const pickUpState = req.body.pickUpState;
  const pickUpCountry = req.body.pickUpCountry;
  const pickUpZipCode = req.body.pickUpZipCode;
  const dropOffAddr = req.body.dropOffAddr;
  const dropOffCity = req.body.dropOffCity;
  const dropOffState = req.body.dropOffState;
  const dropOffCountry = req.body.dropOffCountry;
  const dropOffZipCode = req.body.dropOffZipCode;

  if (
    !userId ||
    !type ||
    !weight ||
    !altPhoneNumber ||
    !length ||
    !width ||
    !height ||
    !pickUpAddr ||
    !pickUpCity ||
    !pickUpState ||
    !pickUpCountry ||
    !pickUpZipCode ||
    !dropOffAddr ||
    !dropOffCity ||
    !dropOffState ||
    !dropOffCountry ||
    !dropOffZipCode
  ) {
    console.log(
      userId,
      type,
      weight,
      altPhoneNumber,
      length,
      width,
      height,
      pickUpAddr,
      pickUpCity,
      pickUpCountry,
      pickUpState,
      pickUpZipCode,
      dropOffAddr,
      dropOffCity,
      dropOffCountry,
      dropOffState,
      dropOffZipCode
    );
    return res.status(400).json({ error: "Invalid Form Parameters" });
  }

  Orders.create({
    userId: userId,
    type: type,
    weight: weight,
    altPhoneNumber: altPhoneNumber,
    length: length,
    width: width,
    height: height,
    pickUpAddr: pickUpAddr,
    pickUpCity: pickUpCity,
    pickUpState: pickUpState,
    pickUpCountry: pickUpCountry,
    pickUpZipCode: pickUpZipCode,
    dropOffAddr: dropOffAddr,
    dropOffCity: dropOffCity,
    dropOffState: dropOffState,
    dropOffCountry: dropOffCountry,
    dropOffZipCode: dropOffZipCode,
    orderStage: 0,
  })
    .then((result) => {
      res.status(201).json({
        data: "New Order Created! But wait payment is still waiting.....",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error." });
    });
};

exports.getEstimatePrice = (req, res, next) => {
  const price = 2000;
  const couponCode = req.body.couponCode;
  if (!couponCode) {
    res.status(200).json({ data: price });
  } else {
    Coupons.findOne({
      where: {
        identifier: couponCode,
      },
    })
      .then((couponObject) => {
        if (couponObject.isPercentage === true) {
          let newPrice = (price * (100 - couponObject.amount)) / 100;
          res.status(200).json({ data: newPrice });
        } else {
          let newPrice = price - couponObject.amount;
          res.status(200).json({ data: newPrice });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "The Coupon is Invalid." });
      });
  }
};

exports.getMyOrders = (req, res, next) => {
  const userId = req.userId;
  Orders.findAll({
    where: {
      userId: userId,
    },
  })
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error." });
    });
};

exports.orderDetails = (req, res, next) => {
  const orderId = req.params.id;
  Orders.findByPk(orderId)
    .then((result) => {
      res.status(200).json({ data: result.dataValues });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error." });
    });
};
