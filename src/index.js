import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { MainProvider } from './helpers/context/main-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <MainProvider>
        <App />
      </MainProvider>
    </Router>
  </React.StrictMode>
);


//js react styled-comps useContext router react-player