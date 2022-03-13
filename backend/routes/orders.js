const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const ordersController = require("../controllers/orders");
const isAuthenticated = require("../middleware/auth");

router.post("/create-order", isAuthenticated, ordersController.createOrder);
router.post("/upload-parcel-image", ordersController.uploadParcelImage);
router.get("/my-orders", isAuthenticated, ordersController.getMyOrders);
router.post(
  "/estimate-price",
  isAuthenticated,
  ordersController.getEstimatePrice
);
router.get(
  "/order-details/:id",
  isAuthenticated,
  ordersController.orderDetails
);

module.exports = router;
