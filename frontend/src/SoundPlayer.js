import React, { useState, useEffect, useRef } from "react";
import "./SoundPlayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

const SoundPlayer = ({ selectedSound }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(7200); // 3 minutes in seconds
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const quotes = [
    "Adjust the volume to your comfort level",
    "Enjoy the sound",
    "Sweet dreams",
  ];
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // Looping the audio
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          audioRef.current.pause(); // Stop the audio when time runs out
          audioRef.current.currentTime = 0; // Reset audio to start
          setIsPlaying(false); // Update play state
          return 0;
        }
        return prevTime - 1;
      });
    };

    if (isPlaying) {
      audioRef.current.play();
      intervalRef.current = setInterval(updateTimer, 1000);
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const handlePausePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="sound-player">
      <div className="quotes">
        {quotes.map((quote, index) => (
          <h2
            key={index}
            className={index === currentQuote ? "quote-active" : ""}
          >
            {quote}
          </h2>
        ))}
      </div>
      <div
        onClick={handlePausePlay}
        className="play-pause-rectangle p-3 d-flex align-items-center justify-content-between"
      >
        <div className="now-playing text-start me-3">
          <h4 className="mb-4 mt-3">Playing</h4>
          <h3 className="mb-4 mt-3">{selectedSound}</h3>
          <div className="timer">
            <h4 className="m-0">{formatTime(time)}</h4>
          </div>
        </div>
        <FontAwesomeIcon
          icon={isPlaying ? faPauseCircle : faPlayCircle}
          size="3x"
          style={{ color: isPlaying ? "#38CAF7" : "#6c757d" }}
        />
      </div>
      <audio ref={audioRef} src={`./${selectedSound.toLowerCase()}.mp3`} />
    </div>
  );
};

export default SoundPlayer;
