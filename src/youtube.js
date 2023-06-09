import React, { useRef } from "react";
import ReactPlayer from 'react-player'
import WelocomePage from "./welcomePage";

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
    <div>
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
          //width="auto"
        ></ReactPlayer>
        ) : (
        <WelocomePage />
      )}
    </div>
  );
};

export default VideoPlayer;
