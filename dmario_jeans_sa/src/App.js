import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/Login/LoginSignup";
import EditarPerfil from "./components/pages/MainInterface/EditarPerfil";
import Bodega from "./components/pages/MainInterface/Bodega";
import Diseños from "./components/pages/MainInterface/Diseños";
import AuthRoute from "./components/pages/Login/AuthRoute"; 

function App() {
  const [isAuthenticated,] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<LoginPage isAuthenticated={isAuthenticated} />} 
        />
        <AuthRoute
          exact
          path="/editar"
          component={EditarPerfil}
          isAuthenticated={isAuthenticated}
        />
        <AuthRoute
          exact
          path="/bodega"
          component={Bodega}
          isAuthenticated={isAuthenticated}
        />
        <AuthRoute
          exact
          path="/diseños"
          component={Diseños}
          isAuthenticated={isAuthenticated}
        />
      </Routes>
    </Router>
  );
}

export default App;
