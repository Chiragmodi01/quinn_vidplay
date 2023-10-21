import { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

function MainProvider({ children }) {
    const [videosArr, setVideosArr] = useState([]);
    const [videoToEdit, setVideoToEdit] = useState({});

    console.log(videosArr)

    useEffect(() => {
      if('videosArr' in localStorage) {
        const cachedVideos = localStorage.getItem('videosArr');
        setVideosArr(JSON.parse(cachedVideos))
      }
    }, [])

    useEffect(() => {
      console.log(videosArr, videoToEdit)
      const index = videosArr.findIndex(video => video.id === videoToEdit.id);
      if (index !== -1) {
        const updatedVideos = [...videosArr];
        updatedVideos[index] = videoToEdit;
        setVideosArr(updatedVideos);
      }
    }, [videoToEdit, videosArr])

    useEffect(() => {
      videosArr.length >0 && localStorage.setItem('videosArr', JSON.stringify(videosArr))
    }, [videosArr])


      return (
        <MainContext.Provider value={{videoToEdit, setVideoToEdit, videosArr, setVideosArr}}>
            {children}
        </MainContext.Provider>
      )
}

const useMain = () => useContext(MainContext);

export { MainProvider, useMain };