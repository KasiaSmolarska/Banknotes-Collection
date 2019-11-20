import React from "react";

const Input = ({ input, label, meta: { touched, error }, data }) => {
  return (
    <div className="form__control">
      <input pattern={data.validate} placeholder={input.name} className="form__input" type="text" {...input} />
      <label className="form__label">{input.name.toUpperCase()}</label>
      <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default Input;
