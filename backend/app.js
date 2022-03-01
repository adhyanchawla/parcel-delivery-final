const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");
const usersRoutes = require("./routes/users");
const mailRoutes = require("./routes/mail");
const ordersRoutes = require("./routes/orders");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(bodyParser.json()); // Now form data can be accessed as 'req.body'.

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
