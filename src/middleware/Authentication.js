/** @format */

const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      throw createError.Unauthorized("Token is not present");
    } else {
      const isVerify = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = isVerify;
      next();
    }
  } catch (error) {
    next(error);
  }
};
