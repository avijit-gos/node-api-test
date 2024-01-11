/** @format */

const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../schema/user");
const { hashPassword, generateToken } = require("../helper/helper");

class UserModel {
  constructor() {}

  async handleCreateUser(body) {
    try {
      const isUser = await User.findOne({ email: body.email });
      if (!isUser) {
        const hashResult = await hashPassword(body.password);
        const newUser = User({
          _id: new mongoose.Types.ObjectId(),
          name: body.name,
          email: body.email,
          password: hashResult,
        });
        const saveUser = await newUser.save();
        const token = await generateToken(saveUser);
        return { msg: "Registration successfull", token, user: saveUser };
      } else {
        throw createError.Conflict("Email  already taken");
      }
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleGetProfile(id) {
    try {
      const user = await User.findById(id).select("-password");
      return user;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleUpdateUser(id, value) {
    try {
      const result = await User.findByIdAndUpdate(
        id,
        { $set: { name: value } },
        { new: true }
      );
      return { msg: "User name has been updated", user: result };
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleDeleteUser(id) {
    try {
      const result = await User.findByIdAndDelete(id);
      if (!result) {
        return { msg: "User account already deleted" };
      } else {
        return { msg: "User account has been deleted", user: result };
      }
    } catch (error) {
      throw createError.BadRequest(error.mrssage);
    }
  }
}

module.exports = new UserModel();
