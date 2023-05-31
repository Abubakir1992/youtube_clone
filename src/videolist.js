import React, { useState } from 'react';
import axios from 'axios';
import VideoPlayer from './youtube.js';
import SearchBar from './Search.js';

const API_KEY = 'AIzaSyA0NxPeGiiw3nYZFYT9U_jv2wcQqgjyeQ0';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [nextPageToken, setNextPageToken] = useState('');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const loadNextVideo = () => {
    const nextVideoId = videos[currentVideoIndex + 1].id.videoId;
    setCurrentVideoIndex(currentVideoIndex + 1)
    setSelectedVideoId(nextVideoId)
    console.log(videos)
  } 

  const handleSearch = async (search, pageToken = '') => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 50,
          key: API_KEY
          ,
          q: search,
          pageToken: pageToken
        },
      });

      setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken);
      console.log(response.data.items)
      setVideos(response.data.items);
      if (response.data.items.length > 0) {
        setSelectedVideoId(response.data.items[0].id.videoId);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const loadMoreVideos = () => {
    handleSearch(selectedVideoId, nextPageToken);
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <VideoPlayer videoId={selectedVideoId} loadNextVideo={loadNextVideo} />
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId} onClick={() => handleVideoSelect(video.id.videoId)}>
            <h2>{video.snippet.title}</h2>
            <p>{video.snippet.description}</p>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          </div>
        ))}
         {nextPageToken && <button onClick={loadMoreVideos}>Load More</button>}
</div>
</div>)}

export default VideoList