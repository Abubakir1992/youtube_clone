import React, { useState } from "react";
import axios from "axios";
import VideoPlayer from "./youtube.js";
import SearchBar from "./Search.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

const API_KEY = "AIzaSyA0NxPeGiiw3nYZFYT9U_jv2wcQqgjyeQ0";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const loadNextVideo = () => {
    const nextVideoId = videos[currentVideoIndex + 1].id.videoId;
    setCurrentVideoIndex(currentVideoIndex + 1);
    setSelectedVideoId(nextVideoId);
  };

  const loadPrevVideo = () => {
    const nextVideoId = videos[currentVideoIndex - 1].id.videoId;
    setCurrentVideoIndex(currentVideoIndex - 1);
    setSelectedVideoId(nextVideoId);
  };

  const findIndex = (tag) => {
    const videoList = Array.from(videos);

    const indexValue = videoList.findIndex((item) => item.etag === tag);

    setCurrentVideoIndex(indexValue);
  };

  const handleSearch = async (search) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            maxResults: 50,
            key: API_KEY,
            q: search,
          },
        }
      );

      setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      setVideos(response.data.items);
      if (response.data.items.length > 0) {
        setSelectedVideoId(response.data.items[0].id.videoId);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleVideoSelect = (videoId, etag) => {
    setSelectedVideoId(videoId);
    findIndex(etag);
  };
console.log(currentVideoIndex)
  return (
    <div className="youtube_wrapper">
      <div className="sticky-container">
      <VideoPlayer videoId={selectedVideoId} loadNextVideo={loadNextVideo} />
      <SearchBar handleSearch={handleSearch} />
      {selectedVideoId !== null && (
        <button className="nextbutton" onClick={loadNextVideo} disabled={currentVideoIndex === 49}>
          Next <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      )}
      {selectedVideoId !== null && (
        <button className="prevbutton" onClick={loadPrevVideo} disabled={!currentVideoIndex}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} /> Previous
        </button>
      )}
      </div>
      <div className="video_list">
        {videos.map((video) => (
          <div
            className={`box box-${video.id.videoId}`}
            key={video.id.videoId}
            onClick={() => handleVideoSelect(video.id.videoId, video.etag)}
          >
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              />
              <form>
                <h2>{video.snippet.title}</h2>
              </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
