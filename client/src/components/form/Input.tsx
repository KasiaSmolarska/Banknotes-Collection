import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import { WrappedFieldProps } from "redux-form";
import { TranslateContextTypes } from "../../translate/TranslateProvider";

export type DataType = { maxlength?: number; required?: boolean; type: string; validate?: string };

interface InputProps extends WrappedFieldProps {
  data: DataType;
  value: string;
  type: string;
}

const Input = ({ input, meta: { touched, error, form }, data, value, type, ...props }: InputProps, { translate }: TranslateContextTypes): React.ReactNode => {
  return (
    <div className="form__control">
      <input pattern={data && data.validate} placeholder={translate(`label.${form}.${input.name}`)} className="form__input" type={type || "text"} {...input} {...props} />
      <label className="form__label">
        <Translate name={`label.${form}.${input.name}`} />
      </label>
      <span className="required"></span>
      <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default Input;

Input.contextTypes = {
  translate: PropTypes.func,
};
