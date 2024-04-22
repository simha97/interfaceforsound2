import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [mood, setMood] = useState("");

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://interfaceforsound2-api.vercel.app/submit-form", {
        name,
        mood,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>Mood:</label>
          <select
            onChange={(e) => setMood(e.target.value)}
            value={mood}
            required
          >
            <option value="">Select your mood</option>
            <option value="Happy">Happy</option>
            <option value="Stressed">Stressed</option>
            <option value="Calm">Calm</option>
            <option value="Sad">Sad</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
