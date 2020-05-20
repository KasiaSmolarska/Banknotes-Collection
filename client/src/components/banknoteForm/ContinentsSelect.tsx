import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import { Continents } from "../../utils/country-continent";
import {WrappedFieldProps} from "redux-form"
import { TranslateContextTypes } from "../../translate/TranslateProvider";

interface ContinentsSelectProps extends WrappedFieldProps{
  data: {
    type: String,
    enum: Continents[],
  };
}

const ContinentsSelect = ({ data, input, meta }: ContinentsSelectProps, context: TranslateContextTypes) => {
  const { touched, error, pristine, form } = meta;
  return (
    <div className="form__control">
      <select className="form__select" style={{ marginBottom: "5px" }} {...input}>
        <option value="">{context.translate("form.select.noValue")}</option>
        {data.enum.map((option) => {
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
  translate: PropTypes.func,
};
