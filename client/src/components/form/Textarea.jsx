import React from "react";

const Textarea = ({ input, label, meta: { touched, error } }) => {
  return (
    <div className="form__control">
      <label className="form__label form__label--textarea">{input.name.toUpperCase()}</label>
      <textarea className="form__textarea" name={input.name} placeholder={input.name} {...input} />
      <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default Textarea;
