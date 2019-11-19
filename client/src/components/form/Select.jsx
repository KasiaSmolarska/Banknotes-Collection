import React from "react";

const Select = ({ data, input, meta: { touched, error } }) => {
  return (
    <div className="form__control">
      <select className="form__select" style={{ marginBottom: "5px" }} type="text" {...input}>
        <option value="">Select an option</option>
        {data.enum
          ? data.enum.map(option => {
              return <option key={option}>{option}</option>;
            })
          : ["yes", "no"].map(value => <option key={value}>{value}</option>)}
      </select>
      <label className="form__select-label">{input.name}</label>
      <div className="red-text">{touched && error}</div>
    </div>
  );
};

export default Select;
