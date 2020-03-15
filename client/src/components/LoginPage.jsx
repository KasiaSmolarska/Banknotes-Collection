import React, {useState} from "react";

import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Spinner } from "./Spinner";
import { Menu } from "./landing/Menu";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import GoogleIcon from "./svg/GoogleIcon";
import FacebookIcon from "./svg/FacebookIcon";

const getAuth = state => state.auth;

const LoginPage = props => {
  const auth = useSelector(getAuth);

  const [registerState, setRegisterState] = useState(false);

  if (auth.user) {
    return <Redirect to="/dashboard" />;
  }
  return !auth.loading ? (
    <div className="auth landing">
      <Menu />

      <div className="auth__wrapper">
        <div className="auth__container text-center">
          <h1 className="auth__heading">Login or create Account.</h1>
          {!registerState ? <RegisterForm /> : <LoginForm/>}
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
    </div>
  ) : (
    <Spinner />
  );
};

export default LoginPage;
