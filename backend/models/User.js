const mongoose = require("mongoose");

// Define the schema for the user data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
