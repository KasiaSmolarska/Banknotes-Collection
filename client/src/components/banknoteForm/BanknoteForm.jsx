import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import FormGroup from "../form/FormGroup";
import validateFields from "../../utils/validateFields";

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
          onSubmit={this.props.handleSubmit(values => {
            this.props.postBanknote(values).then(alert("formularz wysłany"));
            this.props.reset();
          })}>
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
      if (key === "currency" || key === "currencyPaid") {
        return (errors[key] = validateFields(values[key] || "", /[A-Z]{2,3}/, "This field must contain 2-3 big letters"));
      }

      if (key === "country") {
        return (errors[key] = validateFields(values[key] || "", /[A-Z]{2}/, "This field must contain 2 big letters"));
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
