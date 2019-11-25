import React from "react";
import { Field } from "redux-form";
import Input from "./Input";
import Select from "./Select";
import Radio from "./Radio";
import Textarea from "./Textarea";
import InputNumber from "./InputNumber";
import InputFile from "./InputFile";

const NAME_TO_COMPONENT = {
  Input: Input,
  Select: Select,
  Radio,
  Textarea,
  InputNumber,
  InputFile
};

const getTypeOfInput = (modelField, fieldName) => {
  if (/image|img/g.test(fieldName)) {
    return "InputFile";
  }
  if (modelField.enum) {
    return "Select";
  }
  if (modelField.maxlength > 300) {
    return "Textarea";
  }
  if (modelField.type === "String") {
    return "Input";
  }
  if (modelField.type === "Number") {
    return "InputNumber";
  }
  if (modelField.type === "Boolean") {
    return "Select";
  }
  return "Input";
};

const FormGroup = props => {
  if (!props.data) {
    return false;
  }
  return (
    <div className={`form__group form__group--${props.name}`}>
      <h2 className="form__group-label">{props.name}</h2>
      {props.inputsName.map(name => {
        const type = getTypeOfInput(props.data[name], name);
        return <Field key={name} name={name} component={NAME_TO_COMPONENT[type]} data={props.data[name]} />;
      })}
    </div>
  );
};

export default FormGroup;
