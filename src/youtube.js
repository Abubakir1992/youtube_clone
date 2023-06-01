import React, { useRef } from "react";
import ReactPlayer from 'react-player'

const VideoPlayer = ({ videoId, loadNextVideo }) => {
  const videoUrl = `https://www.youtube.com/embed/${videoId}`; 
  console.log(videoId)
  const playerRef = useRef()

  const videoReady = () => {

    if (playerRef.current) {
      playerRef.current.getInternalPlayer().playVideo(); // Autoplay the video
    }
  }

  return (
    <div className="sticky-container">
      {videoId !== null ? (
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
        ) : (
        <h3>Enjoy Your Youtube Search!!!</h3>
      )}
    </div>
  );
};

export default VideoPlayer;
