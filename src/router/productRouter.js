/** @format */

const express = require("express");
const {
  createItem,
  getItem,
  getSingleItem,
  editItem,
  deleteItem,
} = require("../controller/productController");
const router = express.Router();

router.post("/", createItem);
router.get("/", getItem);
router.get("/:id", getSingleItem);
router.put("/:id", editItem);
router.delete("/:id", deleteItem);

module.exports = router;
