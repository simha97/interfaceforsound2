const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
const corsOptions = {
  origin: "https://interfaceforsound2-frontend.vercel.app",
  optionsSuccessStatus: 200,
  methods: "GET, POST",
  credentials: true,
};

app.use(cors(corsOptions));

const dbURI =
  "mongodb+srv://simonhallak3:B9fQRohJNgeISs3I@soundforsleep.f573e6z.mongodb.net/?retryWrites=true&w=majority&appName=soundforsleep";

mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB database");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const getUserModel = (userName) => {
  const userSchema = new mongoose.Schema({
    name: String,
    day: String,
    relaxation: Number,
    mood: String,
    selectedSound: String,
  });
  return mongoose.model(userName, userSchema, userName);
};

app.post("/submit-form", async (req, res) => {
  const { name, day, relaxation, mood, selectedSound } = req.body;

  // Get the user model based on the user's name
  const User = getUserModel(name);

  // Create a new user entry
  const newUser = new User({ name, day, relaxation, mood, selectedSound });

  try {
    // Check if the collection exists
    const collections = await mongoose.connection.db
      .listCollections({ name })
      .toArray();
    if (collections.length === 0) {
      console.log(
        `Collection for user ${name} does not exist. Creating a new collection.`
      );
    } else {
      console.log(
        `Collection for user ${name} exists. Adding data to the existing collection.`
      );
    }

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
