// SoundCard.js
import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

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

export default SoundCard;
