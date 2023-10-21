import React, { useRef, useState } from 'react'
import './Video.css'
import ReactPlayer from "react-player/lazy";
import { useMain } from '../../helpers/context/main-context';
import { useNavigate } from 'react-router-dom';

const Video = ({video}) => {
  const {file} = video;
  let navigate = useNavigate();
    const [playing, setPlaying] = useState(false);
    const playerRef = useRef(null);
    const {setVideoToEdit, videoToEdit} = useMain();

    console.log(video)

    const handleOnVideoClick = () => {
      setVideoToEdit(video);
      navigate('/editor');
    }

    const handleOnReady=()=>{
      videoToEdit.resultObj && playerRef.current.seekTo(videoToEdit.resultObj.start_time, 'seconds');
    }

  return (
    <div className='video-container'>
        <ReactPlayer
            onMouseOver={() => setPlaying(true)}
            onMouseOut={() => setPlaying(false)}
            onClick={handleOnVideoClick}
            fallback={<VideoFallback />}
            className="react-player"
            ref={playerRef}
            url={file}
            onReady={handleOnReady}
            muted={true}
            width="18rem"
            height="28rem"
            playing={playing}
            volume={0}
            controls={false}
        />
    </div>
  )
}

const VideoFallback = () => {
	return (
		<div className="video-fallback">Loading...</div>
	)
}


export default Video