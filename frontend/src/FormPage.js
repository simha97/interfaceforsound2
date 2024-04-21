import React, { useState } from "react";

function UserForm() {
  const [name, setName] = useState("");
  const [mood, setMood] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "https://interfaceforsound2-api.vercel.app/submit-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, mood }),
      }
    );
    // Handle the response from the server here
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
