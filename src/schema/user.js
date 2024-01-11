/** @format */

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, trim: true },
    email: { type: String, trim: true, require: true, unique: true },
    password: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
