import React from "react";
import { Field } from "redux-form";
import Input from "../form/Input";

const NAME_TO_COMPONENT = {
  Input: Input
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

const FormGroup = props => {
  if (!props.data) {
    return false;
  }
  return (
    <div className={props.name}>
      <h2>{props.name}</h2>
      {props.inputsName.map(name => {
        const type = getTypeOfInput(props.data[name]);
        console.log("tyoe", NAME_TO_COMPONENT[type]);
        return (
          <div>
            {type}
            <Field type="text" name={name} component={NAME_TO_COMPONENT[type]} />
          </div>
        );
      })}
    </div>
  );
};

export default FormGroup;
