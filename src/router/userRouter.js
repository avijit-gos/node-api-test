/** @format */

const router = require("express").Router();
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/userController");
const Authentication = require("../middleware/Authentication");

router.post("/register", createUser);
router.get("/:id", Authentication, getUser);
router.put("/update/:id", Authentication, updateUser);
router.delete("/:id", Authentication, deleteUser);
module.exports = router;
