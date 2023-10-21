import React from 'react'
import './VideoGallery.css'
import Video from '../../components/Video/Video';
import { useMain } from '../../helpers/context/main-context';

const VideoGallary = () => {
  const {videosArr} = useMain();

  if(videosArr.length > 0) {
    return (
      <div className='videoGallery-container'>
          {
            videosArr.map((video) => {
              // return [...Object.values(video)].sort((a, b) => a.id - b.id).map((item) => {
                const {id} = video || {}
                return (
                  <Video video={video} key={id} />
                )
              // })
            })
          }
      </div>
    )
  } else {
    return (
      <div className="no-video">Add Videos in the Gallery</div>
    )
  }
  
}

export default VideoGallary