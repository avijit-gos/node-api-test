/** @format */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const db = require("./database/mongodb");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/product", require("./src/router/productRouter"));
app.use("/api/user", require("./src/router/userRouter"));

app.use(async (req, res, next) => {
  next(createError.NotFound("URL not found"));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`App listening on ${port}`));

module.exports = { app };
