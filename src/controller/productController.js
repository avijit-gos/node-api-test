/** @format */

const createError = require("http-errors");
const {
  handleCreateProduct,
  handleGetItem,
  handleGetSingleItem,
  handleEditItem,
  handleDeleteItem,
} = require("../model/productModel");

class ProductController {
  constructor() {}

  async createItem(req, res, next) {
    try {
      if (
        !req.body.title ||
        !req.body.title.trim() ||
        !req.body.description ||
        !req.body.description.trim()
      ) {
        throw createError.BadRequest("Invalid intem creation request");
      } else {
        const result = await handleCreateProduct(req.body);
        return res.status(201).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async getItem(req, res, next) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const result = await handleGetItem(page, limit);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getSingleItem(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("Product ID is not defined");
      } else {
        const result = await handleGetSingleItem(req.params.id);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async editItem(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("Item ID is not present");
      } else {
        const result = await handleEditItem(req.params.id, req.body);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      if (!req.params.id) {
        throw createError.BadRequest("Item ID is not present");
      } else {
        const result = await handleDeleteItem(req.params.id);
        return res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
