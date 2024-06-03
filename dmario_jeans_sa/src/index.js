import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../src/components/assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./components/pages/Login/login";
import Signup from "./components/pages/Login/signup";
import EditarPerfil from "./components/pages/MainInterface/EditarPerfil";
import Bodega from "./components/pages/MainInterface/Bodega";
import Diseños from "./components/pages/MainInterface/Diseños";

const App = () => {
  const [isAuthenticated,] = useState(false);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login isAuthenticated={isAuthenticated} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup isAuthenticated={isAuthenticated} />}
          />
          <Route
            exact
            path="/editar"
            element={<EditarPerfil />}
            isAuthenticated={isAuthenticated}
          />
          <Route
            exact
            path="/bodega"
            element={<Bodega />}
            isAuthenticated={isAuthenticated}
          />
          <Route
            exact
            path="/diseño"
            element={<Diseños />}
            isAuthenticated={isAuthenticated}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
reportWebVitals();
