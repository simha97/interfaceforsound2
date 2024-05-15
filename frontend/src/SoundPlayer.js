import React, { useState, useEffect, useRef } from "react";

const SoundPlayer = ({ selectedSound }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [time, setTime] = useState(7200); // 2 hours in seconds
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

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
      <h2>Now Playing: {selectedSound}</h2>
      <audio ref={audioRef} src={`./${selectedSound.toLowerCase()}.mp3`} />
      <button onClick={handlePausePlay} className="btn btn-primary btn-lg">
        {isPlaying ? "Pause" : "Play"}
      </button>
      <div className="timer">
        <h3>{formatTime(time)}</h3>
      </div>
    </div>
  );
};

export default SoundPlayer;
