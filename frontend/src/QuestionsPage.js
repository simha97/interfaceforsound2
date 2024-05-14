import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function UserForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    day: "Productive", // Default selected day
    energy: 5, // Default energy level
    relaxation: 5, // Default relaxation level
    mood: "Happy", // Default mood
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1); // Move to the next step
    } else {
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
              <label htmlFor="energy-slider">Energy Level (0-10):</label>
              <input
                type="range"
                className="form-range"
                id="energy-slider"
                name="energy"
                min="0"
                max="10"
                value={formData.energy}
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

          <div className="d-flex justify-content-center mt-3">
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
