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
      <div>
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

          <div className="form--filters__footer">
            <button type="submit" disabled={!(this.props.form && this.props.form.values && Object.keys(this.props.form.values).length)} className="modal__foter-submit btn btn--blue">
              <Translate name="button.submit" />
            </button>
          </div>
        </form>
      </div>
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
