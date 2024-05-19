const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const corsOptions = {
  origin: "https://interfaceforsound2-frontend.vercel.app", // Your frontend URL
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, POST", // Allowed request methods
  credentials: true, // To allow cookies to be sent and received
};

app.use(cors(corsOptions));

const dbURI =
  "mongodb+srv://simonhallak3:B9fQRohJNgeISs3I@soundforsleep.f573e6z.mongodb.net/?retryWrites=true&w=majority&appName=soundforsleep";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB database");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const getUserModel = (name) => {
  const userSchema = new mongoose.Schema({
    day: String,
    relaxation: Number,
    mood: String,
    selectedSound: String,
    timestamp: { type: Date, default: Date.now }, // Automatically capture the current date and time
  });

  // Dynamically set the collection name based on the user's name
  const collectionName = name.trim().replace(/\s+/g, "_").toLowerCase(); // Replacing spaces with underscores for collection names
  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, userSchema, collectionName)
  );
};

app.post("/submit-form", async (req, res) => {
  const { name, day, relaxation, mood, selectedSound } = req.body;
  console.log("Received data:", req.body);

  try {
    const UserModel = getUserModel(name);
    const newUser = new UserModel({ day, relaxation, mood, selectedSound });
    await newUser.save();
    res.status(201).send("User data added");
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).send("Error saving user data: " + error.message);
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
