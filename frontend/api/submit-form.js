// /api/submit-form.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Ensure your database connection
// Consider moving this to a module if multiple functions need it
const dbURI =
  "mongodb+srv://simonhallak3:B9fQRohJNgeISs3I@soundforsleep.f573e6z.mongodb.net/?retryWrites=true&w=majority&appName=soundforsleep";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define your schema and model inside the function or import them if they are defined externally
const userSchema = new Schema({
  name: String,
  mood: String,
});
const User = mongoose.model("User", userSchema);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust as needed for your frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "POST") {
    const { name, mood } = req.body;
    const newUser = new User({ name, mood });
    try {
      await newUser.save();
      res.status(201).send("User added");
    } catch (error) {
      res.status(500).send("Error saving user: " + error.message);
    }
  } else {
    // Handle any non-POST requests here
    res.status(405).send("Method Not Allowed");
  }
};
