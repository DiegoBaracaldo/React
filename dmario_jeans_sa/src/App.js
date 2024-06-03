import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login/login";
import Signup from "./components/pages/Login/signup";
import EditarPerfil from "./components/pages/MainInterface/EditarPerfil";
import Bodega from "./components/pages/MainInterface/Bodega";
import Diseños from "./components/pages/MainInterface/Diseños";
import update_bodega from "./components/pages/MainInterface/update_bodega";
import AuthRoute from "./components/pages/Login/AuthRoute"; 

function App() {
  const [isAuthenticated,] = useState(false);

  return (
    <Router>
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
          path="/diseño"
          component={Diseños}
          isAuthenticated={isAuthenticated}
        />
     
      </Routes>
    </Router>
  );
}

export default App;
