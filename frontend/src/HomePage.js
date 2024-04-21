// HomePage.js

import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const sentences = [
  "Clear your mind",
  "You did well today",
  "Think of something peaceful",
  "",
  // Additional sentences...
];

function HomePage() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [phase, setPhase] = useState("fade-in"); // Handle sentence animation
  const [showButtons, setShowButtons] = useState(false); // Adjusted for both buttons
  const audioRef = useRef(new Audio("/Chimes.mp3")); // Ref for the audio object

  useEffect(() => {
    let timeoutId;

    if (currentSentenceIndex < sentences.length - 1) {
      if (phase === "fade-in") {
        timeoutId = setTimeout(() => setPhase("visible"), 2000);
      } else if (phase === "visible") {
        timeoutId = setTimeout(() => setPhase("fade-out"), 2000);
      } else if (phase === "fade-out") {
        timeoutId = setTimeout(() => {
          setCurrentSentenceIndex((prevIndex) => prevIndex + 1);
          setPhase("fade-in");
        }, 2000);
      }
    } else {
      setShowButtons(true);
    }

    return () => clearTimeout(timeoutId);
  }, [phase, currentSentenceIndex]);

  useEffect(() => {
    audioRef.current.loop = true;
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const playAudio = () => {
    audioRef.current.play();
  };

  const stopAudio = () => {
    audioRef.current.pause(); // Pause the audio
    audioRef.current.currentTime = 0; // Reset the audio to the start
  };

  return (
    <div className="App">
      {currentSentenceIndex < sentences.length && (
        <div className={`sentence ${phase}`}>
          {sentences[currentSentenceIndex]}
        </div>
      )}
      {showButtons && (
        <div>
          <button className="fade-in-button" onClick={playAudio}>
            Play Sound
          </button>
          <button className="fade-in-button" onClick={stopAudio}>
            Stop Sound
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
