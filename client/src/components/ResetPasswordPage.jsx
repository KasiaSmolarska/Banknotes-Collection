import React, {useEffect } from "react";

import { useDispatch } from "react-redux";
import { Menu } from "./landing/Menu";
import ResetPassword from "./ResetPassword";
import actions from "../store/actions";

import PropTypes from "prop-types";

const ResetPasswordPage = ({ match, history }, context) => {
  const { passwordToken } = match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.validatePasswordResetToken(passwordToken, history));
  }, [dispatch, history, passwordToken]);

  return (
    <div className="auth landing">
      <Menu />

      <div className="auth__wrapper">
        <div className="auth__container text-center">
          <ResetPassword history={history} passwordToken={passwordToken}/>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

ResetPasswordPage.contextTypes = {
  translate: PropTypes.func
};
