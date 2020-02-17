import React from "react";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import GoogleIcon from "./svg/GoogleIcon";
import FacebookIcon from "./svg/FacebookIcon";

const getAuth = state => state.auth;

const LoginPage = props => {
  const auth = useSelector(getAuth);

  if (auth.user) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="auth auth__wrapper">
      <div className="auth__container text-center">
        <h1 className="auth__heading heading-1">Login or create Account.</h1>
        <div className="auth__element">
          <a className="btn btn--google btn--flex btn--icon" href="/auth/google">
            <GoogleIcon color="#FFF" /> Login with Google
          </a>
        </div>
        <div className="auth__element">
          <a className="btn btn--facebook btn--flex btn--icon" href="/auth/facebook">
            <FacebookIcon color="#FFF" />
            Login with Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
