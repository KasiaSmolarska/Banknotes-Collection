import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";

const Select = ({ data, input, meta: { touched, error, pristine, form } }, context) => {
  console.log(input);
  return (
    <div className="form__control">
      <select className="form__select" style={{ marginBottom: "5px" }} type="text" {...input}>
        <option value="">{context.translate("form.select.noValue")}</option>
        {data.enum
          ? input.name === "continent"
            ? data.enum.map(option => {
                return (
                  <option value={option} key={option}>
                    {context.translate(`continent.${option.replace(/ /g, "")}`)}
                  </option>
                );
              })
            : data.enum.map(option => {
                return <option key={option}>{option}</option>;
              })
          : ["yes", "no"].map(value => (
              <option value={value === "yes"} key={value}>
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
  translate: PropTypes.func
};
