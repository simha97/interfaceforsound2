import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [name, setName] = useState("");
  const [mood, setMood] = useState("");

  // In your form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://interfaceforsound2-api.vercel.app/submit-form",
        {
          name, // assuming this variable holds the name input
          mood, // assuming this variable holds the mood input
        }
      );

      // Handle the response from the server here
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors here, including error.response to access server response
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <div onChange={(e) => setMood(e.target.value)}>
          <input type="radio" value="Happy" name="mood" /> Happy
          <input type="radio" value="Stressed" name="mood" /> Stressed
          <input type="radio" value="Calm" name="mood" /> Calm
          <input type="radio" value="Sad" name="mood" /> Sad
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
