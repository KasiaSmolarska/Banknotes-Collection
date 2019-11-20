import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import FormGroup from "../form/FormGroup";

import postBanknote from "../../store/actions/postBanknote";

const BANKNOTE_FORM_GROUPS = {
  elementary: ["title", "value", "currency", "own"],
  geolocation: ["country", "continent"],
  specification: ["pickNumber", "tbbPickNumber", "countryPickNumber", "serialNumber", "issueBank", "issueYear", "condition", "series", "type"],
  appearance: ["observe", "reverse", "width", "height", "signatures", "textOnNote"]
};

let data = {};

class BanknoteForm extends Component {
  renderFormGroup() {
    return Object.entries(BANKNOTE_FORM_GROUPS).map(([key, value]) => {
      return <FormGroup key={key} name={key} inputsName={value} data={this.props.data} />;
    });
  }

  render() {
    {
      data = this.props.data;
    }
    return (
      <div className="add-new-banknote">
        <form
          className="form form--banknote"
          onSubmit={e => {
            const callback = this.props.handleSubmit(values => {
              this.props.postBanknote(values).then(this.props.closeWindow);
              this.props.reset();
            });
            callback(e);
          }}>
          <div className="form--banknote__header">
            <h1>Add new banknote</h1>
            <button className="btn" type="submit">
              submit
            </button>
          </div>

          {this.renderFormGroup()}
        </form>
      </div>
    );
  }
}

function validateInputs(values) {
  const errors = {};
  console.log(errors);
  if (data) {
    Object.keys(data).forEach(key => {
      if (!values[key]) {
        if (data[key].required) {
          return (errors[key] = `You must provide ${key}`);
        }
      }
    });
  }

  return errors;
}

function mapStateToProps({ form: { banknoteForm } }) {
  return {
    form: banknoteForm
  };
}

const mapDispatchToProps = dispatch => ({
  postBanknote: banknote => dispatch(postBanknote(banknote))
});

BanknoteForm = connect(mapStateToProps, mapDispatchToProps)(BanknoteForm);

export default reduxForm({
  form: "banknoteForm",
  validate: validateInputs,
  destroyOnUnmount: true
})(BanknoteForm);
