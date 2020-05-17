import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Spinner } from "./Spinner";
import { Menu } from "./landing/Menu";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RecoverPassword from "./RecoverPassword";

import GoogleIcon from "./svg/GoogleIcon";
//import FacebookIcon from "./svg/FacebookIcon";

import PropTypes from "prop-types";
import Translate from "../translate/Translate";

const getAuth = state => state.auth;

const LoginPage = (props, context) => {
  const auth = useSelector(getAuth);

  const [registerState, setRegisterState] = useState(false);

  const [recoverMode, setRecoverMode] = useState(false);

  const toggleRegisterState = () => {
    setRegisterState(!registerState);
  };

  const toggleRecoverMode = () => {
    setRecoverMode(!recoverMode);
  };

  if (auth.user) {
    return <Redirect to="/dashboard" />;
  }
  return !auth.loading ? (
    <div className="auth landing">
      <Menu />

      <div className="auth__wrapper">
        <div className="auth__container text-center">
          {recoverMode && (
            <>
              <RecoverPassword toggleRecoverMode={toggleRecoverMode} />
            </>
          )}
          {!recoverMode && (
            <>
              <h1 className="auth__heading">{!registerState ? <Translate name="loginform.header" /> : <Translate name="registerform.header" />}</h1>
              {registerState ? <RegisterForm toggleRegisterState={toggleRegisterState} /> : <LoginForm toggleRecoverMode={toggleRecoverMode} toggleRegisterState={toggleRegisterState} />}
              <div className="auth__element">
                <a className="btn btn--google btn--flex btn--icon" href="/auth/google">
                  <GoogleIcon fill="#FFF" /> {registerState ? <Translate name="button.registerWithGoogle" /> : <Translate name="button.loginWithGoogle" />}
                </a>
              </div>
            </>
          )}
          {/* <div className="auth__element">
            <a className="btn btn--facebook btn--flex btn--icon" href="/auth/facebook">
              <FacebookIcon fill="#FFF" />
              Login with Facebook
            </a>
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

export default LoginPage;

LoginPage.contextTypes = {
  translate: PropTypes.func
};
