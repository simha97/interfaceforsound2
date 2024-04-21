const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
// Middleware to parse JSON bodies
const corsOptions = {
  origin: "https://interfaceforsound2-frontend.vercel.app/", // Your frontend URL
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, POST", // Allowed request methods
  credentials: true, // To allow cookies to be sent and received
};

// Use CORS middleware for all routes
app.use(cors(corsOptions));


const dbURI =
  "mongodb+srv://simonhallak3:B9fQRohJNgeISs3I@soundforsleep.f573e6z.mongodb.net/?retryWrites=true&w=majority&appName=soundforsleep";

mongoose.connect(dbURI);

// Connection success
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB database");
});

// Connection failure
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Define a Mongoose Schema for the user data
const userSchema = new mongoose.Schema({
  name: String,
  mood: String,
});

// Create a Model based on the schema
const User = mongoose.model("User", userSchema);

// POST endpoint to handle form submission
app.post("/submit-form", async (req, res) => {
  const { name, mood } = req.body;
  const newUser = new User({ name, mood });
  try {
    await newUser.save();
    res.status(201).send("User added");
  } catch (error) {
    res.status(500).send("Error saving user: " + error.message);
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
