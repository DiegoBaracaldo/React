import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./components/pages/Login/LoginSignup";
import EditarPerfil from "./components/pages/MainInterface/EditarPerfil";
import Bodega from "./components/pages/MainInterface/Bodega";
import Diseños from "./components/pages/MainInterface/Diseños";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/informacion" component={EditarPerfil} /> 
        <Route exact path="/bodega" component={Bodega} /> 
        <Route exact path="/diseños" component={Diseños} /> 
      </Switch>
    </Router>
  );
}

export default App;
