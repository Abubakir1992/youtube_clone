import React, { useState } from "react";
import axios from "axios";
import VideoPlayer from "./youtube.js";
import SearchBar from "./Search.js";

const API_KEY = "AIzaSyA0NxPeGiiw3nYZFYT9U_jv2wcQqgjyeQ0";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const loadNextVideo = () => {
    const nextVideoId = videos[currentVideoIndex + 1].id.videoId; // % videos[currentVideoIndex].id.videoId.length;
    setCurrentVideoIndex(currentVideoIndex + 1);
    setSelectedVideoId(nextVideoId);
    console.log(videos);

  };

  const findIndex = (tag) => {
    const videoList = Array.from(videos);
    console.log(videoList, tag)
    const indexValue = videoList.findIndex(item => item.etag === tag);
    console.log(indexValue)
    setCurrentVideoIndex(indexValue)
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
    findIndex(etag)
  };

  return (
    <div>
      <VideoPlayer videoId={selectedVideoId} loadNextVideo={loadNextVideo} />
      <SearchBar handleSearch={handleSearch} />
      <div>
        {videos.map((video) => (
          <div
            className={`box box-${video.id.videoId}`}
            key={video.id.videoId}
            onClick={() => handleVideoSelect(video.id.videoId, video.etag)}
          >
            <form>
              <h2>{video.snippet.title}</h2>
            </form>
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
