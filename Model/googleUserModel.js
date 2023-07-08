const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const GoogleUserModel = mongoose.model("googleuser", userSchema);

module.exports = GoogleUserModel;
