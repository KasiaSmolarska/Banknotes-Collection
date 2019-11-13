import React from "react";

import GoogleIcon from "./svg/GoogleIcon";
import FacebookIcon from "./svg/FacebookIcon";

import "./LoginPage.scss";

const LoginPage = props => {
  return (
    <div className="container">
      <ul className="collection with-header">
        <li className="collection-header">
          <div>Log in/sign in.</div>
        </li>
        <li className="collection-item">
          <a className="waves-effect waves-light btn-large red btn-flex" href="/auth/google">
            <GoogleIcon color="#FFF" /> Login with Google
          </a>
        </li>
        <li className="collection-item">
          <a className="waves-effect waves-light btn-large indigo darken-1 btn-flex" href="/auth/facebook">
            <FacebookIcon color="#FFF" />
            Login with Facebook
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LoginPage;
