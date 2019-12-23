import React from "react";
import Translate from "../../translate/Translate";
import PropTypes from "prop-types";
import axios from "axios";

const IssueBankInput = ({ input, meta: { touched, error, form }, data }, { translate }) => {
  const [foundedBanks, setFoundedBanks] = React.useState([]);
  const sendStringToIssueBankCol = value => {
    axios.post("/api/issuebank", { value }).then(res => Array.isArray(res.data) && setFoundedBanks(res.data));
  };

  return (
    <div className="form__control">
      <input
        onKeyUp={evt => {
          sendStringToIssueBankCol(evt.target.value);
        }}
        autoComplete="off"
        list={input.name}
        pattern={data.validate}
        placeholder={translate(`label.${form}.${input.name}`)}
        className="form__input"
        type="text"
        {...input}
      />
      <label className="form__label">
        <Translate name={`label.${form}.${input.name}`} />
      </label>
      <div className="form__alert" style={{ height: "1rem", marginBottom: "20px" }}>
        {touched && error}
      </div>
      <datalist id={input.name}>
        {foundedBanks.map(bank => {
          return <option key={bank._id} value={bank.name}></option>;
        })}
      </datalist>
    </div>
  );
};

export default IssueBankInput;

IssueBankInput.contextTypes = {
  translate: PropTypes.func
};
