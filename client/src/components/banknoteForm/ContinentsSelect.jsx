import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";


const ContinentsSelect = ({ data, input, meta }, context) => {
  const { touched, error, pristine, form } = meta;
  return (
    <div className="form__control">
      <select className="form__select" style={{ marginBottom: "5px" }} type="text" {...input}>
        <option value="">{context.translate("form.select.noValue")}</option>
        {data.enum.map(option => {
          return (
            <option value={option} key={option}>
              {context.translate(`continent.${option.replace(/ /g, "")}`)}
            </option>
          );
        })}
      </select>
      <label className={`form__select-label ${!pristine ? "form__select-label--selected" : ""}`}>
        <Translate name={`label.${form}.${input.name}`} />
      </label>
      <div className="red-text">{touched && error}</div>
    </div>
  );
};

export default ContinentsSelect;

ContinentsSelect.contextTypes = {
  translate: PropTypes.func
};
