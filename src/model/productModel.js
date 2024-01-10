/** @format */

const createError = require("http-errors");
const Product = require("../schema/product");
const { default: mongoose } = require("mongoose");

class ProductModel {
  constructor() {}

  async handleCreateProduct(body) {
    try {
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: body.title,
        description: body.description,
        price: body.price,
      });
      const data = await product.save();
      return data;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleGetItem(page, limit) {
    try {
      const items = await Product.find({})
        .skip(page * (limit - 1))
        .limit(limit)
        .sort({ createAt: -1 });
      return items;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleGetSingleItem(id) {
    try {
      const item = await Product.findById(id);
      return item;
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleEditItem(id, body) {
    try {
      const updateData = await Product.findByIdAndUpdate(
        id,
        {
          $set: { title: body.title, description: body.description },
        },
        { new: true }
      );
      return { msg: "Product has been updated", product: updateData };
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }

  async handleDeleteItem(id) {
    try {
      const item = await Product.findByIdAndDelete(id);
      return { msg: "Item has been deleted", product: item };
    } catch (error) {
      throw createError.BadRequest(error.message);
    }
  }
}

module.exports = new ProductModel();
