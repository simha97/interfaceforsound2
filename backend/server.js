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

const User = require("./models/User"); // Adjust the path as necessary

app.post("/submit-form", async (req, res) => {
  const { name, day, relaxation, mood, selectedSound } = req.body;

  try {
    const user = await User.findOne({ name });

    if (user) {
      // User exists, add a new entry
      user.entries.push({ day, relaxation, mood, selectedSound });
      await user.save();
      res.status(200).send("User data updated");
    } else {
      // User does not exist, create a new user
      const newUser = new User({
        name,
        entries: [{ day, relaxation, mood, selectedSound }],
      });
      await newUser.save();
      res.status(201).send("New user created and data added");
    }
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
