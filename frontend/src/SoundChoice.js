import React, { useState } from "react";
import axios from "axios";
import SoundCard from "./SoundCard";
import SoundPlayer from "./SoundPlayer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function UserForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    day: "Productive",
    relaxation: 5,
    mood: "Happy",
    selectedSound: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(""); // Clear error message on change
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (currentStep === 1 && !formData.name) {
      hasError = true;
    } else if (currentStep === 2 && !formData.day) {
      hasError = true;
    } else if (
      currentStep === 3 &&
      (formData.relaxation === null || formData.relaxation === "")
    ) {
      hasError = true;
    } else if (currentStep === 4 && !formData.mood) {
      hasError = true;
    } else if (currentStep === 5 && !formData.selectedSound) {
      hasError = true;
    }

    if (hasError) {
      setErrorMessage("Please answer the question before proceeding.");
      return;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      console.log(`Current Form Data at Step ${currentStep}:`, formData);
    } else {
      console.log("Final Form Data:", formData);
      setCurrentStep(currentStep + 1);
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

  const handleChangeSound = () => {
    setCurrentStep(5);
  };

  const [currentPlaying, setCurrentPlaying] = useState(null);

  const sounds = [
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
      setFormData({ ...formData, selectedSound: sound.title });
    }
    setErrorMessage(""); // Clear error message on change
  };

  const filteredSounds = sounds.filter((sound) =>
    moodSoundMap[formData.mood]?.includes(sound.title)
  );

  const moodMessages = {
    Stressed:
      "Sorry to hear that you're feeling stressed.<br /><br />We suggest three sounds to have a good night sleep:",
    Sad: "Sorry to hear that you're feeling sad.<br /><br />We suggest three sounds to have a good night sleep:",
    Happy:
      "Good to hear that you're feeling happy.<br /><br />We suggest three sounds to have a good night sleep:",
    Calm: "Good to hear that you're feeling calm.<br /><br />We suggest three sounds to have a good night sleep:",
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <form onSubmit={handleSubmit} className="form">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {currentStep === 1 && (
            <div className="mb-4 first_4">
              <label htmlFor="name">
                Enter your code: (You received the code in the first email)
              </label>
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
            <div className="mb-4 first_4">
              <label>How was your day?</label>
              <div
                className="btn-group"
                role="group"
                aria-label="Day selection"
              >
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
                        className="btn radio-outline-primary"
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
            <div className="mb-4 first_4">
              <label htmlFor="relax-slider">
                How relax are you now (0-10):
              </label>
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
            <div className="mb-4 first_4">
              <label>Select your current mood:</label>
              <div
                className="btn-group"
                role="group"
                aria-label="Mood selection"
              >
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
                      className="btn radio-outline-primary"
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
            <div className="container">
              <div className="mb-4">
                <h4
                  className="message"
                  dangerouslySetInnerHTML={{
                    __html: moodMessages[formData.mood],
                  }}
                />
              </div>
              <div className="d-flex flex-column align-items-center">
                {filteredSounds.map((sound) => (
                  <SoundCard
                    key={sound.id}
                    sound={sound}
                    onTogglePlay={handleTogglePlay}
                    isPlaying={currentPlaying === sound.id}
                  />
                ))}
              </div>
            </div>
          )}

          {currentStep === 6 && formData.selectedSound && (
            <SoundPlayer selectedSound={formData.selectedSound} />
          )}

          <div className="d-flex justify-content-between mt-3">
            {currentStep > 1 && currentStep < 6 && (
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            {currentStep === 6 && (
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleChangeSound}
              >
                Change Sound
              </button>
            )}
            {currentStep !== 6 && (
              <button type="submit" className="btn btn-primary btn-lg">
                {currentStep === 5 ? "Submit" : "Next Question"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
