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
      <div>
        <form
          className="form form--login"
          onSubmit={e => {
            const callback = this.props.handleSubmit(values => {
              this.props.registerUser(values);
            });
            callback(e);
          }}>
          <Field component={Input} name="givenName" id="givenName" required/>
          <Field component={Input} name="familyName" id="familyName"/>
          <Field component={Input} name="email" id="email" type="email" required />
          <Field component={Input} name="password" id="password" type="password" required />
          <Field component={Input} name="password2" id="password2" type="password" required />


          <div className="form--filters__footer">
            <button type="submit" className="modal__foter-submit btn btn--blue">
              <Translate name="button.submit" />
            </button>
          </div>
        </form>
      </div>
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
