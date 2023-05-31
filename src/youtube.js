import React, { useRef } from "react";
import ReactPlayer from 'react-player'

const VideoPlayer = ({ videoId }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`;

  const playerRef = useRef(null);

  return (
    <div className="sticky-container">
        <ReactPlayer
          className="sticky-video"
          ref={playerRef}
          width="560"
          url={videoUrl}
          title="YouTube Video Player"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; encrypted-media; accelerometer"
          controls
          loop
        ></ReactPlayer>
    </div>
  );
};

export default VideoPlayer;
