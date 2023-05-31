import React, { useRef } from "react";
import ReactPlayer from 'react-player'

const VideoPlayer = ({ videoId, loadNextVideo }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`; 

  const playerRef = useRef()

  const videoReady = () => {

    if (playerRef.current) {
      playerRef.current.getInternalPlayer().playVideo(); // Autoplay the video
    }
  }

  return (
    <div className="sticky-container">
        <ReactPlayer
          ref={playerRef}
          className="sticky-video"
          url={videoUrl}
          title="YouTube Video Player"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; encrypted-media; accelerometer"
          controls
          onEnded={loadNextVideo}
          onReady={videoReady}
        ></ReactPlayer>
    </div>
  );
};

export default VideoPlayer;
