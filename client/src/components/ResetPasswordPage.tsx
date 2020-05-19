import React, {useEffect } from "react";
import { RouteComponentProps, RouteChildrenProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu } from "./landing/Menu";
import ResetPassword from "./ResetPassword";
import actions from "../store/actions";

import PropTypes from "prop-types";
import { TranslateContextTypes } from "../translate/TranslateProvider";

type ResetPasswordPageProps = RouteChildrenProps<{
  passwordToken:string;
}>

const ResetPasswordPage = ({ match, history }: ResetPasswordPageProps, context: TranslateContextTypes) => {
  const passwordToken =  match?.params?.passwordToken || '';

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
