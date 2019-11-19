import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import Input from "../form/Input";
import FormProvider from "../form/FormProvider";
import FormGroup from "../form/FormGroup";

const NAME_TO_COMPONENT = {
  Input: Input
};

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
      console.log(this.props.data);
      return <FormGroup key={key} name={key} inputsName={value} data={this.props.data} />;
    });
  }

  render() {
    {
      data = this.props.data;
    }
    return (
      <div>
        form 22g<FormProvider name="form--banknote">{this.renderFormGroup()}</FormProvider>
      </div>
    );
  }
}

function validateInputs(values) {
  const errors = {};
  console.log("data", data);
  console.log("validateInputs", values);
  if (data) {
    Object.keys(data).forEach(({ name }) => {
      if (!values[name]) {
        return (errors[name] = `You must provide survey ${name}`);
      }

      //errors.recipients = validateEmails(values.recipients || "");
    });
  }

  return errors;
}

export default reduxForm({
  form: "banknoteForm",
  validate: validateInputs
})(BanknoteForm);
