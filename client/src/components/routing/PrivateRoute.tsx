import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const getAuth = (state : RootState) => state.auth;

interface PrivateRouteProps {
  component: React.FunctionComponent<any>
}

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const auth = useSelector(getAuth);
  return !auth.loading && <Route {...rest} render={props => (auth.user && !auth.loading ? <Component {...props} /> : <Redirect to="/login" />)} />;
};
