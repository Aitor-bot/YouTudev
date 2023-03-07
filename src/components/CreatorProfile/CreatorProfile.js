import "./CreatorProfile.scss";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import banner from "../../assets/banner.webp"

function CreatorProfile() {
  const { creatorName } = useParams();
  const [creatorData, setCreatorData] = useState({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchCreatorData() {
      try {
        const response = await axios.get(`http://localhost:3001/getCreatorData/${creatorName}`);
        setCreatorData(response.data);
        setVideos(response.data.videos);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCreatorData();
  }, [creatorName]);

  function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div className="creatorprofile_banner-container">
      <img className="creatorprofile_banner" src={banner} alt="channel banner"></img>
      <div className="creatorprofile_container">
        <div className="creatorprofile_header">
          <img src={creatorData.avatar} alt="Creator avatar" />
          <div className="creatorprofile_info">
            <h1>{creatorData.name}</h1>
            <p>{creatorData.subscribersCount} subscribers</p>
          </div>
        </div>
        
        <div className="creatorprofile_grid-container">
          {videos.map((video) => (
            <div key={video.videoId}>
              <Link to={`/video/${video.videoId}`}>
                <div className="creatorprofile_image">
                  <div className="creatorprofile_duration">{formatDuration(video.videoDuration)}</div>
                  <img src={video.videoThumbnail} alt="videoThumbnail" />
                </div>
                <h3 title={video.videoTitle}>{video.videoTitle}</h3>
              </Link>
              <div className="creatorprofile_video-info">
                <p>{video.name}</p>
                <div className="creatorprofile_video-data">
                  <span>{video.viewCount} views</span>
                  <span>{video.publishData.slice(0, 10)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreatorProfile;