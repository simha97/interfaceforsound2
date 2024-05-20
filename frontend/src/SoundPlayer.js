import React, { useState, useEffect, useRef } from "react";
import "./SoundPlayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

const SoundPlayer = ({ selectedSound }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(180); // 3 minutes in seconds
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
      if (!startTime) return; // Ensure startTime is set
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = 180 - elapsedTime; // Updated for 3 minutes
      if (remainingTime <= 0) {
        clearInterval(intervalRef.current);
        audioRef.current.pause(); // Stop the audio when time runs out
        audioRef.current.currentTime = 0; // Reset audio to start
        setIsPlaying(false); // Update play state
        setTime(0);
      } else {
        setTime(remainingTime);
      }
    };

    if (isPlaying) {
      setStartTime(Date.now() - (180 - time) * 1000); // Adjust startTime based on remaining time
      audioRef.current.play();
      intervalRef.current = setInterval(updateTimer, 1000);
    } else {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, startTime]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const handlePausePlay = () => {
    if (!isPlaying) {
      setStartTime(Date.now() - (180 - time) * 1000); // Reset startTime when resuming
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
