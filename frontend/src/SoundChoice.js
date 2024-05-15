import axios from "axios";
import React, { useState } from "react";

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
      setCurrentStep(currentStep + 1);
      try {
        const response = await axios.post(
          "https://interfaceforsound2.onrender.com/submit-form",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Include credentials (cookies)
          }
        );
        console.log("Form submitted successfully: ", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Day:</label>
        <input
          type="text"
          name="day"
          value={formData.day}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Relaxation Level:</label>
        <input
          type="number"
          name="relaxation"
          value={formData.relaxation}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Mood:</label>
        <input
          type="text"
          name="mood"
          value={formData.mood}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Selected Sound:</label>
        <input
          type="text"
          name="selectedSound"
          value={formData.selectedSound}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
