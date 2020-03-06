import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const getAuth = state => state.auth;

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(getAuth);
  console.log(auth);
  return !auth.loading && <Route {...rest} render={props => (auth.user && !auth.loading ? <Component {...props} /> : <Redirect to="/login" />)} />;
};
