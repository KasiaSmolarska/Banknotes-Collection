import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import actions from "../store/actions";
import PropTypes from "prop-types";
import Translate from "../translate/Translate";
import Input from "./form/Input";

import { Field } from "redux-form";

class ResetPassword extends React.Component {
  render() {
    return (
      <form
        className="form form--login"
        onSubmit={e => {
          const callback = this.props.handleSubmit(values => {
            this.props.resetPassword(values, this.props.passwordToken, this.props.history);
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

function mapStateToProps({ form: { resetPassword } }) {
  return {
    form: resetPassword
  };
}

const mapDispatchToProps = dispatch => ({
  resetPassword: (values, passwordToken, history) => dispatch(actions.resetPassword(values, passwordToken, history))
});

ResetPassword = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

export default reduxForm({
  form: "resetPassword",
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false
})(ResetPassword);

ResetPassword.contextTypes = {
  translate: PropTypes.func
};
