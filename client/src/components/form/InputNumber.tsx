import React from "react";
import PropTypes from "prop-types";

import Translate from "../../translate/Translate";
import { DataType } from "./Input";
import { TranslateContextTypes } from "../../translate/TranslateProvider";
import { WrappedFieldProps } from "redux-form";

interface InputNumberProps extends WrappedFieldProps {
  data: DataType;
}

const InputNumber = ({ input, meta: { touched, error, form }, data }: InputNumberProps, { translate }: TranslateContextTypes) => {
  console.log("dataNum", data)
  return (
    <div className="form__control">
      <input pattern={data.validate} placeholder={translate(`label.${form}.${input.name}`)} className="form__input" type="number" {...input} />
      <label className="form__label">
        <Translate name={`label.${form}.${input.name}`} />
      </label>
      <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default InputNumber;

InputNumber.contextTypes = {
  translate: PropTypes.func,
};
