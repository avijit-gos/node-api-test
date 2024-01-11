/** @format */

const createError = require("http-errors");
const {
  handleCreateUser,
  handleGetProfile,
  handleUpdateUser,
  handleDeleteUser,
} = require("../model/userModel");

class UserController {
  constructor() {}
  async createUser(req, res, next) {
    try {
      if (
        !req.body.name.trim() ||
        !req.body.email.trim() ||
        !req.body.password.trim()
      ) {
        throw createError.BadRequest("Invalid user registration");
      } else {
        const result = await handleCreateUser(req.body);
        return res.status(201).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("Profile Id is not present");
      } else {
        const result = await handleGetProfile(req.params.id);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("Profile Id is not present");
      } else if (!req.body.name.trim()) {
        throw createError.BadRequest("Name cannot be empty");
      } else {
        const result = await handleUpdateUser(req.params.id, req.body.name);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("Profile Id is not present");
      } else {
        const result = await handleDeleteUser(req.params.id);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
