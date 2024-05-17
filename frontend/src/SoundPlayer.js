import React, { useState, useEffect, useRef } from "react";
import "./SoundPlayer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

const SoundPlayer = ({ selectedSound }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(7200); // 2 hours in seconds
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const quotes = [
    "Adjust the volume to your comfort level",
    "Enjoy the sound",
    "Sweet dreams",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play();
    }

    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  const handlePausePlay = (event) => {
    event.preventDefault(); // Prevent form submission

    if (isPlaying) {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    } else {
      audioRef.current.play();
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
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
