import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import actions from "../store/actions";
import PropTypes from "prop-types";
import Translate from "../translate/Translate";
import Input from "./form/Input";

import { Field } from "redux-form";

class LoginForm extends React.Component {
  render() {
    return (
      <form
        className="form form--login"
        onSubmit={e => {
          const callback = this.props.handleSubmit(values => {
            this.props.loginUser(values);
            // this.props.reset();
          });
          callback(e);
        }}>
        <Field component={Input} name="email" id="email" type="email" />
        <Field component={Input} name="password" id="password" type="password" />

        <div className="form--login__footer">
          <span onClick={() => this.props.toggleRegisterState()} className="btn btn--primary--reverse btn--smaller">
            <Translate name="button.register" />
          </span>
          <button type="submit" className="modal__foter-submit btn btn--primary">
            <Translate name="button.login" />
          </button>
        </div>
        <div className="form--login__or">
          <Translate name="register.or" />
        </div>
      </form>
    );
  }
}

function mapStateToProps({ form: { loginForm } }) {
  return {
    form: loginForm
  };
}

const mapDispatchToProps = dispatch => ({
  loginUser: values => dispatch(actions.loginUser(values))
});

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default reduxForm({
  form: "loginForm",
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false
})(LoginForm);

LoginForm.contextTypes = {
  translate: PropTypes.func
};
