const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
// Middleware to parse JSON bodies
const corsOptions = {
  origin: "https://interfaceforsound2-frontend.vercel.app", // Your frontend URL
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

// Define a function to get or create a Mongoose model based on the user name
const getUserModel = (name) => {
  const userSchema = new mongoose.Schemaa({
    day: String,
    relaxation: Number,
    mood: String,
    selectedSound: String,
  });

  // Dynamically set the collection name based on the user's name
  return mongoose.models[name] || mongoose.model(name, userSchema, name);
};

// POST endpoint to handle form submission
app.post("/submit-form", async (req, res) => {
  const { name, day, relaxation, mood, selectedSound } = req.body;
  const UserModel = getUserModel(name); // Get or create the model for this name
  const newUser = new UserModel({ day, relaxation, mood, selectedSound });
  try {
    await newUser.save();
    res.status(201).send("User data added");
  } catch (error) {
    res.status(500).send("Error saving user data: " + error.message);
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
