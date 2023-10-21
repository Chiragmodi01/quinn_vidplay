import './App.css';
import Navbar from './components/Navbar/Navbar';
import VideoEditor from './screens/VideoEditor/VideoEditor';
import VideoGallery from './screens/VideoGallery/VideoGallery';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<VideoGallery />}/>
          <Route path="/editor" element={<VideoEditor />} />
      </Routes>
    </div>
  );
}

export default App;
