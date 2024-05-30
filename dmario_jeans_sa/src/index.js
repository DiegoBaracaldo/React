import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/pages/Login/LoginSignup';
import EditarPerfil from './components/pages/MainInterface/EditarPerfil';
import Diseños from './components/pages/MainInterface/Diseños';
import Bodega from './components/pages/MainInterface/Bodega';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/editarperfil" element={<EditarPerfil/>} />
      </Routes>
      <Routes>
        <Route path="/diseños" element={<Diseños />} />
      </Routes>
      <Routes>
        <Route path="/bodega" element={<Bodega/>} />
      </Routes>
      <Routes>
        <Route path="/App" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
