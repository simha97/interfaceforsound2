// UserForm.js
import React, { useState } from "react";
import axios from "axios";
import SoundCard from "./SoundCard"; // Import the SoundCard component
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function UserForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    day: "Productive", // Default selected day
    relaxation: 5, // Default relaxation level
    mood: "Happy", // Default mood
    selectedSound: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1); // Move to the next step
      console.log(`Current Form Data at Step ${currentStep}:`, formData);
    } else {
      console.log("Final Form Data:", formData); // Print final form data to console before submission
      try {
        const response = await axios.post(
          "https://interfaceforsound2.onrender.com/submit-form",
          formData
        );
        console.log("Form submitted successfully: ", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [currentPlaying, setCurrentPlaying] = useState(null);

  const sounds = [
    {
      id: 1,
      title: "Rain sound",
      imageUrl: "./rain_umbrella.jpg",
      audioUrl: "./rain.mp3",
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
      audioUrl: "./bowls.mp3",
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

  const moodSoundMap = {
    Happy: ["Birds", "Rain sound", "Crickets"],
    Stressed: ["Rain sound", "Underwater", "Singing Bowls"],
    Calm: ["Rain sound", "Singing Bowls", "Crickets"],
    Sad: ["Rain sound", "Underwater", "Singing Bowls"],
  };

  const handleTogglePlay = (soundId) => {
    const sound = sounds.find((sound) => sound.id === soundId);
    if (currentPlaying === soundId) {
      setCurrentPlaying(null);
      setFormData({ ...formData, selectedSound: null });
    } else {
      setCurrentPlaying(soundId);
      setFormData({ ...formData, selectedSound: sound.title }); // Using title for more clarity
    }
  };

  const filteredSounds = sounds.filter((sound) =>
    moodSoundMap[formData.mood]?.includes(sound.title)
  );

  return (
    <div className="App">
      <div className="container mt-5">
        <form onSubmit={handleSubmit} className="form">
          {currentStep === 1 && (
            <div className="mb-4">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="mb-4">
              <h4>How was your day?</h4>
              <div
                className="btn-group"
                role="group"
                aria-label="Day selection"
              >
                {/* Buttons for day selection */}
                {["Productive", "Challenging", "Relaxing", "Stressful"].map(
                  (type) => (
                    <React.Fragment key={type}>
                      <input
                        type="radio"
                        className="btn-check"
                        id={`day-${type}`}
                        name="day"
                        value={type}
                        checked={formData.day === type}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                      <label
                        className="btn btn-outline-primary"
                        htmlFor={`day-${type}`}
                      >
                        {type}
                      </label>
                    </React.Fragment>
                  )
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mb-4">
              <label htmlFor="relax-slider">Relaxing Level (0-10):</label>
              <input
                type="range"
                className="form-range"
                id="relax-slider"
                name="relaxation"
                min="0"
                max="10"
                value={formData.relaxation}
                onChange={handleInputChange}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="mb-4">
              <h4>Select your current mood:</h4>
              <div
                className="btn-group"
                role="group"
                aria-label="Mood selection"
              >
                {/* Buttons for mood selection */}
                {["Happy", "Stressed", "Calm", "Sad"].map((mood) => (
                  <React.Fragment key={mood}>
                    <input
                      type="radio"
                      className="btn-check"
                      id={`mood-${mood}`}
                      name="mood"
                      value={mood}
                      checked={formData.mood === mood}
                      onChange={handleInputChange}
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor={`mood-${mood}`}
                    >
                      {mood}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          {currentStep === 5 && (
            <div>
              <div className="container mt-5">
                <div className="d-flex flex-column align-items-center">
                  {filteredSounds.map((sound) => (
                    <SoundCard
                      key={sound.id}
                      sound={sound}
                      onTogglePlay={handleTogglePlay}
                      isPlaying={currentPlaying === sound.id} // Pass isPlaying state to the SoundCard
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-between mt-3">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            <button type="submit" className="btn btn-primary btn-lg">
              {currentStep === 5 ? "Submit Final" : "Next Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
