export const sounds = [
  {
    id: 1,
    title: "Rain sound",
    imageUrl: "./rain_umbrella.jpg",
    audioUrl: "./rain sound.mp3",
  },
  {
    id: 2,
    title: "Underwater",
    imageUrl: "/underwater.jpg",
    audioUrl: "./underwater.mp3",
  },
  {
    id: 3,
    title: "Singing Bowls",
    imageUrl: "/singingBowls.jpeg",
    audioUrl: "./singing bowls.mp3",
  },
  {
    id: 4,
    title: "Birds",
    imageUrl: "/birds.jpg",
    audioUrl: "./birds.mp3",
  },
  {
    id: 5,
    title: "Crickets",
    imageUrl: "/crickets.jpg",
    audioUrl: "./crickets.mp3",
  },
];

export const moodSoundMap = {
  Happy: ["Birds", "Rain sound", "Crickets"],
  Stressed: ["Rain sound", "Underwater", "Singing Bowls"],
  Calm: ["Rain sound", "Singing Bowls", "Crickets"],
  Sad: ["Rain sound", "Underwater", "Singing Bowls"],
};

export const moodMessages = {
  Stressed:
    "Sorry to hear that you're feeling stressed.<br /><br />We suggest three sounds to have a good night sleep:",
  Sad: "Sorry to hear that you're feeling sad.<br /><br />We suggest three sounds to have a good night sleep:",
  Happy:
    "Good to hear that you're feeling happy.<br /><br />We suggest three sounds to have a good night sleep:",
  Calm: "Good to hear that you're feeling calm.<br /><br />We suggest three sounds to have a good night sleep:",
};
