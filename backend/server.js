const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User"); // Ensure you have this model

const app = express();
const corsOptions = {
  origin: "https://interfaceforsound2-frontend.vercel.app",
  methods: ["GET", "POST", "OPTIONS"], // Explicitly allowing OPTIONS method
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

// Enable preflight requests for all routes
app.options('*', cors(corsOptions)); // Respond to preflight OPTIONS requests with the specified CORS options

app.use(express.json());

// Adjust with your MongoDB connection details
mongoose.connect(
  "mongodb+srv://simonhallak3:B9fQRohJNgeISs3I@soundforsleep.f573e6z.mongodb.net/?retryWrites=true&w=majority&appName=soundforsleep"
);

app.get("/", (req, res) => {
  res.json("Backend is running.");
});

app.post("/submit-form", (req, res) => {
  const { name, mood } = req.body;

  UserModel.findOne({ name: name })
    .then((user) => {
      if (user) {
        res.json("User already exists with this name");
      } else {
        UserModel.create({ name: name, mood: mood })
          .then((result) => res.status(201).json(result))
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
