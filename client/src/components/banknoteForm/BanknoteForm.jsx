import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import Input from "../form/Input";
import FormProvider from "../form/FormProvider";
import FormGroup from "../form/FormGroup";

const NAME_TO_COMPONENT = {
  Input: Input
};

const BANKNOTE_FORM_GROUPS = {
  elementary: ["title", "value", "currency"],
  geolocation: ["country", "continent"],
  pusta: ["title"]
};

const getTypeOfInput = modelField => {
  if (modelField.type === "String") {
    return "Input";
  }
  if (modelField.type === "Number") {
    return "Input";
  }
  return "Input";
};

class BanknoteForm extends Component {
  renderFormGroup() {
    return Object.entries(BANKNOTE_FORM_GROUPS).map(([key, value]) => {
      console.log(this.props.data);
      return <FormGroup key={key} name={key} inputsName={value} data={this.props.data} />;
    });
  }

  render() {
    const data = this.props.data;
    return (
      <div>
        form 22g<FormProvider>{this.renderFormGroup()}</FormProvider>
      </div>
    );
  }
}

export default reduxForm({
  form: "banknoteForm"
})(BanknoteForm);
