import React, { useRef, useState } from 'react'
import './Navbar.css';
import {Home} from '@styled-icons/entypo/Home';
import {VideoAdd} from '@styled-icons/fluentui-system-regular/VideoAdd'
import { useNavigate } from 'react-router-dom';
import { useMain } from '../../helpers/context/main-context';

const Navbar = () => {
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const {videosArr, setVideosArr} = useMain();
    let addVideoInputRef = useRef(null)

    let navigate = useNavigate();

    const handleAddVideo = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const videoObject = {
              id: Date.now(),
              file: URL.createObjectURL(file),
              name: file.name,
            };
            setVideosArr((prevVideos) => [...prevVideos, videoObject]);
        }
    }

    const handleChoose = (e) => {
        e.preventDefault();
        addVideoInputRef.current.click();
      };

  return (
    <div className='navbar-container'>
        <div className="brand-container">
        <Home className='icon-home' onClick={() => navigate("/")} size={30}/>
        <p className="brand-name">Video Library</p>
        </div>
        <div className="upload-btn-container">
            <label className='btn-add-video' onClick={(e) => handleChoose(e)} htmlFor="addvideo">
            <p>Add Video</p> <VideoAdd color={'white'} size={20} />
            </label>
            <input accept=".mov,.mp4" type='file' ref={addVideoInputRef} id='addvideo' name='addvideo' onChange={(e) => handleAddVideo(e)} className="btn-upload" />
        </div>
    </div>
  )
}

export default Navbar