import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import { connect } from "react-redux";
import actions from "../store/actions";
import PropTypes from "prop-types";
import Translate from "../translate/Translate";
import Input from "./form/Input";
import { History } from "history";

import { Field } from "redux-form";
import { RootState } from "../store";

import { AppDispatch } from "../store/actions/index";

export type Values = { password: string; email: string };

interface ResetPasswordProps {
  passwordToken: string;
  history: History;
  resetPassword?: (value: Values, passwordToken: string, history: History) => void;
}

class ResetPasswordClass extends React.Component<InjectedFormProps<any, ResetPasswordProps> & ResetPasswordProps>  {
  static contextTypes = {
    translate: PropTypes.func,
  };

  render() {
    return (
      <form
        className="form form--login"
        onSubmit={(e) => {
          const callback = this.props.handleSubmit((values) => {
            this.props.resetPassword && this.props.resetPassword(values, this.props.passwordToken, this.props.history);
          });
          callback(e);
        }}>
        <h1 className="auth__heading">
          <Translate name="resetPasswordform.header" />
        </h1>
        <div className="text">
          <Translate name="resetPasswordform.subheader" />
        </div>
        <Field component={Input} name="email" id="email" type="email" required />
        <Field component={Input} name="password" id="password" type="password" required />
        <Field component={Input} name="password2" id="password2" type="password" required />

        <div className="form--login__footer">
          <button type="submit" className="modal__foter-submit btn btn--primary">
            <Translate name="button.resetPassword" />
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ form: { resetPassword } }: RootState) {
  return {
    form: resetPassword,
  };
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  resetPassword: (values: Values, passwordToken: string, history: History) => dispatch(actions.resetPassword(values, passwordToken, history)),
});

const ResetPassword = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordClass);

export default reduxForm<any, ResetPasswordProps>({
  form: "resetPassword",
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
  // @ts-ignore
})(ResetPassword);
