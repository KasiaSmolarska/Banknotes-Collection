import React, { useState, useEffect } from "react";

import { useSelector, dispatch, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Menu } from "./landing/Menu";
import ResetPassword from "./ResetPassword";
import actions from "../store/actions";

import PropTypes from "prop-types";
import Translate from "../translate/Translate";

const getAuth = state => state.auth;

const ResetPasswordPage = ({ match, history }, context) => {
  const auth = useSelector(getAuth);
  const { passwordToken } = match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.validatePasswordResetToken(passwordToken, history));
  }, [dispatch]);

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
