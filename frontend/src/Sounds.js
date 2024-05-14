import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported
import "./App.css";

function SoundCard({ sound, onTogglePlay, isPlaying }) {
  const audioRef = useRef(null);
  const borderColor = isPlaying ? "#38CAF7" : "#000000";

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    onTogglePlay(sound.id);
  };

  return (
    <div
      className="card mb-3 position-relative"
      style={{
        width: "80%",
        cursor: "pointer",
        borderColor: borderColor,
        borderWidth: "7px",
        borderStyle: "solid",
      }}
      onClick={togglePlay}
    >
      <audio ref={audioRef} src={sound.audioUrl} />
      <img
        src={sound.imageUrl}
        className="card-img-top"
        alt="Sound thumbnail"
        style={{ opacity: 1 }}
      />
      <div className="card-body position-absolute w-100 h-100 top-0 start-0 d-flex flex-column justify-content-end">
        <div className="d-flex justify-content-between align-items-center w-100 px-3">
          <h4 className="card-title text-white">{sound.title}</h4>
          <FontAwesomeIcon
            icon={isPlaying ? faPauseCircle : faPlayCircle}
            size="3x"
            style={{ color: isPlaying ? "#38CAF7" : "#6c757d" }}
          />
        </div>
      </div>
    </div>
  );
}

function SoundSelectionPage() {
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
  ];

  const handleTogglePlay = (soundId) => {
    if (currentPlaying === soundId) {
      setCurrentPlaying(null); // Pause the sound if the same sound card is clicked
    } else {
      setCurrentPlaying(soundId); // Change the sound if a different card is clicked
    }
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <div className="d-flex flex-column align-items-center">
          {sounds.map((sound) => (
            <SoundCard
              key={sound.id}
              sound={sound}
              onTogglePlay={handleTogglePlay}
              isPlaying={currentPlaying === sound.id} // Pass isPlaying state to the SoundCard
            />
          ))}
        </div>
        <button
          className="btn btn-success mt-3"
          style={{ width: "100%", display: "block" }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default SoundSelectionPage;
