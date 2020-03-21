import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import actions from "../store/actions";
import PropTypes from "prop-types";
import Translate from "../translate/Translate";
import Input from "./form/Input";

import { Field } from "redux-form";

class RegisterForm extends React.Component {
  render() {
    return (
      <form
        className="form form--login"
        onSubmit={e => {
          const callback = this.props.handleSubmit(values => {
            this.props.registerUser(values);
            this.props.reset();
          });
          callback(e);
        }}>
        <Field component={Input} name="givenName" id="givenName" required />
        <Field component={Input} name="familyName" id="familyName" />
        <Field component={Input} name="email" id="email" type="email" required />
        <Field component={Input} name="password" id="password" type="password" required />
        <Field component={Input} name="password2" id="password2" type="password" required />

        <div className="form--login__footer">
          <span onClick={() => this.props.toggleRegisterState()} className="btn btn--primary--reverse btn--smaller">
            <Translate name="button.login" />
          </span>
          <button type="submit" className="modal__foter-submit btn btn--primary">
            <Translate name="button.register" />
          </button>
        </div>
        <div className="form--login__or">
          <Translate name="register.or" />
        </div>
      </form>
    );
  }
}

function mapStateToProps({ form: { registerForm } }) {
  return {
    form: registerForm
  };
}

const mapDispatchToProps = dispatch => ({
  registerUser: values => dispatch(actions.registerUser(values))
});

RegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

export default reduxForm({
  form: "registerForm",
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false
})(RegisterForm);

RegisterForm.contextTypes = {
  translate: PropTypes.func
};
