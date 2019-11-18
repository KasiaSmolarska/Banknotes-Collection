import React from "react";

const Input = ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <input style={{ marginBottom: "5px" }} type="text" {...input} />
      <div className="red-text" style={{ height: "1rem", marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};

export default Input;
