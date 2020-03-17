import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import actions from "../store/actions";
import PropTypes from "prop-types";
import Translate from "../translate/Translate";
import Input from "./form/Input";

import { Field } from "redux-form";

class RecoverPassword extends React.Component {
  render() {
    return (
      <form
        className="form form--login"
        onSubmit={e => {
          const callback = this.props.handleSubmit(values => {
            this.props.remindPassword(values).then(status => {
              if (status === "success") {
                this.props.reset();
              }
            });
          })
          callback(e);
        }}>
        <h1 className="auth__heading">
          <Translate name="recoverPasswordform.header" />
        </h1>
        <div className="text">
          <Translate name="recoverPasswordform.subheader" />
        </div>
        <Field component={Input} name="email" id="email" type="email" required />

        <div className="form--login__footer">
          <span onClick={() => this.props.toggleRecoverMode()} className="btn btn--primary--reverse btn--smaller">
            <Translate name="button.login-back" />
          </span>
          <button type="submit" className="modal__foter-submit btn btn--primary">
            <Translate name="button.remindPassword" />
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ form: { recoverPassword } }) {
  return {
    form: recoverPassword
  };
}

const mapDispatchToProps = dispatch => ({
  remindPassword: values => dispatch(actions.remindPassword(values))
});

RecoverPassword = connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);

export default reduxForm({
  form: "recoverPassword",
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false
})(RecoverPassword);

RecoverPassword.contextTypes = {
  translate: PropTypes.func
};
