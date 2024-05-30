import React from "react";
import { Route, Navigate } from "react-router-dom";

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    element={isAuthenticated ? <Component /> : <Navigate to="/login" replace />}
  />
);

export default AuthRoute;
