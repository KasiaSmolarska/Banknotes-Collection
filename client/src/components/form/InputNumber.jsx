import React from "react";
import PropTypes from "prop-types";

import Translate from "../../translate/Translate";

const InputNumber = ({ input, label, meta: { touched, error, form }, data }, { translate }) => {
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
  translate: PropTypes.func
};
