const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User"); // Ensure you have this model
const User = require("./models/User"); // Adjust the path as necessary

const app = express();
const corsOptions = {
  origin: "https://interfaceforsound2-frontend.vercel.app",
  methods: ["GET", "POST", "OPTIONS"], // Explicitly allowing OPTIONS method
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

// Enable preflight requests for all routes
app.options("*", cors(corsOptions)); // Respond to preflight OPTIONS requests with the specified CORS options

app.use(express.json());

// Adjust with your MongoDB connection details
mongoose.connect(
  "mongodb+srv://simonhallak3:B9fQRohJNgeISs3I@soundforsleep.f573e6z.mongodb.net/?retryWrites=true&w=majority&appName=soundforsleep"
);

app.get("/", (req, res) => {
  res.json("Backend is running.");
});

app.post("/submit-form", async (req, res) => {
  const { name, mood } = req.body;
  try {
    const newUser = new User({ name, mood });
    await newUser.save();
    res.status(201).send("User added");
  } catch (error) {
    res.status(500).send("Error saving user: " + error.message);
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
