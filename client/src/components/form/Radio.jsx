import React from "react";

const Radio = ({ input, meta, ...rest }) => {
  return (
    <div className="form__control">
      <div className="title">{input.name.toUpperCase()}</div>
      <div className="form__radio-group">
        <input className="form__radio-input" {...input} {...rest} name={input.name} type="radio" value={true} />

        <label className="form__radio-label">
          <span className="form__radio-button"></span>
          Yes
        </label>
      </div>
      <div className="form__radio-group">
        <input className="form__radio-input" {...input} {...rest} name={input.name} type="radio" value={false} checked={true} />

        <label className="form__radio-label">
          <span className="form__radio-button"></span>
          No
        </label>
      </div>
    </div>
  );
};

export default Radio;
