import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";

const Textarea = ({ input, label, meta: { touched, error, form } }, { translate }) => {
  return (
    <div className="form__control">
      <textarea className="form__input form__textarea" name={input.name} placeholder={translate(`label.${form}.${input.name}`)} {...input} />
      <label className="form__label form__label--textarea">
        <Translate name={`label.${form}.${input.name}`} />
      </label>
      <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default Textarea;

Textarea.contextTypes = {
  translate: PropTypes.func
};
