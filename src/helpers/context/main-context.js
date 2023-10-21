import { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

function MainProvider({ children }) {
    const [videosArr, setVideosArr] = useState([]);
    const [videoToEdit, setVideoToEdit] = useState({});

    console.log(videosArr)

    useEffect(() => {
      console.log(videosArr, videoToEdit)
      const index = videosArr.findIndex(video => video.id === videoToEdit.id);
      if (index !== -1) {
        const updatedVideos = [...videosArr];
        updatedVideos[index] = videoToEdit;
        setVideosArr(updatedVideos);
      }
    }, [videoToEdit])
      return (
        <MainContext.Provider value={{videoToEdit, setVideoToEdit, videosArr, setVideosArr}}>
            {children}
        </MainContext.Provider>
      )
}

const useMain = () => useContext(MainContext);

export { MainProvider, useMain };