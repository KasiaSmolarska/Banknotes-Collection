import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import { WrappedFieldProps } from "redux-form";
import { TranslateContextTypes } from "../../translate/TranslateProvider";

interface SelectProps extends WrappedFieldProps {
  data: {
    enum?: ("Polymer" | "Paper")[];
  };
}

const Select = ({ data, input, meta: { touched, error, pristine, form } }: SelectProps, context: TranslateContextTypes) => {
  return (
    <div className="form__control">
      <select className="form__select" style={{ marginBottom: "5px" }} {...input}>
        <option value="">{context.translate("form.select.noValue")}</option>
        {data.enum
          ? data.enum.map((option: "Polymer" | "Paper") => {
              return <option key={option}>{option}</option>;
            })
          : ["true", "false"].map((value) => (
              <option value={value} key={value}>
                {context.translate(`label.banknoteForm.own.${value}`)}
              </option>
            ))}
      </select>
      <label className={`form__select-label ${!pristine ? "form__select-label--selected" : ""}`}>
        <Translate name={`label.${form}.${input.name}`} />
      </label>
      <div className="red-text">{touched && error}</div>
    </div>
  );
};

export default Select;

Select.contextTypes = {
  translate: PropTypes.func,
};
