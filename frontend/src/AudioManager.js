// AudioManager.js
import React, { useRef, useEffect } from "react";

const AudioManager = ({ soundUrl, isPlaying, onEnd }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handlePlay = () => {
      console.log(`Audio is playing: ${soundUrl}`);
    };

    const handlePause = () => {
      console.log(`Audio is paused: ${soundUrl}`);
    };

    const handleEnded = () => {
      console.log(`Audio has ended and will loop: ${soundUrl}`);
      onEnd();
    };

    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);
    audioElement.addEventListener("ended", handleEnded);

    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    return () => {
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [isPlaying, soundUrl, onEnd]);

  return <audio ref={audioRef} src={soundUrl} loop />;
};

export default AudioManager;
