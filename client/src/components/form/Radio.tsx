import React from "react";
import { WrappedFieldProps } from "redux-form";

// file is not used!
const Radio = ({ input, meta, ...rest }: WrappedFieldProps) => {
  return (
    <div className="form__control">
      <div className="title">{input.name.toUpperCase()}</div>
      <div className="form__radio-group">
        <input className="form__radio-input" {...input} {...rest} name={input.name} type="radio" value={1} />

        <label className="form__radio-label">
          <span className="form__radio-button"></span>
          Yes
        </label>
      </div>
      <div className="form__radio-group">
        <input className="form__radio-input" {...input} {...rest} name={input.name} type="radio" value={0} checked={true} />

        <label className="form__radio-label">
          <span className="form__radio-button"></span>
          No
        </label>
      </div>
    </div>
  );
};

export default Radio;
