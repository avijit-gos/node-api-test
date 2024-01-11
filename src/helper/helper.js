/** @format */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

class Helper {
  constructor() {}

  async hashPassword(password) {
    try {
      const result = bcrypt.hash(password, 10);
      return result;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async generateToken(user) {
    try {
      const result = await jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "30d" }
      );
      return result;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}

module.exports = new Helper();
