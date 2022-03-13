const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const sequelize = require("./util/database");
const usersRoutes = require("./routes/users");
const mailRoutes = require("./routes/mail");
const ordersRoutes = require("./routes/orders");
const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../parcel_images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(bodyParser.json()); // Now form data can be accessed as 'req.body'.
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);
app.use("/mail", mailRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Oh! so you took the leap of faith.",
  });
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    message: "Look's like what you are looking for is not present here.",
  });
});

const server = http.createServer(app);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(3000);
